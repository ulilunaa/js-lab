/**
 * Вспомогательные функции для приложения учёта финансов
 * @module utils
 */

/**
 * Генерирует уникальный идентификатор транзакции
 * @returns {string} Уникальный ID в формате строки
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/**
 * Форматирует объект Date в строку формата "DD.MM.YYYY HH:MM"
 * @param {Date} date - Объект даты
 * @returns {string} Отформатированная строка даты и времени
 */
function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${dd}.${mm}.${yyyy} ${hh}:${min}`;
}

/**
 * Возвращает первые N слов из строки
 * @param {string} text - Исходная строка
 * @param {number} [n=4] - Количество слов
 * @returns {string} Строка из первых N слов
 */
function getFirstWords(text, n = 4) {
  return text.trim().split(/\s+/).slice(0, n).join(" ");
}

export { generateId, formatDate, getFirstWords };
