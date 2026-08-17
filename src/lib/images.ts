/**
 * Image placeholders — Unsplash (free, no key) rendered grayscale (`sat=-100`)
 * to fit the monochrome design. Each has a Picsum grayscale fallback (also
 * Unsplash-sourced) wired via PlaceholderImage's onerror.
 * Swap any of these for your own assets when ready.
 */
const U = (id: string, w = 1200, h = 0) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&sat=-100&w=${w}${
    h ? `&h=${h}` : ""
  }&q=80`

export const fallback = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`

export const images = {
  // Bali atmosphere — hero / about
  hero: U("1537996194471-e657df975ab4", 1400, 1040),
  about: U("1522071820081-009f0129c71c", 1200, 1000),
  // Ventures
  dewataTech: U("1582719478250-c89cae4dc85b", 1200, 820),
  dagangku: U("1555396273-367ea4eb4db5", 1200, 820),
  // Portfolio slot — REPLACE with your own portfolio image later
  portfolio: U("1604999565976-8913ad2ddb7c", 1400, 900),
  // Misc texture
  texture: U("1488590528505-98d2b5aba04b", 1000, 700),
} as const
