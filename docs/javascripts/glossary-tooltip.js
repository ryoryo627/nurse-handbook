/**
 * 用語集ツールチップ
 * 用語リンクにホバーすると意味がポップアップで表示される
 */
(function() {
  'use strict';

  // 用語データのキャッシュ
  let glossaryData = null;
  let tooltip = null;

  // ツールチップ要素を作成
  function createTooltip() {
    const el = document.createElement('div');
    el.className = 'glossary-tooltip';
    el.innerHTML = `
      <div class="glossary-tooltip-title"></div>
      <div class="glossary-tooltip-meaning"></div>
      <div class="glossary-tooltip-example"></div>
    `;
    document.body.appendChild(el);
    return el;
  }

  // 用語集ページから用語データを取得
  async function fetchGlossaryData() {
    if (glossaryData) return glossaryData;

    try {
      // 現在のパスから用語集のURLを構築
      const basePath = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
      const baseUrl = new URL(basePath);
      const pathParts = baseUrl.pathname.split('/');

      // サイトのベースパスを取得（例: /nurse-handbook/）
      let glossaryUrl;
      if (baseUrl.pathname.includes('/nurse-handbook/')) {
        glossaryUrl = baseUrl.origin + '/nurse-handbook/00_start/glossary/';
      } else {
        // ローカル開発環境
        glossaryUrl = baseUrl.origin + '/00_start/glossary/';
      }

      const response = await fetch(glossaryUrl);
      if (!response.ok) throw new Error('Failed to fetch glossary');

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // 用語データを抽出
      glossaryData = {};
      const headings = doc.querySelectorAll('h2[id]');

      headings.forEach(heading => {
        const id = heading.id;
        const title = heading.textContent.replace('¶', '').trim();

        // 次の要素から意味と例を取得
        let meaning = '';
        let example = '';

        let sibling = heading.nextElementSibling;
        while (sibling && sibling.tagName !== 'H2' && sibling.tagName !== 'HR') {
          const text = sibling.textContent;
          if (text.startsWith('意味：') || text.includes('**意味**：')) {
            meaning = text.replace(/\*?\*?意味\*?\*?：/, '').trim();
          } else if (text.startsWith('例：') || text.includes('**例**：')) {
            example = text.replace(/\*?\*?例\*?\*?：/, '').trim();
          }
          sibling = sibling.nextElementSibling;
        }

        if (id && title) {
          glossaryData[id] = { title, meaning, example };
        }
      });

      return glossaryData;
    } catch (error) {
      console.warn('用語集データの取得に失敗:', error);
      return {};
    }
  }

  // ツールチップを表示
  function showTooltip(link, data) {
    if (!tooltip) tooltip = createTooltip();

    tooltip.querySelector('.glossary-tooltip-title').textContent = data.title;
    tooltip.querySelector('.glossary-tooltip-meaning').textContent = data.meaning || '';
    tooltip.querySelector('.glossary-tooltip-example').textContent = data.example ? `例：${data.example}` : '';

    // 位置を計算
    const rect = link.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let left = rect.left + window.scrollX;
    let top = rect.bottom + window.scrollY + 8;

    // 画面右端をはみ出す場合は調整
    if (left + 320 > window.innerWidth) {
      left = window.innerWidth - 330;
    }

    // 画面下端をはみ出す場合は上に表示
    if (rect.bottom + 200 > window.innerHeight) {
      top = rect.top + window.scrollY - 8;
      tooltip.style.transform = 'translateY(-100%)';
    } else {
      tooltip.style.transform = 'translateY(0)';
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    tooltip.classList.add('visible');
  }

  // ツールチップを非表示
  function hideTooltip() {
    if (tooltip) {
      tooltip.classList.remove('visible');
    }
  }

  // 用語リンクにイベントを設定
  function setupGlossaryLinks() {
    const links = document.querySelectorAll('a[href*="glossary"][href*="#"]');

    links.forEach(link => {
      // アンカーを取得
      const href = link.getAttribute('href');
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      const anchor = href.substring(hashIndex + 1);

      link.addEventListener('mouseenter', async () => {
        const data = await fetchGlossaryData();
        if (data[anchor]) {
          showTooltip(link, data[anchor]);
        }
      });

      link.addEventListener('mouseleave', hideTooltip);
    });
  }

  // DOMContentLoaded後に実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupGlossaryLinks);
  } else {
    setupGlossaryLinks();
  }

  // MkDocs Materialのインスタント読み込み対応
  if (typeof document$ !== 'undefined') {
    document$.subscribe(() => setupGlossaryLinks());
  }
})();
