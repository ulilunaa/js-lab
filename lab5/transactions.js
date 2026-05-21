/**
 * Модуль для работы с массивом транзакций
 * @module transactions
 */

import { generateId, formatDate } from "./utils.js";

/**
 * @typedef {Object} Transaction
 * @property {string} id - Уникальный идентификатор транзакции
 * @property {string} date - Дата и время добавления транзакции (отформатированная строка)
 * @property {number} amount - Сумма транзакции (положительная — доход, отрицательная — расход)
 * @property {string} category - Категория транзакции
 * @property {string} description - Описание транзакции
 */

/** @type {Transaction[]} */
const transactions = [];

/**
 * Создаёт объект транзакции и добавляет его в массив transactions
 * @param {number} amount - Сумма транзакции
 * @param {string} category - Категория транзакции
 * @param {string} description - Описание транзакции
 * @returns {Transaction} Созданный объект транзакции
 */
function addTransaction(amount, category, description) {
  /** @type {Transaction} */
  const transaction = {
    id: generateId(),
    date: formatDate(new Date()),
    amount: parseFloat(amount),
    category,
    description,
  };
  transactions.push(transaction);
  return transaction;
}

/**
 * Удаляет транзакцию из массива по идентификатору
 * @param {string} id - Идентификатор удаляемой транзакции
 * @returns {boolean} true, если транзакция найдена и удалена, иначе false
 */
function removeTransaction(id) {
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].id === id) {
      transactions.splice(i, 1);
      return true;
    }
  }
  return false;
}

/**
 * Возвращает транзакцию по идентификатору
 * @param {string} id - Идентификатор транзакции
 * @returns {Transaction|undefined} Найденная транзакция или undefined
 */
function getTransactionById(id) {
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].id === id) {
      return transactions[i];
    }
  }
  return undefined;
}

/**
 * Вычисляет общую сумму всех транзакций
 * @returns {number} Итоговая сумма
 */
function calculateTotal() {
  let total = 0;
  for (let i = 0; i < transactions.length; i++) {
    total += transactions[i].amount;
  }
  return total;
}

export { transactions, addTransaction, removeTransaction, getTransactionById, calculateTotal };
