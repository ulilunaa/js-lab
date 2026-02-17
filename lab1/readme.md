# Лабораторная работа №1  
## Основы JavaScript

## Описание лабораторной работы

Цель лабораторной работы — изучить основы JavaScript и научиться подключать JavaScript-файл к HTML-документу.

В ходе работы были выполнены следующие задачи:

- подключение JavaScript к HTML
- создание JavaScript-файла
- объявление переменных
- вывод информации в консоль
- использование базовых конструкций языка

---
## Задание 1. Выполнение кода в браузере
Инструкции по запуску проекта

1. Скачать репозиторий:
https://github.com/ulilunaa/js-lab.git

2. Перейти в папку:
js-lab/lab1

3. Открыть файл:
index.html

4. Открыть консоль браузера
F12
<img width="857" height="266" alt="Screenshot 2026-02-10 114053" src="https://github.com/user-attachments/assets/3d69cdee-87c7-4509-83a0-05e1674b7337" />
<img width="1644" height="401" alt="Screenshot 2026-02-10 114317" src="https://github.com/user-attachments/assets/e108194f-88b6-4051-b444-dc6806fb7b49" />

## Задание 2. Работа с типами данных
1. Объявление переменных и работа с типами данных.
Файл script.js

Файл script.js содержит JavaScript-код, который выполняется браузером.

В данном файле реализованы:

- объявление переменных
- вывод данных в консоль
- использование условного оператора
- использование цикла

Объявление переменных:

```javascript
let name = "Uliana";
let birthYear = 2003;
let isStudent = true;
```

Вывод в консоль:
```javascript
console.log(name);
console.log(birthYear);
console.log(isStudent);
```
<img width="345" height="303" alt="Screenshot 2026-02-10 120400" src="https://github.com/user-attachments/assets/85d35bcd-c8e3-4639-8bb4-f92982f83033" />
<img width="294" height="293" alt="Screenshot 2026-02-10 120409" src="https://github.com/user-attachments/assets/c3e6e22a-c7c6-491b-af0c-f5591995ccaa" />

2. Управление потоком выполнения (условия и циклы)
Добавила следующий код в файл script.js
```javascript
let score = prompt("Введите ваш балл:");
if (score >= 90) {
  console.log("Отлично!");
} else if (score >= 70) {
  console.log("Хорошо");
} else {
  console.log("Можно лучше!");
}

for (let i = 1; i <= 5; i++) {
  console.log(`Итерация: ${i}`);
}
```
<img width="668" height="450" alt="Screenshot 2026-02-10 120534" src="https://github.com/user-attachments/assets/97c4ac4f-40bb-45a5-9587-b1298e626665" />
<img width="860" height="295" alt="Screenshot 2026-02-10 120600" src="https://github.com/user-attachments/assets/2fff8d46-9680-435e-baf7-4beb4a1ee4b1" />

### Контрольные вопросы
# 1. Чем отличается var от let и const?

var — старая переменная, имеет функциональную область видимости.

let — современная переменная, имеет блочную область видимости.

const — константа, значение нельзя изменить.

# 2. Что такое неявное преобразование типов в JavaScript?
Это автоматическое преобразование одного типа данных в другой.
Пример:

"5" + 2 = "52"

# 3. Как работает оператор == в сравнении с ===?
== сравнивает значения без учета типа.
=== сравнивает значение и тип.
Пример:
```javascript
5 == "5"   → true
5 === "5"  → false
```
### Использованные источники
1. https://javascript.info
2. Унверситетские материалы по курсу
3. GitHub курс по JavaScript
