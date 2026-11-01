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
console.log("getStatus однаковий?", sensorA.getStatus === sensorB.getStatus);
console.log("noiseLevel власна?", Object.hasOwn(sensorA, "noiseLevel"));
console.log("getStatus власна?", Object.hasOwn(sensorA, "getStatus"));
console.groupEnd();

console.group("Незалежність стану екземплярів");
sensorA.updateNoiseLevel(45);
console.log("NS-01:", sensorA.noiseLevel, "dB | NS-02:", sensorB.noiseLevel, "dB");
sensorA.updateNoiseLevel(58);
console.groupEnd();

console.group("MonitoringSystem");
console.log("Середній:", system.getAverageNoiseLevel().toFixed(2), "dB");
console.log("Критичні:", system.getCriticalSensors().map(s => s.id));
console.log("Галицький:", system.getSensorsByDistrict("Галицький").map(s => s.id));
console.groupEnd();

console.group("Вимірювання");
sensorA.addMeasurement(new NoiseMeasurement(73));
console.log("NS-01 після вимірювання:", sensorA.noiseLevel, "dB | статус:", sensorA.getStatus());
console.log("toString:", sensorA.measurements[0].toString());
console.groupEnd();

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

// ============================================================
// ЛАБОРАТОРНА РОБОТА №7 — Завантаження даних з API
// Головний ланцюжок:
// MockAPI → fetch() → response.json() → масив sensors → renderSensors(sensors) → картки
// ============================================================

// 1. API URL — замініть YOUR_MOCKAPI_URL на свою адресу з MockAPI
const API_URL = "https://6ae6c621877d34ccafc2e92c.mockapi.io/api/v1/sensors";

// 2. ЗАВАНТАЖЕННЯ ДАНИХ
async function loadSensors() {
  showApiLoading();

  try {
    // Перший await: надсилаємо GET-запит, чекаємо HTTP-відповідь
    const response = await fetch(API_URL);

    // Перевіряємо статус відповіді
    if (!response.ok) {
      throw new Error(`HTTP помилка: ${response.status}`);
    }

    // Другий await: читаємо тіло відповіді, конвертуємо JSON → масив JS
    const sensors = await response.json();

    console.log("[Лаб.7] Отримані сенсори:", sensors);

    // Передаємо масив у функцію відображення
    renderApiSensors(sensors);

  } catch (error) {
    console.error("[Лаб.7] Не вдалося завантажити сенсори:", error);
    showApiError(error.message);
  }
}

// 3. ВІДОБРАЖЕННЯ СЕНСОРІВ
// Ця функція НЕ звертається до API — лише отримує масив і будує картки
function renderApiSensors(sensors) {
  const container = document.querySelector("#sensors-list");
  if (!container) return;

  // Очищаємо попередній вміст
  container.innerHTML = "";

  sensors.forEach((sensor) => {
    const noiseClass = getNoiseClass(sensor.noiseLevel);
    const statusColor = sensor.status === "active" ? "#1f8a4c" : "#aaa";

    // Створюємо article для кожного сенсора
    const card = document.createElement("article");
    card.className = `sensor-card-api sensor-card-api--${sensor.status}`;

    card.innerHTML = `
      <div class="sensor-card-api__header">
        <h3 class="sensor-card-api__name">${sensor.name}</h3>
        <span class="sensor-card-api__badge sensor-card-api__badge--${sensor.status}">
          <span class="sensor-card-api__dot" style="background:${statusColor}"></span>
          ${sensor.status}
        </span>
      </div>
      <div class="sensor-card-api__body">
        <p class="sensor-card-api__row">
          <span class="sensor-card-api__icon">📍</span>
          ${sensor.district} район
        </p>
      </div>
      <div class="sensor-card-api__footer">
        <p class="sensor-card-api__row">
          <span class="sensor-card-api__icon">📶</span>
          Рівень шуму:
          <strong class="sensor-card-api__noise--${noiseClass}">
            ${sensor.noiseLevel} дБ
          </strong>
        </p>
      </div>
    `;

    // Додаємо картку в контейнер
    container.append(card);
  });
}

// Допоміжні функції
function showApiLoading() {
  const container = document.querySelector("#sensors-list");
  if (!container) return;
  container.innerHTML = `<p class="api-sensors__loading">Завантаження даних…</p>`;
}

function showApiError(message) {
  const container = document.querySelector("#sensors-list");
  if (!container) return;
  container.innerHTML = `<p class="api-sensors__error">Не вдалося завантажити дані: ${message}</p>`;
}

function getNoiseClass(level) {
  if (level < 65) return "low";
  if (level < 75) return "medium";
  return "high";
}

// ===== Єдина ініціалізація після завантаження DOM =====
document.addEventListener("DOMContentLoaded", () => {
  // Лаб. 5
  renderSensors();

  // Лаб. 6
  renderActiveSensors(sensorsLab6);
  const districtFilter = document.querySelector("#district-filter");
  const criticalFilter  = document.querySelector("#critical-filter");
  if (districtFilter) districtFilter.addEventListener("change", applyFilters);
  if (criticalFilter)  criticalFilter.addEventListener("change", applyFilters);

  // Лаб. 7 — завантажуємо сенсори з API
  loadSensors();

  // Кнопка оновити
  const reloadBtn = document.querySelector("#reload-btn");
  if (reloadBtn) reloadBtn.addEventListener("click", loadSensors);
});
