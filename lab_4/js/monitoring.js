"use strict";

// ===== Вихідні дані =====
const noiseLevels = [
  42, 55, 61, 78, 83, 67, 49, 72, 91, 58, 64, 76,
  53, 47, 88, 69, 74, 82, 95, 51, 71, -1, 85, 63,
  79, 39, 141, 86
];
const warningLevel = 70;
const criticalLevel = 85;
const minValidLevel = 30;
const maxValidLevel = 130;

// ===== Hoisting: Function Declaration доступна до свого тексту =====
// Виклик стоїть ВИЩЕ оголошення, але працює.
const hoistedDemo = findFirstCritical([10, 90], 85, 30, 130);
// console.log(hoistedDemo); // { value: 90, position: 2 }

// ===== Спільна перевірка коректності =====
function isValidLevel(level, min, max) {
  return Number.isFinite(level) && level >= min && level <= max;
}

// ===== Function Declaration: перше критичне вимірювання (for + break) =====
function findFirstCritical(data, critical, min, max) {
  let result = null;
  for (let i = 0; i < data.length; i++) {
    if (isValidLevel(data[i], min, max) && data[i] > critical) {
      result = { value: data[i], position: i + 1 };
      break;
    }
  }
  return result;
}

// ===== Function Expression: підрахунок по категоріях (for...of + continue) =====
const countByCategory = function (data, warning, critical, min, max) {
  let total = 0;
  let sum = 0;
  let normal = 0;
  let warn = 0;
  let crit = 0;

  for (const level of data) {
    if (!isValidLevel(level, min, max)) {
      continue;
    }
    total++;
    sum += level;
    if (level <= warning) {
      normal++;
    } else if (level <= critical) {
      warn++;
    } else {
      crit++;
    }
  }
  return { total, sum, normal, warn, crit };
};

// ===== Середнє, мінімум, максимум (без filter/reduce/Math.min/Math.max) =====
function calculateAverage(data, min, max) {
  let sum = 0;
  let count = 0;
  for (const level of data) {
    if (!isValidLevel(level, min, max)) {
      continue;
    }
    sum += level;
    count++;
  }
  return count === 0 ? null : sum / count;
}

function findMinimum(data, min, max) {
  let result = null;
  for (const level of data) {
    if (!isValidLevel(level, min, max)) {
      continue;
    }
    if (result === null || level < result) {
      result = level;
    }
  }
  return result;
}

function findMaximum(data, min, max) {
  let result = null;
  for (const level of data) {
    if (!isValidLevel(level, min, max)) {
      continue;
    }
    if (result === null || level > result) {
      result = level;
    }
  }
  return result;
}

// ===== while: відновлення (3 безпечні коректні виміри поспіль) =====
function findRecovery(data, warning, critical, min, max) {
  const first = findFirstCritical(data, critical, min, max);
  if (first === null) {
    return null;
  }
  let i = first.position; // індекс елемента, що йде після першого критичного
  let streak = 0;
  while (i < data.length) {
    if (isValidLevel(data[i], min, max) && data[i] <= warning) {
      streak++;
      if (streak === 3) {
        return { value: data[i], position: i + 1 };
      }
    } else {
      streak = 0;
    }
    i++; // індекс збільшується на кожній ітерації
  }
  return null;
}

// ===== do...while: перше коректне вимірювання =====
function findFirstValid(data, min, max) {
  if (data.length === 0) {
    return null;
  }
  // Масив непорожній, тому перший елемент точно існує:
  // перевірка тіла виконується щонайменше один раз.
  let i = 0;
  do {
    if (isValidLevel(data[i], min, max)) {
      return { value: data[i], position: i + 1 };
    }
    i++;
  } while (i < data.length);
  return null;
}

// ===== Arrow functions =====
// Один параметр, дужки опущено:
const statusLabel = value => `${value} dB`;
// Кілька параметрів, implicit return:
const isAbove = (value, threshold) => value > threshold;

// ===== Callback: функцію передаємо без дужок виклику =====
function runAnalysis(data, analyzer, warning, critical, min, max) {
  return analyzer(data, warning, critical, min, max); // синхронний виклик
}

// ===== Некоректні записи (для діагностики) =====
function collectInvalid(data, min, max) {
  const invalid = [];
  for (let i = 0; i < data.length; i++) {
    if (!isValidLevel(data[i], min, max)) {
      invalid.push({ value: data[i], position: i + 1 });
    }
  }
  return invalid;
}

// ===== Форматування (лише для показу) =====
const formatNumber = value => value.toFixed(2).replace(".", ",");

// ===== Підсумковий звіт =====
function printReport(data, warning, critical, min, max) {
  const stats = runAnalysis(data, countByCategory, warning, critical, min, max);
  const average = calculateAverage(data, min, max);
  const minimum = findMinimum(data, min, max);
  const maximum = findMaximum(data, min, max);
  const firstCritical = findFirstCritical(data, critical, min, max);
  const recovery = findRecovery(data, warning, critical, min, max);
  const invalid = collectInvalid(data, min, max);
  const exceedWarning = stats.warn + stats.crit;

  console.group("Акустична варта — звіт моніторингу");
  console.log(`Пороги: попередження > ${warning} dB; критичний рівень > ${critical} dB`);
  console.log(`Усього вимірювань: ${data.length}`);
  console.log(`Коректних: ${stats.total}`);
  console.log(`Некоректних: ${invalid.length}`);

  console.table([
    { "Категорія": "Без перевищення", "Кількість": stats.normal },
    { "Категорія": "Попередження", "Кількість": stats.warn },
    { "Категорія": "Критичні", "Кількість": stats.crit }
  ]);

  if (average === null) {
    console.log("Середній, мінімальний і максимальний рівні: немає коректних даних");
  } else {
    console.log(`Середній рівень: ${formatNumber(average)} dB`);
    console.log(`Мінімальний рівень: ${minimum} dB`);
    console.log(`Максимальний рівень: ${maximum} dB`);
  }

  if (firstCritical === null) {
    console.log("Перше критичне вимірювання: не знайдено");
  } else {
    console.log(`Перше критичне вимірювання: ${statusLabel(firstCritical.value)}, позиція ${firstCritical.position}`);
  }

  if (firstCritical === null) {
    console.log("Відновлення: критичних вимірювань не було");
  } else if (recovery === null) {
    console.log("Відновлення — три безпечні вимірювання поспіль: не знайдено");
  } else {
    console.log(`Відновлення — три безпечні вимірювання поспіль: завершено на позиції ${recovery.position} (${statusLabel(recovery.value)})`);
  }

  if (exceedWarning > 0) {
    console.warn(`Поріг ${warning} dB перевищено у ${exceedWarning} вимірюваннях.`);
  }

  if (invalid.length > 0) {
    const list = invalid
      .map(item => `позиція ${item.position} (${item.value} dB)`)
      .join(", ");
    console.error(`Некоректні дані: ${list}.`);
  }

  if (firstCritical === null) {
    console.log("Висновок: критичних вимірювань не зафіксовано.");
  } else if (recovery === null) {
    console.log(`Висновок: зафіксовано критичних вимірювань: ${stats.crit}; після першого з них стійкого відновлення не виявлено.`);
  } else {
    console.log(`Висновок: зафіксовано критичних вимірювань: ${stats.crit}; відновлення настало на позиції ${recovery.position}.`);
  }
  console.groupEnd();
}

printReport(noiseLevels, warningLevel, criticalLevel, minValidLevel, maxValidLevel);

// ===== Тестові набори (основний масив не змінюється) =====
function runTests() {
  const w = warningLevel, c = criticalLevel, mn = minValidLevel, mx = maxValidLevel;
  const cases = {
    "[]": [],
    "[-1, 141]": [-1, 141],
    "[70, 85, 86]": [70, 85, 86],
    "серія переривається": [90, 60, 60, 80, 60, 60, 60]
  };
  console.group("Тести");
  for (const name in cases) {
    const d = cases[name];
    console.log(name, {
      average: calculateAverage(d, mn, mx),
      min: findMinimum(d, mn, mx),
      max: findMaximum(d, mn, mx),
      firstCritical: findFirstCritical(d, c, mn, mx),
      recovery: findRecovery(d, w, c, mn, mx),
      firstValid: findFirstValid(d, mn, mx),
      categories: countByCategory(d, w, c, mn, mx)
    });
  }
  console.groupEnd();
}
runTests();


// earlyCall(); // ReferenceError: Cannot access 'earlyCall' before initialization
// const earlyCall = function () {};