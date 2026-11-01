"use strict";

import { NoiseMeasurement } from "./NoiseMeasurement.js";

const NOISE_LIMITS = Object.freeze({
  normalMax: 55,
  warningMax: 70,
});

class NoiseSensor {
  constructor(id, district, location, noiseLevel) {
    this.id = id;
    this.district = district;
    this.location = location;
    this.noiseLevel = noiseLevel;
    this.measurements = [];
  }

  getStatus() {
    if (this.noiseLevel <= NOISE_LIMITS.normalMax) return "normal";
    if (this.noiseLevel <= NOISE_LIMITS.warningMax) return "warning";
    return "critical";
  }

  updateNoiseLevel(value) {
    if (!NoiseSensor.isValidNoiseLevel(value)) {
      throw new Error(`Некоректний рівень шуму: ${value}`);
    }
    this.noiseLevel = value;
  }

  addMeasurement(measurement) {
    if (!(measurement instanceof NoiseMeasurement)) {
      throw new Error("Очікується об'єкт NoiseMeasurement");
    }
    if (!measurement.isValid()) {
      throw new Error(`Некоректне вимірювання: ${measurement.value}`);
    }
    this.measurements.push(measurement);
    this.noiseLevel = measurement.value;
  }

  static isValidNoiseLevel(value) {
    return Number.isFinite(value) && value >= 0 && value <= 200;
  }

  static fromObject(data) {
    const { id, district, location, noiseLevel } = data;
    if (!id || !district || !location || noiseLevel === undefined) {
      throw new Error(`Недостатньо даних: ${JSON.stringify(data)}`);
    }
    return new NoiseSensor(id, district, location, noiseLevel);
  }
}

class MobileNoiseSensor extends NoiseSensor {
  constructor(id, district, location, noiseLevel, batteryLevel) {
    super(id, district, location, noiseLevel);
    this.batteryLevel = batteryLevel;
  }

  needsCharging() {
    return this.batteryLevel < 20;
  }

  getStatus() {
    const base = super.getStatus();
    if (this.needsCharging()) return `${base} (low battery)`;
    return base;
  }
}

export { NoiseSensor, MobileNoiseSensor, NOISE_LIMITS };