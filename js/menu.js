document.addEventListener("DOMContentLoaded", function () {
  const menuContainer = document.getElementById("left-menu");

  fetch("/include/menu.html") // ルートからの絶対パスに修正
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      menuContainer.innerHTML = data;
      setupMenuEvents(); // メニューが挿入されてからイベント登録
    })
    .catch(error => {
      console.error("メニューの読み込みに失敗しました:", error);
    });
});

function setupMenuEvents() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenuPanel = document.getElementById('mobileMenuPanel');

  if (menuToggle && mobileMenuPanel) {
    menuToggle.addEventListener('click', () => {
      mobileMenuPanel.classList.toggle('open');
    });
  }

  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    const itemsWithSubmenu = mainNav.querySelectorAll('li');
    itemsWithSubmenu.forEach(li => {
      const subMenu = li.querySelector('.sub-menu');
      if (subMenu) {
        const anchor = li.querySelector('a');
        if (anchor) {
          anchor.addEventListener('click', e => {
            e.preventDefault();
            li.classList.toggle('open');
          });
        }
      }
    });
  }
}

function setupMenuEvents() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenuPanel = document.getElementById('mobileMenuPanel');

  if (menuToggle && mobileMenuPanel) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();  // 追加：クリックイベントの伝播を止める
      mobileMenuPanel.classList.toggle('open');
    });

    // メニュー内クリックは伝播させない（メニュー外クリックで閉じる判定防止）
    mobileMenuPanel.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // ドキュメントのクリックでメニュー閉じる
    document.addEventListener('click', () => {
      if (mobileMenuPanel.classList.contains('open')) {
        mobileMenuPanel.classList.remove('open');
      }
    });
  }

  // 以下はサブメニューの開閉処理（省略可）
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    const itemsWithSubmenu = mainNav.querySelectorAll('li');
    itemsWithSubmenu.forEach(li => {
      const subMenu = li.querySelector('.sub-menu');
      if (subMenu) {
        const anchor = li.querySelector('a');
        if (anchor) {
          anchor.addEventListener('click', e => {
            e.preventDefault();
            li.classList.toggle('open');
          });
        }
      }
    });
  }
}
