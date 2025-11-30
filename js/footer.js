const includeFooter = new XMLHttpRequest();
includeFooter.open("GET", "/include/footer.html", true);
includeFooter.onreadystatechange = function () {
  if (includeFooter.readyState === 4 && includeFooter.status === 200) {
    const footerHTML = includeFooter.responseText;
    const footer = document.querySelector("#footer");
    if (footer) {
      footer.insertAdjacentHTML("afterbegin", footerHTML);
    }
  }
};
includeFooter.send();
