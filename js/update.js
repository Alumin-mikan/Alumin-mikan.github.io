fetch('/include/update.txt')
  .then(response => response.text())
  .then(text => {
    document.getElementById('last-updated-text').textContent = text;
  })
  .catch(error => {
    console.error('更新情報の読み込みに失敗しました:', error);
    document.getElementById('last-updated-text').textContent = '読み込み失敗';
  });