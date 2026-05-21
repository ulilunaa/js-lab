/**
 * Главный модуль приложения учёта личных финансов.
 * Импортирует модули транзакций и UI, навешивает обработчики событий.
 * @module index
 */

import {
  addTransaction,
  removeTransaction,
  getTransactionById,
  calculateTotal,
} from "./transactions.js";

import {
  renderTransaction,
  removeTransactionRow,
  renderTotal,
  renderTransactionDetail,
  hideTransactionDetail,
  showFormError,
  hideFormError,
  resetForm,
} from "./ui.js";

/**
 * Валидирует данные формы.
 * @param {string} amount - Строка суммы из поля ввода
 * @param {string} category - Выбранная категория
 * @param {string} description - Описание транзакции
 * @returns {{ valid: boolean, message?: string }} Результат валидации
 */
function validateForm(amount, category, description) {
  if (!amount || isNaN(Number(amount)) || Number(amount) === 0) {
    return { valid: false, message: "Введите корректную сумму (не ноль)" };
  }
  if (!category) {
    return { valid: false, message: "Выберите категорию" };
  }
  if (!description.trim()) {
    return { valid: false, message: "Заполните описание транзакции" };
  }
  return { valid: true };
}

/** Обработчик отправки формы добавления транзакции */
document.querySelector("#transaction-form").addEventListener("submit", (e) => {
  e.preventDefault();
  hideFormError();

  const amountVal = document.querySelector("#input-amount").value.trim();
  const categoryVal = document.querySelector("#input-category").value;
  const descVal = document.querySelector("#input-description").value.trim();

  const validation = validateForm(amountVal, categoryVal, descVal);
  if (!validation.valid) {
    showFormError(validation.message);
    return;
  }

  // Убираем строку «пустого состояния» при первой транзакции
  const emptyRow = document.querySelector("#empty-row");
  if (emptyRow) emptyRow.remove();

  const transaction = addTransaction(Number(amountVal), categoryVal, descVal);
  renderTransaction(transaction);
  renderTotal(calculateTotal());
  resetForm();
  hideTransactionDetail();
});

/**
 * Делегирование событий для таблицы транзакций.
 * Обрабатывает клик по кнопке удаления и по строке таблицы.
 */
document.querySelector("#transactions-table").addEventListener("click", (e) => {
  // Клик по кнопке удаления
  if (e.target.classList.contains("btn-delete")) {
    const id = e.target.dataset.id;
    removeTransaction(id);
    removeTransactionRow(id);
    renderTotal(calculateTotal());
    hideTransactionDetail();
    return;
  }

  // Клик по строке таблицы — показать детали
  const row = e.target.closest("tr[data-id]");
  if (row) {
    const id = row.dataset.id;
    const transaction = getTransactionById(id);
    if (transaction) {
      renderTransactionDetail(transaction);
    }
  }
});
