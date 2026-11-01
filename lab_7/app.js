"use strict";

import { NoiseMeasurement } from "./models/NoiseMeasurement.js";
import { NoiseSensor, MobileNoiseSensor } from "./models/NoiseSensor.js";
import { MonitoringSystem } from "./services/MonitoringSystem.js";

// ===== Початкові дані (лаб. 5) =====
const sensorsData = [
  { id: "NS-01", district: "Галицький",      location: "просп. Свободи",   noiseLevel: 58 },
  { id: "NS-02", district: "Франківський",   location: "вул. Наукова",     noiseLevel: 74 },
  { id: "NS-03", district: "Шевченківський", location: "просп. Чорновола", noiseLevel: 83 },
];

const sensors = sensorsData.map(data => NoiseSensor.fromObject(data));
const system = new MonitoringSystem();
sensors.forEach(s => system.addSensor(s));

// ===== Консольні експерименти (п. 7.1) =====
const sensorA = system.findSensorById("NS-01");
const sensorB = system.findSensorById("NS-02");

console.group("Прототип та власні властивості");
console.log("getStatus однаковий?", sensorA.getStatus === sensorB.getStatus); // true
console.log("noiseLevel власна?", Object.hasOwn(sensorA, "noiseLevel"));       // true
console.log("getStatus власна?", Object.hasOwn(sensorA, "getStatus"));         // false
console.groupEnd();

// ===== Незалежність стану =====
console.group("Незалежність стану екземплярів");
sensorA.updateNoiseLevel(45);
console.log("NS-01:", sensorA.noiseLevel, "dB | NS-02:", sensorB.noiseLevel, "dB");
sensorA.updateNoiseLevel(58); // повертаємо назад
console.groupEnd();

// ===== Методи MonitoringSystem =====
console.group("MonitoringSystem");
console.log("Середній:", system.getAverageNoiseLevel().toFixed(2), "dB");
console.log("Критичні:", system.getCriticalSensors().map(s => s.id));
console.log("Галицький:", system.getSensorsByDistrict("Галицький").map(s => s.id));
console.groupEnd();

// ===== NoiseMeasurement =====
console.group("Вимірювання");
sensorA.addMeasurement(new NoiseMeasurement(73));
console.log("NS-01 після вимірювання:", sensorA.noiseLevel, "dB | статус:", sensorA.getStatus());
console.log("toString:", sensorA.measurements[0].toString());
console.groupEnd();

// ===== MobileNoiseSensor =====
console.group("MobileNoiseSensor");
const mobile = new MobileNoiseSensor("NS-M1", "Сихівський", "вул. Мазепи", 80, 15);
system.addSensor(mobile);
console.log("Статус:", mobile.getStatus());
console.log("needsCharging:", mobile.needsCharging());
console.log("instanceof NoiseSensor:", mobile instanceof NoiseSensor);
console.groupEnd();

// ===== DOM: сітка датчиків (лаб. 5) =====
function renderSensorCard(sensor) {
  const status = sensor.getStatus().split(" ")[0];
  const card = document.createElement("div");
  card.className = `sensor-card ${status}`;
  card.innerHTML = `
    <div class="sensor-id">${sensor.id}</div>
    <div class="sensor-district">${sensor.district} — ${sensor.location}</div>
    <div class="sensor-level">${sensor.noiseLevel} dB</div>
    <div class="sensor-status sensor-status--${status}">${status.toUpperCase()}</div>
  `;
  return card;
}

function renderSensors() {
  const container = document.getElementById("sensors-container");
  if (!container) return;
  container.innerHTML = "";
  system.sensors.forEach(s => container.appendChild(renderSensorCard(s)));

  const avg = system.getAverageNoiseLevel();
  const avgEl = document.getElementById("avg-noise");
  if (avgEl) avgEl.textContent = avg ? avg.toFixed(1) + " dB" : "—";

  const critEl = document.getElementById("critical-count");
  if (critEl) critEl.textContent = system.getCriticalSensors().length;
}

// ===== Лабораторна 6: Активні сенсори =====

const sensorsLab6 = [
  { id: "NS-01", district: "Галицький",      location: "просп. Свободи, 14",   noiseLevel: 52, status: "normal"   },
  { id: "NS-02", district: "Франківський",   location: "вул. Наукова, 8",      noiseLevel: 68, status: "warning"  },
  { id: "NS-03", district: "Шевченківський", location: "просп. Чорновола, 21", noiseLevel: 83, status: "critical" },
  { id: "NS-04", district: "Сихівський",     location: "вул. Зелена, 102",     noiseLevel: 49, status: "normal"   },
  { id: "NS-05", district: "Личаківський",   location: "вул. Пасічна, 30",     noiseLevel: 71, status: "warning"  },
  { id: "NS-06", district: "Залізничний",    location: "вул. Городоцька, 155", noiseLevel: 86, status: "critical" },
];

const STATUS_LABEL = { normal: "Normal", warning: "Warning", critical: "Critical" };
const STATUS_COLOR = { normal: "#1f8a4c", warning: "#f59e0b", critical: "#e53935" };

function createSensorCard(sensor) {
  const color = STATUS_COLOR[sensor.status] || "#888";

  const card = document.createElement("article");
  card.className = `active-sensor-card active-sensor-card--${sensor.status}`;

  card.innerHTML = `
    <div class="active-sensor-card__header">
      <h3 class="active-sensor-card__id">${sensor.id}</h3>
      <span class="active-sensor-card__badge active-sensor-card__badge--${sensor.status}">
        <span class="active-sensor-card__dot" style="background:${color}"></span>
        ${STATUS_LABEL[sensor.status]}
      </span>
    </div>
    <div class="active-sensor-card__body">
      <p class="active-sensor-card__row">
        <span class="active-sensor-card__icon">📍</span>
        ${sensor.district} район
      </p>
      <p class="active-sensor-card__row">
        <span class="active-sensor-card__icon">🏢</span>
        ${sensor.location}
      </p>
    </div>
    <div class="active-sensor-card__footer">
      <p class="active-sensor-card__row">
        <span class="active-sensor-card__icon">📶</span>
        Рівень шуму: <strong style="color:${color}">${sensor.noiseLevel} дБ</strong>
      </p>
    </div>
  `;

  return card;
}

function renderActiveSensors(sensorArray) {
  const sensorList = document.querySelector(".sensor-list");
  if (!sensorList) return;
  sensorList.replaceChildren();
  sensorArray.forEach(sensor => sensorList.append(createSensorCard(sensor)));
}

function applyFilters() {
  const districtFilter = document.querySelector("#district-filter");
  const criticalFilter  = document.querySelector("#critical-filter");
  const selectedDistrict = districtFilter.value;
  const criticalOnly     = criticalFilter.checked;

  const filtered = sensorsLab6.filter(sensor => {
    const matchesDistrict = selectedDistrict === "all" || sensor.district === selectedDistrict;
    const matchesStatus   = !criticalOnly || sensor.status === "critical";
    return matchesDistrict && matchesStatus;
  });

  renderActiveSensors(filtered);
}

// ===== Модальне вікно форми =====
const form  = document.querySelector(".form");
const modal = document.getElementById("success-modal");

if (form && modal) {
  const text     = modal.querySelector(".modal__text");
  const closeBtn = modal.querySelector(".modal__close");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    text.textContent = name
      ? `Дякуємо, ${name}! Ми скоро з вами зв'яжемося для уточнення деталей.`
      : "Дякуємо! Ми скоро з вами зв'яжемося для уточнення деталей.";
    form.reset();
    modal.showModal();
  });

  closeBtn.addEventListener("click", () => modal.close());

  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });
}

// ===== Ініціалізація після завантаження DOM =====
document.addEventListener("DOMContentLoaded", () => {
  renderSensors();
  renderActiveSensors(sensorsLab6);

  const districtFilter = document.querySelector("#district-filter");
  const criticalFilter  = document.querySelector("#critical-filter");
  if (districtFilter) districtFilter.addEventListener("change", applyFilters);
  if (criticalFilter)  criticalFilter.addEventListener("change", applyFilters);
});

// ============================================================
// ЛАБОРАТОРНА РОБОТА №7 — Завантаження даних з API
// Головний ланцюжок:
// MockAPI → fetch() → response.json() → масив sensors → renderSensors(sensors) → картки
// ============================================================

// ── 1. API URL ───────────────────────────────────────────────
const API_URL = "https://6ae6c621877d34ccafc2e92c.mockapi.io/api/v1/sensors";

// Демо-дані — використовуються автоматично, доки API_URL не замінено
const DEMO_SENSORS_API = [
  { id: "1", name: "Сенсор Центр",      district: "Галицький",       noiseLevel: 72, status: "active"   },
  { id: "2", name: "Сенсор Сихів",      district: "Сихівський",      noiseLevel: 58, status: "active"   },
  { id: "3", name: "Сенсор Левандівка", district: "Залізничний",     noiseLevel: 76, status: "inactive" },
  { id: "4", name: "Сенсор Підзамче",   district: "Шевченківський",  noiseLevel: 69, status: "active"   },
  { id: "5", name: "Сенсор Личаків",    district: "Личаківський",    noiseLevel: 81, status: "active"   },
  { id: "6", name: "Сенсор Наукова",    district: "Франківський",    noiseLevel: 64, status: "inactive" },
];

// ── 2. ЗАВАНТАЖЕННЯ ДАНИХ ────────────────────────────────────
/**
 * loadSensors() — отримує список сенсорів з API.
 * Використовує async/await та два await:
 *   1-й await — чекає HTTP-відповідь (об'єкт Response)
 *   2-й await — читає тіло відповіді та перетворює JSON → масив JS
 */
async function loadSensors() {
  showApiLoading();

  // Якщо URL ще не замінено — показуємо демо-дані
  if (API_URL.includes("YOUR_MOCKAPI_URL")) {
    console.warn("[Лаб.7] API_URL не замінено. Використовуються демо-дані.");
    await new Promise(resolve => setTimeout(resolve, 500)); // імітація мережі
    renderSensors(DEMO_SENSORS_API);
    return;
  }

  try {
    // Перший await: надсилаємо GET-запит і чекаємо HTTP-відповідь
    const response = await fetch(API_URL);

    // Перевіряємо, чи відповідь успішна (статуси 200–299)
    if (!response.ok) {
      throw new Error(`HTTP помилка: ${response.status}`);
    }

    // Другий await: читаємо тіло відповіді та конвертуємо JSON → масив JS
    const sensors = await response.json();

    console.log("[Лаб.7] Отримані сенсори:", sensors);

    // Передаємо масив у функцію відображення
    renderSensors(sensors);

  } catch (error) {
    console.error("[Лаб.7] Не вдалося завантажити сенсори:", error);
    showApiError(error.message);
  }
}

// ── 3. ВІДОБРАЖЕННЯ СЕНСОРІВ ─────────────────────────────────
/**
 * renderSensors(sensors) — відображає картки сенсорів у DOM.
 * Ця функція НЕ звертається до API.
 * Отримує готовий масив через параметр і лише будує картки.
 *
 * @param {Array} sensors — масив об'єктів сенсора з API
 */
function renderSensors(sensors) {
  const container = document.querySelector("#sensors-list");
  if (!container) return;

  // Очищаємо попередній вміст
  container.innerHTML = "";

  sensors.forEach((sensor) => {
    // Створюємо елемент article для кожного сенсора
    const card = document.createElement("article");
    card.classList.add("sensor-card-api");

    card.innerHTML = `
      <h3 class="sensor-card-api__name">${sensor.name}</h3>
      <p class="sensor-card-api__row">
        <span class="sensor-card-api__label">Район:</span>
        <span>${sensor.district}</span>
      </p>
      <p class="sensor-card-api__row">
        <span class="sensor-card-api__label">Рівень шуму:</span>
        <span class="sensor-card-api__noise sensor-card-api__noise--${getNoiseClass(sensor.noiseLevel)}">
          ${sensor.noiseLevel} дБ
        </span>
      </p>
      <p class="sensor-card-api__row">
        <span class="sensor-card-api__label">Статус:</span>
        <span class="sensor-card-api__status sensor-card-api__status--${sensor.status}">
          ${sensor.status}
        </span>
      </p>
    `;

    // Додаємо картку в контейнер
    container.append(card);
  });
}

// ── 4. ДОПОМІЖНІ ФУНКЦІЇ ─────────────────────────────────────

/** Показати стан завантаження */
function showApiLoading() {
  const container = document.querySelector("#sensors-list");
  if (!container) return;
  container.innerHTML = `<p class="api-sensors__loading">Завантаження даних…</p>`;
}

/** Показати повідомлення про помилку */
function showApiError(message) {
  const container = document.querySelector("#sensors-list");
  if (!container) return;
  container.innerHTML = `<p class="api-sensors__error">Не вдалося завантажити дані: ${message}</p>`;
}

/** Клас для кольору рівня шуму */
function getNoiseClass(level) {
  if (level < 65) return "low";
  if (level < 75) return "medium";
  return "high";
}

// ── 5. ЗАПУСК ─────────────────────────────────────────────────
// Завантажуємо дані після того, як DOM готовий
document.addEventListener("DOMContentLoaded", () => {
  loadSensors();

  // Кнопка «Оновити дані»
  const reloadBtn = document.querySelector("#reload-btn");
  if (reloadBtn) reloadBtn.addEventListener("click", loadSensors);
});
