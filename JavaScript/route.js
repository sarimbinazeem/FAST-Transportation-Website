/* route.js
   Handles:
   - tab/accordion open/close (smooth height animation)
   - dark mode toggle (persist to localStorage)
   - back-to-top show/hide + click
   - aria-expanded updates for accessibility
*/

document.addEventListener('DOMContentLoaded', () => {
  // --- Tabs / accordion ---
  const buttons = document.querySelectorAll('.tab-button');
  const contents = document.querySelectorAll('.tab-content');

  // helper to close all
  function closeAll() {
    buttons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-expanded','false');
    });
    contents.forEach(c => {
      c.classList.remove('open');
      // collapse using exact height for smoothness
      c.style.maxHeight = null;
      c.setAttribute('aria-hidden','true');
    });
  }

  buttons.forEach(btn => {
    const targetId = btn.dataset.target;
    const targetEl = document.getElementById(targetId);
    // safety checks
    if (!targetEl) return;

    btn.addEventListener('click', () => {
      // if clicked button is already active -> do nothing (or close if you want toggle)
      const isActive = btn.classList.contains('active');
      closeAll();

      if (!isActive) {
        // open this
        btn.classList.add('active');
        btn.setAttribute('aria-expanded','true');

        targetEl.classList.add('open');
        targetEl.setAttribute('aria-hidden','false');

        // set maxHeight to scrollHeight for precise animation
        targetEl.style.maxHeight = targetEl.scrollHeight + 'px';

        // optional: scroll into view to show content nicely
        setTimeout(() => {
          targetEl.scrollIntoView({ behavior:'smooth', block:'start' });
        }, 160);
      }
    });
  });

  // open the initially active tab (if any)
  const initiallyActive = document.querySelector('.tab-button.active');
  if (initiallyActive) {
    const id = initiallyActive.dataset.target;
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('open');
      el.style.maxHeight = el.scrollHeight + 'px';
      el.setAttribute('aria-hidden','false');
      initiallyActive.setAttribute('aria-expanded','true');
    }
  }

  // --- Dark mode toggle ---
  const darkToggle = document.getElementById('darkToggle');
  function setDarkMode(on) {
    if (on) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
    try { localStorage.setItem('site-dark', on ? '1' : '0'); } catch(e){}
  }
  // init from storage or media query
  const saved = (function(){
    try { return localStorage.getItem('site-dark'); } catch(e){ return null; }
  })();
  if (saved === '1') setDarkMode(true);
  else if (saved === '0') setDarkMode(false);
  else {
    // respect system preference as fallback
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }

  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      const on = document.body.classList.toggle('dark');
      // change icon (optional)
      darkToggle.textContent = on ? '☀️' : '🌙';
      setDarkMode(on);
    });
  }

  // --- Back to top button ---
  const backToTop = document.getElementById('backTop');
  function checkScroll() {
    if (!backToTop) return;
    if (window.scrollY > 300) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  }
  window.addEventListener('scroll', checkScroll);
  checkScroll();
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top:0, behavior:'smooth' });
    });
  }

  // optional: close open tab when clicking outside (if you want)
  document.addEventListener('click', (e) => {
    // ignore clicks on tabs/contents
    if (e.target.closest('.tabs') || e.target.closest('.tab-content')) return;
    // closeAll(); // uncomment to close when clicking outside
  });

});