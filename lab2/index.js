/**
 * @fileoverview Лабораторная работа №2 — Реализация базовых методов работы с массивами
 * @description Реализация функций forEach, map, filter, find, some, every, reduce
 *              без использования встроенных методов массивов.
 */

/**
 * 1.1 Выводит элементы массива в формате: "Element [index]: value [value]"
 * @param {Array} array - Исходный массив
 */
function printArray(array) {
  if (!Array.isArray(array)) throw new TypeError("Аргумент должен быть массивом");
  for (let i = 0; i < array.length; i++) {
    console.log(`Element ${i}: value ${array[i]}`);
  }
}

/**
 * 1.1 Выводит элементы массива в формате: "[index]: [value]"
 * @param {Array} array - Исходный массив
 */
function printArray1(array) {
  if (!Array.isArray(array)) throw new TypeError("Аргумент должен быть массивом");
  for (let i = 0; i < array.length; i++) {
    console.log(`${i}:  ${array[i]}`);
  }
}

/**
 * 1.2 Выполняет переданную функцию (колбэк) один раз для каждого элемента массива.
 * @param {Array} array - Массив для обхода.
 * @param {Function} callback - Функция, выполняемая для каждого элемента.
 * @returns {undefined} Функция ничего не возвращает.
 */
function forEach(array, callback) {
  if (!Array.isArray(array)) throw new TypeError("Первый аргумент должен быть массивом");
  if (typeof callback !== "function") throw new TypeError("Второй аргумент должен быть функцией");

  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

/**
 * 2. Создает новый массив с результатами вызова указанной функции для каждого элемента.
 * @param {Array} array - Исходный массив.
 * @param {Function} callback - Функция-преобразователь.
 * @returns {Array} Новый массив с преобразованными элементами.
 */
function map(array, callback) {
  if (!Array.isArray(array)) throw new TypeError("Не массив");
  if (typeof callback !== "function") throw new TypeError("Не функция");

  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

/**
 * 3. Создает новый массив со всеми элементами, прошедшими проверку, заданную в колбэке.
 * @param {Array} array - Исходный массив.
 * @param {Function} callback - Функция-предикат (возвращает true/false).
 * @returns {Array} Новый отфильтрованный массив.
 */
function filter(array, callback) {
  if (!Array.isArray(array)) throw new TypeError("Не массив");
  if (typeof callback !== "function") throw new TypeError("Не функция");

  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

/**
 * 4. Возвращает первый элемент массива, удовлетворяющий условию.
 * @param {Array} array - Исходный массив.
 * @param {Function} callback - Функция-предикат.
 * @returns {*} Найденный элемент или undefined.
 */
function find(array, callback) {
  if (!Array.isArray(array)) throw new TypeError("Не массив");
  if (typeof callback !== "function") throw new TypeError("Не функция");

  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
}

/**
 * 5. Проверяет, удовлетворяет ли хотя бы один элемент массива условию.
 * @param {Array} array - Исходный массив.
 * @param {Function} callback - Функция-предикат.
 * @returns {boolean} true, если есть хотя бы одно совпадение, иначе false.
 */
function some(array, callback) {
  if (!Array.isArray(array)) throw new TypeError("Не массив");
  if (typeof callback !== "function") throw new TypeError("Не функция");

  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return true;
    }
  }
  return false;
}

/**
 * 6. Проверяет, все ли элементы массива удовлетворяют условию.
 * @param {Array} array - Исходный массив.
 * @param {Function} callback - Функция-предикат.
 * @returns {boolean} true, если все элементы подходят, иначе false.
 */
function every(array, callback) {
  if (!Array.isArray(array)) throw new TypeError("Не массив");
  if (typeof callback !== "function") throw new TypeError("Не функция");

  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i], i, array)) {
      return false;
    }
  }
  return true;
}

/**
 * 7. Применяет функцию к аккумулятору и каждому элементу массива, сводя его к одному значению.
 * @param {Array} array - Исходный массив.
 * @param {Function} callback - Функция (accumulator, element, index, array).
 * @param {*} [initialValue] - Начальное значение аккумулятора (необязательно).
 * @returns {*} Итоговое значение аккумулятора.
 */
function reduce(array, callback, initialValue) {
  if (!Array.isArray(array)) throw new TypeError("Не массив");
  if (typeof callback !== "function") throw new TypeError("Не функция");

  if (array.length === 0 && initialValue === undefined) {
    return undefined; 
  }

  let accumulator;
  let startIndex = 0;

  if (initialValue !== undefined) {
    accumulator = initialValue;
  } else {
    accumulator = array[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }

  return accumulator;
}

// ==========================================
// ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ (ДЛЯ ПРОВЕРКИ)
// ==========================================

console.log("--- Тест forEach ---");
forEach([1, 2, 3], (el, i) => console.log(`Element: ${el}, Index: ${i}`));

console.log("\n--- Тест map ---");
console.log(map([1, 2, 3], (el) => el * el)); // [1, 4, 9]

console.log("\n--- Тест filter ---");
console.log(filter([1, 2, 3, 4, 5], (el) => el % 2 === 0)); // [2, 4]

console.log("\n--- Тест find ---");
console.log(find([1, 2, 3, 4, 5], (el) => el % 2 === 0)); // 2

console.log("\n--- Тест some ---");
console.log(some([1, 3, 5], (el) => el % 2 === 0)); // false
console.log(some([1, 2, 5], (el) => el % 2 === 0)); // true

console.log("\n--- Тест every ---");
console.log(every([2, 4, 6], (el) => el % 2 === 0)); // true
console.log(every([2, 4, 5], (el) => el % 2 === 0)); // false

console.log("\n--- Тест reduce ---");
console.log(reduce([1, 2, 3, 4, 5], (acc, el) => acc + el, 0)); // 15
