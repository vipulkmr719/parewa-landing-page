/**
 * The folded-paper dove. Five straight-edged planes; the iridescent gradient is
 * carried by the neck plane only, where a rock pigeon's iridescence actually is.
 *
 * The gradient needs a document-unique id, so callers pass one — two marks on
 * one page (header and footer) would otherwise collide.
 */
export default function Logo({ gradientId }) {
  return (
    <svg className="brand__mark" viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5B3E8C" />
          <stop offset="100%" stopColor="#1A6B6E" />
        </linearGradient>
      </defs>
      <polygon points="26,13 8,2 18,26" fill="#27406B" />
      <polygon points="30,18 26,13 18,26 24,33 35,22 39,17" fill="#2F4C7C" />
      <polygon points="45,14 38,8 32,12 30,18 39,17" fill={`url(#${gradientId})`} />
      <polygon points="18,26 2,35 12,38" fill="#3B5B90" />
      <polygon points="18,26 12,38 5,46 24,33" fill="#1E3355" />
    </svg>
  );
}
