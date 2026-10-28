// Preserve the supplied affiliate URLs, including their exact path and casing.
export const AFFILIATE_LINKS = Object.freeze([
  'https://link.amazon/B04bCfp0M',
  'https://link.amazon/B036OYHVX',
  'https://link.amazon/B0dSiU2IL',
  'https://link.amazon/B0gS59lLL'
]);

export function initAffiliatePromotion() {
  const feature = document.getElementById('affiliateFeature');
  const link = document.getElementById('affiliateLink');
  const number = document.getElementById('affiliateNumber');
  const pause = document.getElementById('affiliatePause');
  if (!feature || !link || !number || !pause) return;
  let index = 0;
  let paused = false;
  const update = () => {
    link.href = AFFILIATE_LINKS[index];
    link.setAttribute('aria-label', `Ad: Amazon find ${index + 1} of ${AFFILIATE_LINKS.length}. Affiliate link, opens in a new tab.`);
    number.textContent = `${index + 1}/${AFFILIATE_LINKS.length}`;
  };
  update();
  pause.addEventListener('click', () => {
    paused = !paused;
    pause.setAttribute('aria-pressed', String(paused));
    const label = paused ? 'Resume ad rotation' : 'Pause ad rotation';
    pause.setAttribute('aria-label', label);
    pause.title = label;
    pause.textContent = paused ? '▷' : 'Ⅱ';
  });
  setInterval(() => {
    if (paused || document.hidden || document.querySelector('dialog[open]') || feature.matches(':hover, :focus-within') || feature.querySelector('details[open]')) return;
    index = (index + 1) % AFFILIATE_LINKS.length;
    update();
  }, 10000);
}
