# TaskFlow — Менеджер задач

> Индивидуальный проект по дисциплине «JavaScript» | Vanilla JS, ES Modules, localStorage

---

## Что это такое

**TaskFlow** — браузерное To-Do приложение без фреймворков. Позволяет создавать задачи с приоритетами и дедлайнами, фильтровать и сортировать их, редактировать через модальное окно и хранить всё в `localStorage` между сессиями.

---

##  Структура проекта

```
todo-app/
├── index.html              # Разметка, точка входа
├── css/
│   └── style.css           # Все стили (переменные, адаптивность, анимации)
├── js/
│   ├── app.js              # Главный модуль — координирует все остальные
│   └── modules/
│       ├── tasks.js        # CRUD: создание, удаление, фильтрация, сортировка
│       ├── render.js       # Отрисовка DOM-элементов задач
│       ├── storage.js      # Чтение и запись в localStorage
│       ├── validation.js   # Валидация пользовательского ввода
│       └── modal.js        # Модальное окно редактирования
└── README.md
```

Каждый модуль отвечает за **одну зону ответственности** — это называется принципом единственной ответственности (SRP).

---

##  Как всё работает вместе

```
index.html
    └── загружает js/app.js (type="module")
            ├── импортирует tasks.js     → данные
            ├── импортирует render.js    → DOM
            ├── импортирует validation.js → проверка ввода
            └── импортирует modal.js     → попап редактирования

Пользователь вводит задачу
    → app.js вызывает validation.js (проверка)
    → app.js вызывает tasks.js (добавление в массив)
    → tasks.js вызывает storage.js (сохранение в localStorage)
    → app.js вызывает render.js (обновление DOM)
```

---

##  Модули — подробно

---

### `storage.js` — работа с localStorage

Самый простой модуль. Умеет только читать и писать задачи.

```js
const STORAGE_KEY = 'taskflow_tasks';

export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return []; // если данные повреждены — возвращаем пустой массив
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
```

**Зачем `try/catch`?** `JSON.parse` может упасть, если в хранилище оказалась битая строка. Вместо краша приложения — просто начинаем с пустого списка.

---

### `validation.js` — валидация ввода

Проверяет данные перед добавлением или редактированием задачи.

```js
export function validateTaskForm({ title }) {
  const errors = {};

  if (!title || !title.trim()) {
    errors.title = 'Название задачи не может быть пустым';
  } else if (title.trim().length < 2) {
    errors.title = 'Название должно содержать минимум 2 символа';
  } else if (title.trim().length > 120) {
    errors.title = 'Название не должно превышать 120 символов';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
```

**Возвращает объект** `{ valid: boolean, errors: {} }` — это удобно: вызывающий код сам решает, что показывать пользователю. Модуль только проверяет, не трогает DOM.

---

### `tasks.js` — CRUD и бизнес-логика

Главный модуль данных. Хранит массив задач и умеет его изменять.

#### Инициализация

```js
import { loadTasks, saveTasks } from './storage.js';

let tasks = loadTasks(); // при старте читаем из localStorage
```

#### Добавление задачи

```js
export function addTask({ title, description, priority, deadline }) {
  const task = {
    id: crypto.randomUUID(), // уникальный ID, встроен в браузер
    title: title.trim(),
    description: description.trim(),
    priority,       // 'low' | 'medium' | 'high'
    deadline,       // строка 'YYYY-MM-DD' или пустая
    completed: false,
    createdAt: new Date().toISOString(), // для сортировки по дате
  };
  tasks.unshift(task); // новые задачи — в начало списка
  saveTasks(tasks);
  return task;
}
```

`crypto.randomUUID()` — это нативный браузерный API, не требует библиотек.

#### Переключение статуса (toggle)

```js
export function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed; // true → false, false → true
    saveTasks(tasks);
  }
  return task;
}
```

#### Фильтрация (не изменяет исходный массив!)

```js
export function filterTasks(all, filter, search) {
  return all.filter(task => {
    const matchFilter =
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);

    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      task.title.toLowerCase().includes(q) ||
      task.description.toLowerCase().includes(q);

    return matchFilter && matchSearch;
  });
}
```

**Иммутабельность**: `filter()` возвращает **новый массив**, оригинальный `tasks` остаётся нетронутым. Это важно — фильтр не удаляет задачи из хранилища.

#### Сортировка

```js
export function sortTasks(list, criterion) {
  const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };
  const copy = [...list]; // копируем, не мутируем

  switch (criterion) {
    case 'date-desc':
      return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'priority-high':
      return copy.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
    case 'alpha':
      return copy.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
    // ...
  }
}
```

`localeCompare('ru')` — корректная сортировка с учётом кириллицы.

---

### `render.js` — отрисовка DOM

Превращает массив задач в HTML-элементы. Не знает про localStorage и бизнес-логику.

#### Создание элемента задачи

```js
export function createTaskElement(task, { onToggle, onDelete, onEdit }) {
  const li = document.createElement('li');
  li.className = `task-item${task.completed ? ' completed' : ''}`;
  li.dataset.id = task.id;
  li.dataset.priority = task.priority; // нужен для CSS-переменной цвета

  const overdue = isOverdue(task.deadline, task.completed);

  li.innerHTML = `
    <div class="task-checkbox${task.completed ? ' checked' : ''}" ...></div>
    <div class="task-content">
      <div class="task-title">${escapeHtml(task.title)}</div>
      ...
    </div>
    <div class="task-actions">
      <button class="task-action-btn edit">✏️</button>
      <button class="task-action-btn delete">🗑</button>
    </div>
  `;

  // Привязываем обработчики через переданные коллбэки
  li.querySelector('.edit').addEventListener('click', () => onEdit(task.id));
  li.querySelector('.delete').addEventListener('click', () => {
    li.classList.add('removing');  // сначала анимация...
    li.addEventListener('animationend', () => onDelete(task.id), { once: true }); // ...потом удаление
  });

  return li;
}
```

#### Защита от XSS

```js
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
```

Если пользователь введёт `<script>alert('xss')</script>` в название задачи — функция превратит `<` и `>` в безопасные HTML-сущности. Без этого вредоносный скрипт мог бы выполниться.

#### Рендер всего списка

```js
export function renderTasks(listEl, emptyEl, tasks, handlers) {
  listEl.innerHTML = ''; // очищаем список

  if (tasks.length === 0) {
    emptyEl.classList.remove('hidden'); // показываем «Нет задач»
    return;
  }

  emptyEl.classList.add('hidden');
  const fragment = document.createDocumentFragment(); // один раз в DOM

  tasks.forEach((task, i) => {
    const el = createTaskElement(task, handlers);
    el.style.animationDelay = `${i * 0.04}s`; // каскадное появление
    fragment.appendChild(el);
  });

  listEl.appendChild(fragment); // единственный reflow
}
```

**Зачем `DocumentFragment`?** Если добавлять элементы по одному напрямую в DOM, браузер перерисовывает страницу на каждое добавление. Fragment — это виртуальный контейнер: собираем всё в нём, потом одним `appendChild` вставляем в реальный DOM. Один reflow вместо N.

---

### `modal.js` — модальное окно редактирования

Управляет попапом: открывает, закрывает, обрабатывает форму.

```js
let currentId = null;       // id редактируемой задачи
let onSaveCallback = null;  // функция, которую вызвать после сохранения

export function openModal(task, onSave) {
  currentId = task.id;
  onSaveCallback = onSave;

  // Заполняем поля формы данными задачи
  editTitle.value = task.title;
  editDesc.value = task.description;
  editPriority.value = task.priority;
  editDate.value = task.deadline || '';

  modal.classList.remove('hidden'); // показываем попап
  editTitle.focus();
  document.body.style.overflow = 'hidden'; // блокируем скролл страницы
}

export function closeModal() {
  modal.classList.add('hidden');
  currentId = null;
  document.body.style.overflow = ''; // возвращаем скролл
}
```

#### Инициализация обработчиков

```js
export function initModal() {
  // Закрытие через кнопку ✕, кнопку «Отмена» и клик по фону
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-cancel').addEventListener('click', closeModal);
  modal.querySelector('.modal__backdrop').addEventListener('click', closeModal);

  // Закрытие клавишей Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });

  // Сохранение формы
  editForm.addEventListener('submit', e => {
    e.preventDefault();
    // ... валидация ...
    onSaveCallback(currentId, { /* новые данные */ });
    closeModal();
  });
}
```

Паттерн **callback**: `openModal` принимает функцию `onSave`, которую вызывает после сохранения. Так `modal.js` не знает ничего про `tasks.js` или `app.js` — слабое связывание.

---

### `app.js` — точка входа, координатор

Импортирует все модули и соединяет их вместе.

#### Состояние UI

```js
let currentFilter = 'all';   // какой фильтр активен
let currentSearch = '';      // текущая строка поиска
let currentSort   = 'date-desc'; // текущая сортировка
```

#### Главная функция `render()`

```js
function render() {
  const all      = getTasks();                          // берём все задачи
  const filtered = filterTasks(all, currentFilter, currentSearch); // фильтруем
  const sorted   = sortTasks(filtered, currentSort);    // сортируем

  renderTasks(taskListEl, emptyStateEl, sorted, {
    onToggle: handleToggle,
    onDelete: handleDelete,
    onEdit:   handleEdit,
  });

  updateStats(all); // обновляем счётчики в шапке
}
```

Вся логика отображения — через эту одну функцию. Изменился фильтр? Поиск? Добавили задачу? Всегда вызываем `render()`.

#### Поиск с debounce

```js
let searchTimer;

searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    currentSearch = searchInput.value;
    render();
  }, 250); // ждём 250 мс после последнего нажатия
});
```

**Debounce** — если пользователь быстро набирает «задача», без debounce `render()` вызовется 6 раз (по одному на каждую букву). С debounce — только один раз, через 250 мс после остановки. Снижает нагрузку на DOM.

#### Добавление задачи

```js
taskForm.addEventListener('submit', e => {
  e.preventDefault(); // отменяем стандартную отправку формы

  const title = taskTitleEl.value;
  const { valid, errors } = validateTaskForm({ title }); // валидируем

  if (!valid) {
    titleError.textContent = errors.title || '';
    taskTitleEl.classList.add('error');
    taskTitleEl.focus();
    return; // прерываем, не добавляем
  }

  addTask({
    title,
    description: taskDescEl.value,
    priority: taskPriority.value,
    deadline: taskDate.value,
  });

  taskForm.reset();
  taskPriority.value = 'medium'; // возвращаем дефолт после reset
  render();
});
```

---

##  CSS — ключевые приёмы

### CSS-переменные

```css
:root {
  --bg: #0d0d0f;
  --accent: #c8f550;
  --red: #ff5a5a;
  --radius: 14px;
  --transition: 0.2s ease;
}
```

Все цвета и размеры в одном месте. Хочешь поменять акцент — меняешь одну строку.

### Цвет приоритета через CSS custom property на элементе

```css
.task-item::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--priority-color, transparent); /* берёт с элемента */
}

.task-item[data-priority="high"]   { --priority-color: var(--red); }
.task-item[data-priority="medium"] { --priority-color: var(--yellow); }
.task-item[data-priority="low"]    { --priority-color: var(--green); }
```

JS устанавливает `data-priority="high"` на элемент, CSS сам выбирает нужный цвет через атрибутный селектор. Никакого JS для стилей.

### Анимация удаления

```css
@keyframes slideOut {
  to {
    opacity: 0;
    transform: translateX(20px);
    max-height: 0;
    padding: 0;
    margin: 0;
  }
}

.task-item.removing {
  animation: slideOut 0.25s ease forwards;
}
```

В JS при удалении сначала добавляем класс `.removing`, ждём конца анимации, и только потом реально удаляем из DOM:

```js
li.classList.add('removing');
li.addEventListener('animationend', () => onDelete(task.id), { once: true });
```

`{ once: true }` — обработчик сработает один раз и удалится сам.

---

##  Основные функции

| Функция | Где реализована |
|---|---|
| Добавление задачи | `app.js` → `tasks.js` → `storage.js` |
| Удаление | `render.js` (анимация) → `tasks.js` → `storage.js` |
| Редактирование | `modal.js` (UI) → `tasks.js` → `storage.js` |
| Отметить выполненной | `render.js` (чекбокс) → `tasks.js` → `storage.js` |
| Фильтрация | `app.js` (кнопки) → `tasks.js#filterTasks` |
| Поиск с debounce | `app.js` → `tasks.js#filterTasks` |
| Сортировка | `app.js` → `tasks.js#sortTasks` |
| Просроченные задачи | `render.js#isOverdue` → CSS класс `.overdue` |
| Персистентность | `storage.js` (localStorage) |
| Защита от XSS | `render.js#escapeHtml` |

---

##  Запуск

Приложение использует ES-модули (`type="module"`), поэтому **нельзя открыть через `file://`** — нужен HTTP-сервер.

```bash
# Python
python -m http.server 8080

# Node.js
npx serve .
```

Или расширение **Live Server** в VS Code.

---

##  Технологии

| Технология | Зачем |
|---|---|
| HTML5 | Семантическая разметка, формы, `data-*` атрибуты |
| CSS3 | Переменные, Flexbox, анимации `@keyframes` |
| JavaScript ES6+ | Модули, `crypto.randomUUID()`, деструктуризация, spread |
| localStorage | Хранение задач между сессиями |
| Google Fonts | Шрифты Syne + DM Sans |

---

##  Автор

| Имя | Группа |
|---|---|
| Snejinski Uliana | I2502 |
