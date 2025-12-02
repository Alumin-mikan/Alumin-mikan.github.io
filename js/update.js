fetch('/include/update.txt')
  .then(response => response.text())
  .then(text => {
    const lines = text.trim().split('\n');

    // 1行目を最終更新日時として使用
    const latestDate = lines[0] ? lines[0].split(',')[0] : null;
    document.getElementById('last-updated-text').textContent = latestDate || 'データなし';

    // 2行目以降を表に表示
    const tableBody = document.querySelector('#info-table tbody');
    const rows = lines.slice(1);

    rows.forEach((line, index) => {
      const parts = line.split(',');
      const date = parts[0] ? parts[0] : '';
      const description = parts[1] ? parts[1] : '';

      const tr = document.createElement('tr');
      if (index >= 5) {
        tr.classList.add('hidden-row');
      }
      tr.innerHTML = `<td>${date}</td><td>${description}</td>`;
      tableBody.appendChild(tr);
    });

    // さらに表示する
    if (rows.length > 3) {
      const toggleButton = document.getElementById('toggle-button');
      toggleButton.style.display = 'inline';

      let opened = false;
      toggleButton.addEventListener('click', () => {
        opened = !opened;
        document.querySelectorAll('.hidden-row')
          .forEach(row => row.style.display = opened ? 'table-row' : 'none');
        toggleButton.textContent = opened ? '閉じる' : 'さらに表示する';
      });
    }
  })
  .catch(error => {
    console.error('更新情報の読み込みに失敗しました:', error);
    document.getElementById('last-updated-text').textContent = '読み込み失敗';
  });
