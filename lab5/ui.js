/**
 * Модуль для работы с DOM: отрисовка таблицы, формы и деталей транзакции
 * @module ui
 */

import { getFirstWords } from "./utils.js";

/**
 * Создаёт строку таблицы для переданной транзакции и добавляет её в tbody
 * @param {import('./transactions.js').Transaction} transaction - Объект транзакции
 * @returns {void}
 */
function renderTransaction(transaction) {
  const tbody = document.querySelector("#transactions-tbody");
  const tr = document.createElement("tr");

  tr.dataset.id = transaction.id;
  tr.classList.add(transaction.amount >= 0 ? "row-income" : "row-expense");

  const shortDesc = getFirstWords(transaction.description, 4);

  tr.innerHTML = `
    <td>${transaction.date}</td>
    <td>${transaction.category}</td>
    <td class="desc-cell">${shortDesc}</td>
    <td><button class="btn-delete" data-id="${transaction.id}">Удалить</button></td>
  `;

  tbody.appendChild(tr);
}

/**
 * Удаляет строку таблицы по идентификатору транзакции
 * @param {string} id - Идентификатор транзакции
 * @returns {void}
 */
function removeTransactionRow(id) {
  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (row) row.remove();
}

/**
 * Обновляет отображение общей суммы транзакций на странице
 * @param {number} total - Итоговая сумма
 * @returns {void}
 */
function renderTotal(total) {
  const totalEl = document.querySelector("#total-amount");
  totalEl.textContent = total.toFixed(2);
  totalEl.className = total >= 0 ? "total-positive" : "total-negative";
}

/**
 * Отображает полное описание транзакции в блоке деталей
 * @param {import('./transactions.js').Transaction} transaction - Объект транзакции
 * @returns {void}
 */
function renderTransactionDetail(transaction) {
  const detailBlock = document.querySelector("#transaction-detail");
  detailBlock.innerHTML = `
    <h3>Детали транзакции</h3>
    <p><strong>ID:</strong> ${transaction.id}</p>
    <p><strong>Дата и время:</strong> ${transaction.date}</p>
    <p><strong>Категория:</strong> ${transaction.category}</p>
    <p><strong>Сумма:</strong> ${transaction.amount > 0 ? "+" : ""}${transaction.amount.toFixed(2)} ₽</p>
    <p><strong>Описание:</strong> ${transaction.description}</p>
  `;
  detailBlock.classList.add("visible");
}

/**
 * Скрывает блок деталей транзакции
 * @returns {void}
 */
function hideTransactionDetail() {
  const detailBlock = document.querySelector("#transaction-detail");
  detailBlock.innerHTML = "";
  detailBlock.classList.remove("visible");
}

/**
 * Отображает сообщение об ошибке под формой
 * @param {string} message - Текст ошибки
 * @returns {void}
 */
function showFormError(message) {
  const errEl = document.querySelector("#form-error");
  errEl.textContent = message;
  errEl.style.display = "block";
}

/**
 * Скрывает сообщение об ошибке формы
 * @returns {void}
 */
function hideFormError() {
  const errEl = document.querySelector("#form-error");
  errEl.textContent = "";
  errEl.style.display = "none";
}

/**
 * Сбрасывает поля формы добавления транзакции
 * @returns {void}
 */
function resetForm() {
  document.querySelector("#transaction-form").reset();
}

export {
  renderTransaction,
  removeTransactionRow,
  renderTotal,
  renderTransactionDetail,
  hideTransactionDetail,
  showFormError,
  hideFormError,
  resetForm,
};
