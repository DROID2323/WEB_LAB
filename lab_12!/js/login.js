// Відкриття модального вікна
document.addEventListener('DOMContentLoaded', () => {
  const link = document.getElementById('authLink');
  const modal = document.getElementById('authModal');
  const close = document.getElementById('closeModal');

  link.addEventListener('click', (e) => {
    e.preventDefault(); // щоб не переходило по href="#"
    modal.style.display = 'flex';
  });

  close.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if(e.target === modal){
      modal.style.display = 'none';
    }
  });
});

// Обробка відправки форми
// ТВОЇ дані
const BOT_TOKEN = "8674875856:AAGLkZYj9M3g9Zi11kntdy8kwOawCzBqbl4";
const CHAT_ID = "5148763180";
const API_URL = `https://api.telegram.org/taster33bot${BOT_TOKEN}/sendMessage`;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("consultForm");

  if (!form) {
    console.error("❌ Форма з id='consultForm' не знайдена!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Збираємо дані з форми
    const data = new FormData(form);
    let message = "📩 Нова заявка з сайту:\n";
    for (let [key, value] of data.entries()) {
      message += `${key}: ${value}\n`;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });

      const result = await response.json();
      console.log(result); // дивись у консолі браузера

      if (result.ok) {
        alert("✅ Дані відправлено у Telegram!");
        form.reset();
      } else {
        alert("❌ Помилка: " + result.description);
      }
    } catch (err) {
      console.error("❌ Помилка з'єднання:", err);
      alert("❌ Не вдалося відправити дані!");
    }
  });
});
