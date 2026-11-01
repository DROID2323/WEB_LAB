"use strict";

// Модальне вікно після успішної відправки форми «Замовити дослідження»
const form = document.querySelector(".form");
const modal = document.getElementById("success-modal");

if (form && modal) {
  const text = modal.querySelector(".modal__text");
  const closeBtn = modal.querySelector(".modal__close");

  // Подія submit спрацьовує лише тоді, коли всі required-поля заповнені
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    text.textContent = name
      ? `Дякуємо, ${name}! Ми скоро з вами зв’яжемося для уточнення деталей.`
      : "Дякуємо! Ми скоро з вами зв’яжемося для уточнення деталей.";

    form.reset();
    modal.showModal();
  });

  closeBtn.addEventListener("click", () => modal.close());

  // Клік по затемненню (backdrop) також закриває вікно
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
}
