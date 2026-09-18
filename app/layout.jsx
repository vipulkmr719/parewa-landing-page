import './globals.css';

export const metadata = {
  metadataBase: new URL('https://parewa.com'),
  title: 'Parewa — Proposals that come back with an answer',
  description:
    'Parewa turns a short client brief into a professional, on-brand proposal — written by AI, tracked from the moment your client opens it, and signed online. Built for digital marketing agencies in India.',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
  openGraph: {
    type: 'website',
    title: 'Parewa — Proposals that come back with an answer',
    description:
      'Send the proposal in 15 minutes. Not next Tuesday. AI proposal software for Indian digital agencies.',
    url: '/',
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = {
  themeColor: '#F7F8F7',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body>
        {/* Set before paint so the CSS that hides what script will animate only
            applies when script is actually there. Without this the hero would
            stay invisible for anyone with JavaScript off. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a className="visually-hidden" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
