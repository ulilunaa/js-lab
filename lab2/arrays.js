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
}/**
 * Лабораторная работа №2
 * Реализация базовых методов работы с массивами
 * Запрещено использовать встроенные методы: forEach, map, filter, find, some, every, reduce
 */

/**
 * Выводит элементы массива в консоль в формате "Element N: value X"
 * @param {Array} array - Исходный массив
 * @returns {void}
 */
function printArray(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("Аргумент должен быть массивом");
  }
  for (let i = 0; i < array.length; i++) {
    console.log(`Element ${i}: value ${array[i]}`);
  }
}

/**
 * Выводит элементы массива в консоль в формате "N: X"
 * @param {Array} array - Исходный массив
 * @returns {void}
 */
function printArray1(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("Аргумент должен быть массивом");
  }
  for (let i = 0; i < array.length; i++) {
    console.log(`${i}:  ${array[i]}`);
  }
}

/**
 * Выполняет переданный колбэк для каждого элемента массива.
 * Функция ничего не возвращает (возвращаемое значение — undefined).
 * @param {Array} array - Исходный массив
 * @param {Function} callback - Функция обратного вызова: callback(element, index, array)
 * @returns {void}
 */
function forEach(array, callback) {
  if (!Array.isArray(array)) {
    throw new TypeError("Первый аргумент должен быть массивом");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Второй аргумент должен быть функцией");
  }
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

/**
 * Создаёт новый массив, содержащий результаты вызова колбэка для каждого элемента исходного массива.
 * @param {Array} array - Исходный массив
 * @param {Function} callback - Функция преобразования: callback(element, index, array)
 * @returns {Array} Новый массив с результатами вызова колбэка
 */
function map(array, callback) {
  if (!Array.isArray(array)) {
    throw new TypeError("Первый аргумент должен быть массивом");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Второй аргумент должен быть функцией");
  }
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

/**
 * Формирует новый массив из элементов, удовлетворяющих условию, заданному в колбэке.
 * @param {Array} array - Исходный массив
 * @param {Function} callback - Функция-предикат: callback(element, index, array) → boolean
 * @returns {Array} Новый массив с отфильтрованными элементами
 */
function filter(array, callback) {
  if (!Array.isArray(array)) {
    throw new TypeError("Первый аргумент должен быть массивом");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Второй аргумент должен быть функцией");
  }
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

/**
 * Возвращает первый элемент массива, удовлетворяющий условию колбэка.
 * @param {Array} array - Исходный массив
 * @param {Function} callback - Функция-предикат: callback(element, index, array) → boolean
 * @returns {*} Первый подходящий элемент или undefined, если не найден
 */
function find(array, callback) {
  if (!Array.isArray(array)) {
    throw new TypeError("Первый аргумент должен быть массивом");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Второй аргумент должен быть функцией");
  }
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
}

/**
 * Проверяет, существует ли хотя бы один элемент массива, удовлетворяющий условию.
 * Прекращает обход при первом совпадении.
 * @param {Array} array - Исходный массив
 * @param {Function} callback - Функция-предикат: callback(element, index, array) → boolean
 * @returns {boolean} true, если хотя бы один элемент прошёл проверку, иначе false
 */
function some(array, callback) {
  if (!Array.isArray(array)) {
    throw new TypeError("Первый аргумент должен быть массивом");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Второй аргумент должен быть функцией");
  }
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return true;
    }
  }
  return false;
}

/**
 * Проверяет, удовлетворяют ли все элементы массива заданному условию.
 * Прекращает обход при первом несоответствии.
 * @param {Array} array - Исходный массив
 * @param {Function} callback - Функция-предикат: callback(element, index, array) → boolean
 * @returns {boolean} true, если все элементы прошли проверку, иначе false
 */
function every(array, callback) {
  if (!Array.isArray(array)) {
    throw new TypeError("Первый аргумент должен быть массивом");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Второй аргумент должен быть функцией");
  }
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i], i, array)) {
      return false;
    }
  }
  return true;
}

/**
 * Последовательно обрабатывает элементы массива, накапливая результат в аккумуляторе.
 * @param {Array} array - Исходный массив
 * @param {Function} callback - Функция обратного вызова: callback(accumulator, element, index, array)
 * @param {*} [initialValue] - Начальное значение аккумулятора (необязательно)
 * @returns {*} Итоговое значение аккумулятора или undefined, если массив пустой и initialValue не передан
 */
function reduce(array, callback, initialValue) {
  if (!Array.isArray(array)) {
    throw new TypeError("Первый аргумент должен быть массивом");
  }
  if (typeof callback !== "function") {
    throw new TypeError("Второй аргумент должен быть функцией");
  }

  const hasInitial = arguments.length >= 3;

  if (array.length === 0 && !hasInitial) {
    return undefined;
  }

  let accumulator;
  let startIndex;

  if (hasInitial) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    accumulator = array[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }

  return accumulator;
}

export { printArray, printArray1, forEach, map, filter, find, some, every, reduce };

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
