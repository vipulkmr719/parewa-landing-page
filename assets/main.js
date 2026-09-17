/* ==========================================================================
   Parewa — landing page behaviour
   One bold element (the hero sequence). Everything else stays quiet.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Where waitlist signups go: our own serverless function, which appends a
     row to the Google Sheet. Deliberately same-origin — the browser never
     talks to Google, so nothing that can write to the sheet ships in this
     file and no third party sees a visitor. See api/waitlist.js, and the
     README for the environment variables it needs.

     If those variables are not set the function answers 503 and the form
     falls back to the visitor's mail client rather than losing the signup.
     ------------------------------------------------------------------ */
  const FORM_ENDPOINT = '/api/waitlist';
  const CONTACT_EMAIL = 'hello@parewa.com';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

  /* ==================================================================
     1. Hero sequence — brief types, proposal assembles, rail goes green
     ================================================================== */

  function runHeroSequence() {
    const demo  = $('#demo');
    const brief = $('#briefText');
    const rail  = $('#rail');
    if (!demo || !brief || !rail) return;

    const caret = $('.brief__caret', brief);
    const steps = $$('.rail__step', rail);

    // The page ships in its finished state so it reads without JavaScript.
    // The sequence therefore has to rewind it first, then play it forward.
    const text = brief.textContent.trim();

    const lightRail = () => {
      steps.forEach((step, i) => {
        setTimeout(() => step.setAttribute('data-live', 'true'), i * 420);
      });
    };

    if (reduceMotion) {
      brief.classList.add('is-typed');
      demo.classList.add('is-assembled');
      return;                       // already correct in the markup
    }

    steps.forEach(s => s.setAttribute('data-live', 'false'));
    const node = document.createTextNode('');
    brief.textContent = '';
    brief.append(node, caret);

    let i = 0;
    const typeNext = () => {
      // Type in small bursts so it reads as typing, not as a slow reveal.
      node.nodeValue = text.slice(0, (i += 2));
      if (i < text.length) {
        setTimeout(typeNext, 18);
      } else {
        brief.classList.add('is-typed');
        setTimeout(() => {
          demo.classList.add('is-assembled');
          setTimeout(lightRail, 900);
        }, 260);
      }
    };
    setTimeout(typeNext, 450);
  }

  /* ==================================================================
     2. Header hairline once the page has moved
     ================================================================== */

  function watchHeader() {
    const header = $('#siteHeader');
    if (!header) return;
    const update = () => header.setAttribute('data-stuck', String(window.scrollY > 8));
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ==================================================================
     3. Sticky mobile CTA — after the hero has gone by
     ================================================================== */

  function watchStickyCta() {
    const cta  = $('#stickyCta');
    const demo = $('#demo');
    if (!cta || !demo || !('IntersectionObserver' in window)) return;

    new IntersectionObserver(
      entries => cta.setAttribute('data-show', String(!entries[0].isIntersecting)),
      { rootMargin: '-40% 0px 0px 0px' }
    ).observe(demo);
  }

  /* ==================================================================
     4. Waitlist counter — counts up once, on first sight
     ================================================================== */

  function watchCounter() {
    const el = $('#waitlistCount');
    if (!el) return;

    const target = parseInt(el.getAttribute('data-count'), 10);
    if (!isFinite(target)) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      el.textContent = String(target);
      return;
    }

    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();

      const from = Math.max(0, target - 24);
      const start = performance.now();
      const step = now => {
        const t = Math.min(1, (now - start) / 900);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.round(from + (target - from) * eased));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });

    io.observe(el);
  }

  /* ==================================================================
     5. Pricing — monthly / annual, monthly first
     ================================================================== */

  function wirePricing() {
    const buttons = $$('.toggle [data-billing]');
    if (!buttons.length) return;

    const apply = mode => {
      buttons.forEach(b =>
        b.setAttribute('aria-pressed', String(b.getAttribute('data-billing') === mode))
      );
      $$('[data-price-monthly]').forEach(el => { el.textContent = el.getAttribute('data-price-' + mode); });
      $$('[data-per-monthly]').forEach(el   => { el.textContent = el.getAttribute('data-per-' + mode); });
      $$('[data-alt-monthly]').forEach(el   => { el.textContent = el.getAttribute('data-alt-' + mode); });
    };

    buttons.forEach(b => b.addEventListener('click', () => apply(b.getAttribute('data-billing'))));
    apply('monthly');
  }

  /* ==================================================================
     6. Waitlist dialog
     ================================================================== */

  function wireDialog() {
    const dialog = $('#waitlistDialog');
    if (!dialog) return;
    let lastFocused = null;

    $$('[data-open-waitlist]').forEach(trigger => {
      trigger.addEventListener('click', e => {
        e.preventDefault();
        lastFocused = document.activeElement;
        if (typeof dialog.showModal === 'function') {
          dialog.showModal();
          const first = $('input', dialog);
          if (first) first.focus();
        } else {
          // No <dialog> support: fall through to the form at the foot of the page.
          const fallback = $('.final');
          if (fallback) fallback.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      });
    });

    $$('[data-close-dialog]', dialog).forEach(b => b.addEventListener('click', () => dialog.close()));

    // Click the backdrop to dismiss.
    dialog.addEventListener('click', e => {
      if (e.target === dialog) dialog.close();
    });

    dialog.addEventListener('close', () => {
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    });
  }

  /* ==================================================================
     7. Waitlist form
     ================================================================== */

  // Used when the endpoint is absent or unconfigured. Honest: it does not
  // claim to have saved anything, and the signup still reaches us.
  function mailtoFallback(data, say) {
    const subject = encodeURIComponent('Waitlist: ' + data.agency);
    const body = encodeURIComponent(
      'Agency: ' + data.agency + '\n' +
      'Email: ' + data.email + '\n' +
      'Proposals per month: ' + data.volume + '\n\n' +
      'Please add us to the Parewa waitlist.'
    );
    say('ok', 'Opening your email app — send that message and you’re on the list.');
    window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
  }

  function wireForms() {
    $$('[data-waitlist-form]').forEach(form => {
      const status = $('[data-form-status]', form);
      const submit = $('button[type="submit"]', form);

      const say = (state, message) => {
        if (!status) return;
        status.setAttribute('data-state', state);
        status.textContent = message;
      };

      form.addEventListener('submit', async e => {
        e.preventDefault();

        const data = {
          email:  (form.elements.email.value || '').trim(),
          agency: (form.elements.agency.value || '').trim(),
          volume: form.elements.volume ? form.elements.volume.value : '',
          // Honeypot. Hidden from people, irresistible to bots.
          website: form.elements.website ? form.elements.website.value : ''
        };

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
          say('error', 'That email address doesn’t look right — mind checking it?');
          form.elements.email.focus();
          return;
        }
        if (!data.agency) {
          say('error', 'Which agency are you with?');
          form.elements.agency.focus();
          return;
        }

        // No endpoint wired — hand off to the visitor's mail client.
        if (!FORM_ENDPOINT) { mailtoFallback(data, say); return; }

        if (submit) { submit.disabled = true; submit.textContent = 'Joining…'; }

        try {
          const res = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(data)
          });
          if (res.status === 503) { mailtoFallback(data, say); return; }

          if (!res.ok) {
            let msg = 'Something went wrong on our end. Email ' + CONTACT_EMAIL + ' and we’ll add you by hand.';
            if (res.status === 400) {
              const body = await res.json().catch(function () { return {}; });
              if (body.error) msg = body.error;
            }
            say('error', msg);
            return;
          }

          form.reset();
          say('ok', 'You’re on the list. We’ll email you the moment your access opens.');
        } catch (err) {
          say('error', 'Something went wrong on our end. Email ' + CONTACT_EMAIL + ' and we’ll add you by hand.');
        } finally {
          if (submit) { submit.disabled = false; submit.textContent = 'Join the Waitlist'; }
        }
      });
    });
  }

  /* ================================================================== */

  function init() {
    runHeroSequence();
    watchHeader();
    watchStickyCta();
    watchCounter();
    wirePricing();
    wireDialog();
    wireForms();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
