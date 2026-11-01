"use strict";

import { NoiseMeasurement } from "./models/NoiseMeasurement.js";
import { NoiseSensor, MobileNoiseSensor } from "./models/NoiseSensor.js";
import { MonitoringSystem } from "./services/MonitoringSystem.js";

// ===== Початкові дані =====
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

// ===== DOM =====
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

document.addEventListener("DOMContentLoaded", () => {
  renderSensors();
});
// ===== Модальне вікно форми =====
const form = document.querySelector(".form");
const modal = document.getElementById("success-modal");

if (form && modal) {
  const text = modal.querySelector(".modal__text");
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
