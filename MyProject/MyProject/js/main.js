(function(){
  const selectorId = 'language-selector';
  const storageKey = 'site_lang';

  // مقدار اولیه: اگر localStorage نداشت، fa
  const saved = localStorage.getItem(storageKey) || 'fa';

  // تابع اصلی برای اعمال زبان
  function applyLanguage(lang){
    if(!document.body) return;
    document.body.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');

    // متن‌ها
    document.querySelectorAll('[data-lang-fa]').forEach(el => {
      if(!el) return;
      const fa = el.getAttribute('data-lang-fa') || '';
      const en = el.getAttribute('data-lang-en') || '';
      el.textContent = (lang === 'fa') ? fa : en;
    });

    // placeholder ها
    document.querySelectorAll('[data-placeholder-fa]').forEach(el => {
      if(!el) return;
      const fa = el.getAttribute('data-placeholder-fa') || '';
      const en = el.getAttribute('data-placeholder-en') || '';
      el.setAttribute('placeholder', (lang === 'fa') ? fa : en);
    });

    // title ها
    document.querySelectorAll('[data-title-fa]').forEach(el => {
      if(!el) return;
      const fa = el.getAttribute('data-title-fa') || '';
      const en = el.getAttribute('data-title-en') || '';
      el.setAttribute('title', (lang === 'fa') ? fa : en);
    });

    // value دکمه‌ها/inputs
    document.querySelectorAll('[data-value-fa]').forEach(el => {
      if(!el) return;
      const fa = el.getAttribute('data-value-fa') || '';
      const en = el.getAttribute('data-value-en') || '';
      if(el.tagName && el.tagName.toLowerCase() === 'input'){
        el.value = (lang === 'fa') ? fa : en;
      } else {
        el.textContent = (lang === 'fa') ? fa : en;
      }
    });

    // selector زبان
    const sel = document.getElementById(selectorId);
    if(sel) sel.value = lang;

    localStorage.setItem(storageKey, lang);
  }

  // اجرا بعد از لود کامل DOM
  document.addEventListener('DOMContentLoaded', () => {
    const sel = document.getElementById(selectorId);
    if(sel){
      sel.value = saved;
      sel.addEventListener('change', (e)=>{
        applyLanguage(e.target.value);
      });
    }
    applyLanguage(saved);
  });

  // قابل دسترسی از کنسول یا دیگر اسکریپت‌ها
  window.applySiteLanguage = applyLanguage;
})();
