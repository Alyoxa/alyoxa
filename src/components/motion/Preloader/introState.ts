export const INTRO_START = "alyoxa:intro-start";
export const INTRO_DONE = "alyoxa:intro-done";
export const INTRO_SESSION_KEY = "alyoxa:intro-seen:v1";

// Runs before hydration. No-JavaScript visits keep the normal, visible website.
export const INTRO_BOOTSTRAP = `(() => {
  const root = document.documentElement;
  let seen = false;
  try { seen = sessionStorage.getItem('${INTRO_SESSION_KEY}') === '1'; } catch {}
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const deepLink = location.hash && location.hash !== '#home';
  root.dataset.alyoxaIntro = location.pathname === '/' && !seen && !reduced && !deepLink ? 'pending' : 'ready';
  setTimeout(() => {
    if (root.dataset.alyoxaIntro === 'pending' || root.dataset.alyoxaIntro === 'opening') {
      root.dataset.alyoxaIntro = 'ready';
      const site = document.getElementById('alyoxa-site');
      if (site) site.inert = false;
      dispatchEvent(new Event('${INTRO_DONE}'));
    }
  }, 8000);
})();`;
