/**
 * @fileoverview Лабораторная работа №2 — Реализация базовых методов работы с массивами
 * @description Реализация функций forEach, map, filter, find, some, every, reduce
 *              без использования встроенных методов массивов.
 */

// ─────────────────────────────────────────────
// 1.1 Вывод массива в консоль
// ─────────────────────────────────────────────

/**
 * Выводит элементы массива в формате "Element N: value X"
 * @param {Array} array - исходный массив
 * @returns {undefined}
 * @example
 * printArray([10, 20, 30]);
 * // Element 0: value 10
 * // Element 1: value 20
 * // Element 2: value 30
 */
function printArray(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(`Element ${i}: value ${array[i]}`);
  }
}

/**
 * Выводит элементы массива в формате "N: X"
 * @param {Array} array - исходный массив
 * @returns {undefined}
 * @example
 * printArray1([10, 20, 30]);
 * // 0: 10
 * // 1: 20
 * // 2: 30
 */
function printArray1(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(`${i}: ${array[i]}`);
  }
}

// ─────────────────────────────────────────────
// 1.2 forEach
// ─────────────────────────────────────────────

/**
 * Выполняет переданный колбэк для каждого элемента массива.
 * @param {Array} array - исходный массив
 * @param {Function} callback - функция вида (element, index, array)
 * @returns {undefined}
 * @example
 * forEach([1, 2, 3], (el, i) => console.log(`Element: ${el}, Index: ${i}`));
 * // Element: 1, Index: 0
 * // Element: 2, Index: 1
 * // Element: 3, Index: 2
 */
function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

// ─────────────────────────────────────────────
// 2. map
// ─────────────────────────────────────────────

/**
 * Создаёт новый массив из результатов вызова колбэка для каждого элемента.
 * @param {Array} array - исходный массив
 * @param {Function} callback - функция вида (element, index, array)
 * @returns {Array} новый массив с преобразованными элементами
 * @example
 * const squared = map([1, 2, 3], el => el * el);
 * console.log(squared); // [1, 4, 9]
 */
function map(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

// ─────────────────────────────────────────────
// 3. filter
// ─────────────────────────────────────────────

/**
 * Возвращает новый массив из элементов, для которых колбэк вернул true.
 * @param {Array} array - исходный массив
 * @param {Function} callback - функция вида (element, index, array), возвращает boolean
 * @returns {Array} отфильтрованный массив
 * @example
 * const even = filter([1, 2, 3, 4, 5], el => el % 2 === 0);
 * console.log(even); // [2, 4]
 */
function filter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

// ─────────────────────────────────────────────
// 4. find
// ─────────────────────────────────────────────

/**
 * Возвращает первый элемент массива, для которого колбэк вернул true.
 * @param {Array} array - исходный массив
 * @param {Function} callback - функция вида (element, index, array), возвращает boolean
 * @returns {*} найденный элемент или undefined
 * @example
 * const first = find([1, 2, 3, 4], el => el % 2 === 0);
 * console.log(first); // 2
 */
function find(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
}

// ─────────────────────────────────────────────
// 5. some
// ─────────────────────────────────────────────

/**
 * Проверяет, есть ли хотя бы один элемент, для которого колбэк вернул true.
 * Обход прекращается при первом совпадении.
 * @param {Array} array - исходный массив
 * @param {Function} callback - функция вида (element, index, array), возвращает boolean
 * @returns {boolean}
 * @example
 * const hasEven = some([1, 3, 5, 4], el => el % 2 === 0);
 * console.log(hasEven); // true
 */
function some(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return true;
    }
  }
  return false;
}

// ─────────────────────────────────────────────
// 6. every
// ─────────────────────────────────────────────

/**
 * Проверяет, все ли элементы массива удовлетворяют условию колбэка.
 * Обход прекращается при первом несоответствии.
 * @param {Array} array - исходный массив
 * @param {Function} callback - функция вида (element, index, array), возвращает boolean
 * @returns {boolean}
 * @example
 * const allEven = every([2, 4, 6], el => el % 2 === 0);
 * console.log(allEven); // true
 */
function every(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i], i, array)) {
      return false;
    }
  }
  return true;
}

// ─────────────────────────────────────────────
// 7. reduce (дополнительное задание)
// ─────────────────────────────────────────────

/**
 * Последовательно обрабатывает элементы массива, накапливая результат в аккумуляторе.
 * @param {Array} array - исходный массив
 * @param {Function} callback - функция вида (accumulator, element, index, array)
 * @param {*} [initialValue] - начальное значение аккумулятора (необязательно)
 * @returns {*} итоговое значение аккумулятора, или undefined если массив пуст
 * @example
 * const sum = reduce([1, 2, 3, 4, 5], (acc, el) => acc + el, 0);
 * console.log(sum); // 15
 */
function reduce(array, callback, initialValue) {
  if (array.length === 0 && initialValue === undefined) {
    return undefined;
  }

  let acc;
  let startIndex;

  if (initialValue !== undefined) {
    acc = initialValue;
    startIndex = 0;
  } else {
    acc = array[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < array.length; i++) {
    acc = callback(acc, array[i], i, array);
  }

  return acc;
}
