# Fonts

Bricolage Grotesque and Inter, self-hosted rather than loaded from Google's CDN
(two fewer DNS + TLS handshakes before first paint — see the root README).

Both are **subset to the characters this page uses** and have their variable
axes clamped. 320 KB of original webfont became 73 KB.

| File | Size | Notes |
|---|---|---|
| `bricolage-grotesque-latin.woff2` | 47 KB | display face |
| `bricolage-grotesque-latin-ext.woff2` | 3 KB | carries ₹ |
| `inter-latin.woff2` | 21 KB | body and UI |
| `inter-latin-ext.woff2` | 2 KB | carries ₹ |

Two things to know before regenerating these:

- **The rupee sign (U+20B9) is in `latin-ext`, not `latin`.** Dropping the
  latin-ext files would silently push every ₹ on the page to a fallback font.
- **`wdth` must stay variable on Bricolage; `opsz` must not.** The design uses
  `wdth` 88/92/96 across the heading levels. Pinning `opsz` instead is what
  halved the file.

## Regenerating

Requires `fonttools` and `brotli`.

```python
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

LIMITS = {
    'bricolage': {'wght': (500, 700), 'wdth': (85, 100), 'opsz': 40},
    'inter':     {'wght': (400, 600)},
}

ft = TTFont(src_woff2)
ft = instancer.instantiateVariableFont(ft, LIMITS[family], optimize=True)
ft.flavor = None
ft.save('tmp.ttf')

subset.main([
    'tmp.ttf', f'--output-file={out}', '--flavor=woff2',
    '--unicodes=' + ','.join(f'U+{u:04X}' for u in codepoints_used),
    '--layout-features=kern,liga,calt,tnum,ccmp,locl',
    '--no-hinting', '--desubroutinize', '--name-IDs=1,2,3,4,5,6',
])
```

`codepoints_used` should be the characters in `index.html` (tags stripped,
entities decoded) plus a safety margin of ASCII, typographic punctuation and
accented Latin, intersected with what each source subset actually contains.

If you regenerate, **re-derive the fallback metrics too** — the
`size-adjust` / `ascent-override` / `descent-override` values on the
`* Fallback` faces at the top of `../styles.css` are calibrated against these
exact files. The method is in the root README under Performance.

## Licences

Both are SIL Open Font License 1.1.

- Bricolage Grotesque — https://github.com/ateliertriay/bricolage
- Inter — https://github.com/rsms/inter

The OFL permits subsetting and redistribution. Keep a copy of `OFL.txt` for
each family alongside these files before shipping to production.
