
function copyCode(btn) {
    const code = btn.closest(".code-block").querySelector("code").innerText;
    navigator.clipboard.writeText(code).then(() => {
        btn.textContent = "Copied!!";
        setTimeout(() => {
            btn.textContent = "Copy";
        }, 1500);
    });
}