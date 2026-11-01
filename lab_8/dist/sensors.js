"use strict";
// Лабораторна робота №8 — робота з даними з API на TypeScript
// Потік даних: MockAPI → fetch() → response.json() → Sensor[] → renderSensors() → HTML-картки
// Endpoint ресурсу sensors у MockAPI (той самий проєкт, що й у лабораторній №7)
const API_URL = "https://6ae6c621877d34ccafc2e92c.mockapi.io/api/v1/sensors";
// Показує службове повідомлення (завантаження, порожній список, помилка) у контейнері #sensors
function showMessage(text, isError = false) {
    const container = document.querySelector("#sensors");
    if (!container) {
        return;
    }
    const message = document.createElement("p");
    message.className = isError
        ? "sensors-message sensors-message--error"
        : "sensors-message";
    message.textContent = text;
    container.replaceChildren(message);
}
// Створює один рядок картки виду «Район: Галицький»
function createRow(label, value) {
    const row = document.createElement("p");
    row.textContent = `${label}: ${value}`;
    return row;
}
// Лише показує дані: приймає масив Sensor[] і створює для кожного елемента картку
function renderSensors(sensors) {
    const container = document.querySelector("#sensors");
    if (!container) {
        return;
    }
    container.innerHTML = "";
    if (sensors.length === 0) {
        showMessage("Сенсорів поки що немає.");
        return;
    }
    sensors.forEach((sensor) => {
        const card = document.createElement("div");
        card.className = `sensor-card sensor-card--${sensor.status}`;
        const title = document.createElement("h3");
        title.textContent = sensor.name;
        // textContent (а не innerHTML) — дані з API показуються як текст, а не як HTML-код
        card.append(title, createRow("Район", sensor.district), createRow("Рівень шуму", `${sensor.noiseLevel} дБ`), createRow("Статус", sensor.status));
        container.appendChild(card);
    });
}
// Лише отримує дані: запит → перевірка відповіді → JSON → Sensor[] → renderSensors()
async function loadSensors() {
    showMessage("Завантаження даних…");
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Не вдалося завантажити сенсори (HTTP ${response.status})`);
        }
        const sensors = await response.json();
        renderSensors(sensors);
    }
    catch (error) {
        console.error("Помилка:", error);
        showMessage("Не вдалося завантажити дані з API. Спробуйте оновити сторінку пізніше.", true);
    }
}
loadSensors();
