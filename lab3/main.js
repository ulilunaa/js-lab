/**
 * Лабораторная работа №3
 * Тема: Основы работы с массивами, функциями и объектами в JavaScript
 * Выполнила: Snejinski Uliana
 */

/**
 * @typedef {Object} Transaction
 * @property {string} transaction_id - Уникальный идентификатор
 * @property {string} transaction_date - Дата в формате ГГГГ-ММ-ДД
 * @property {number} transaction_amount - Сумма транзакции
 * @property {string} transaction_type - Тип (debit/credit)
 * @property {string} transaction_description - Описание
 * @property {string} merchant_name - Название магазина/сервиса
 * @property {string} card_type - Тип карты (credit/debit)
 */

// ============================================================
// ШАГ 1. МАССИВ ТРАНЗАКЦИЙ
// ============================================================

/** @type {Transaction[]} */
const transactions = [
  {
    transaction_id: "T001",
    transaction_date: "2024-01-15",
    transaction_amount: 250.00,
    transaction_type: "debit",
    transaction_description: "Покупка продуктов",
    merchant_name: "Lidl",
    card_type: "debit"
  },
  {
    transaction_id: "T002",
    transaction_date: "2024-01-22",
    transaction_amount: 1200.50,
    transaction_type: "credit",
    transaction_description: "Зачисление зарплаты",
    merchant_name: "ООО Ромашка",
    card_type: "credit"
  },
  {
    transaction_id: "T003",
    transaction_date: "2024-02-05",
    transaction_amount: 89.99,
    transaction_type: "debit",
    transaction_description: "Оплата интернета",
    merchant_name: "Orange",
    card_type: "debit"
  },
  {
    transaction_id: "T004",
    transaction_date: "2024-02-14",
    transaction_amount: 340.00,
    transaction_type: "debit",
    transaction_description: "Ресторан",
    merchant_name: "La Taifas",
    card_type: "credit"
  },
  {
    transaction_id: "T005",
    transaction_date: "2024-02-20",
    transaction_amount: 5000.00,
    transaction_type: "credit",
    transaction_description: "Фриланс-оплата",
    merchant_name: "Upwork",
    card_type: "credit"
  },
  {
    transaction_id: "T006",
    transaction_date: "2024-03-03",
    transaction_amount: 120.00,
    transaction_type: "debit",
    transaction_description: "Аптека",
    merchant_name: "Felicia",
    card_type: "debit"
  },
  {
    transaction_id: "T007",
    transaction_date: "2024-03-10",
    transaction_amount: 450.00,
    transaction_type: "debit",
    transaction_description: "Одежда",
    merchant_name: "Zara",
    card_type: "credit"
  },
  {
    transaction_id: "T008",
    transaction_date: "2024-03-18",
    transaction_amount: 75.50,
    transaction_type: "debit",
    transaction_description: "Кофейня",
    merchant_name: "Tucano Coffee",
    card_type: "debit"
  },
  {
    transaction_id: "T009",
    transaction_date: "2024-03-25",
    transaction_amount: 2200.00,
    transaction_type: "credit",
    transaction_description: "Возврат средств",
    merchant_name: "Upwork",
    card_type: "credit"
  },
  {
    transaction_id: "T010",
    transaction_date: "2024-04-01",
    transaction_amount: 600.00,
    transaction_type: "debit",
    transaction_description: "Аренда жилья",
    merchant_name: "999.md",
    card_type: "debit"
  }
];

// ============================================================
// ШАГ 2. ФУНКЦИИ ДЛЯ АНАЛИЗА
// ============================================================

/**
 * Получение уникальных типов транзакций.
 * @param {Transaction[]} transactions 
 * @returns {string[]}
 */
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(t => t.transaction_type))];
}

/**
 * Расчет общей суммы всех транзакций.
 * @param {Transaction[]} transactions 
 * @returns {number}
 */
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}

/**
 * [extra] Расчет суммы по фильтру даты.
 * @param {Transaction[]} transactions 
 * @param {number} [year] 
 * @param {number} [month] 
 * @param {number} [day] 
 * @returns {number}
 */
function calculateTotalAmountByDate(transactions, year = null, month = null, day = null) {
  const filtered = transactions.filter(t => {
    const d = new Date(t.transaction_date);
    const matchYear = year ? d.getFullYear() === year : true;
    const matchMonth = month ? (d.getMonth() + 1) === month : true;
    const matchDay = day ? d.getDate() === day : true;
    return matchYear && matchMonth && matchDay;
  });
  return calculateTotalAmount(filtered);
}

/**
 * Фильтрация по типу.
 * @param {Transaction[]} transactions 
 * @param {string} type 
 * @returns {Transaction[]}
 */
function getTransactionByType(transactions, type) {
  return transactions.filter(t => t.transaction_type === type);
}

/**
 * Транзакции в диапазоне дат.
 * @param {Transaction[]} transactions 
 * @param {string} startDate 
 * @param {string} endDate 
 * @returns {Transaction[]}
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return transactions.filter(t => {
    const current = new Date(t.transaction_date);
    return current >= start && current <= end;
  });
}

/**
 * Фильтрация по продавцу.
 * @param {Transaction[]} transactions 
 * @param {string} merchantName 
 * @returns {Transaction[]}
 */
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(t => t.merchant_name === merchantName);
}

/**
 * Средняя сумма транзакции.
 * @param {Transaction[]} transactions 
 * @returns {number}
 */
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}

/**
 * Транзакции в диапазоне сумм.
 * @param {Transaction[]} transactions 
 * @param {number} minAmount 
 * @param {number} maxAmount 
 * @returns {Transaction[]}
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}

/**
 * Общая сумма дебетовых операций.
 * @param {Transaction[]} transactions 
 * @returns {number}
 */
function calculateTotalDebitAmount(transactions) {
  const debits = getTransactionByType(transactions, "debit");
  return calculateTotalAmount(debits);
}

/**
 * Месяц с наибольшим количеством транзакций.
 * @param {Transaction[]} transactions 
 * @returns {number|null}
 */
function findMostTransactionsMonth(transactions) {
  if (transactions.length === 0) return null;
  const counts = transactions.reduce((acc, t) => {
    const month = new Date(t.transaction_date).getMonth() + 1;
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  return Number(Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b));
}

/**
 * Месяц с наибольшим количеством дебетовых транзакций.
 * @param {Transaction[]} transactions 
 * @returns {number|null}
 */
function findMostDebitTransactionMonth(transactions) {
  const debits = getTransactionByType(transactions, "debit");
  return findMostTransactionsMonth(debits);
}

/**
 * Каких транзакций больше.
 * @param {Transaction[]} transactions 
 * @returns {string}
 */
function mostTransactionTypes(transactions) {
  const debits = getTransactionByType(transactions, "debit").length;
  const credits = getTransactionByType(transactions, "credit").length;
  if (debits > credits) return "debit";
  if (credits > debits) return "credit";
  return "equal";
}

/**
 * Транзакции до определенной даты.
 * @param {Transaction[]} transactions 
 * @param {string} date 
 * @returns {Transaction[]}
 */
function getTransactionsBeforeDate(transactions, date) {
  const target = new Date(date);
  return transactions.filter(t => new Date(t.transaction_date) < target);
}

/**
 * Поиск по ID.
 * @param {Transaction[]} transactions 
 * @param {string} id 
 * @returns {Transaction|null}
 */
function findTransactionById(transactions, id) {
  return transactions.find(t => t.transaction_id === id) || null;
}

/**
 * Массив только с описаниями.
 * @param {Transaction[]} transactions 
 * @returns {string[]}
 */
function mapTransactionDescriptions(transactions) {
  return transactions.map(t => t.transaction_description);
}

// ============================================================
// ШАГ 3. ТЕСТИРОВАНИЕ
// ============================================================

console.log("--- ТЕСТ 1: Основные данные ---");
console.log("Уникальные типы:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма:", calculateTotalAmount(transactions));
console.log("Средний чек:", calculateAverageTransactionAmount(transactions).toFixed(2));
console.log("Поиск T005:", findTransactionById(transactions, "T005"));
console.log("Преобладает тип:", mostTransactionTypes(transactions));

console.log("\n--- [extra] ТЕСТ 2: Пустой массив ---");
const empty = [];
console.log("Сумма пустого:", calculateTotalAmount(empty)); // 0
console.log("Месяц пустого:", findMostTransactionsMonth(empty)); // null

console.log("\n--- [extra] ТЕСТ 3: Одна транзакция ---");
const single = [transactions[0]];
console.log("Сумма одной:", calculateTotalAmount(single)); 
console.log("Тип транзакций:", mostTransactionTypes(single)); // debit
