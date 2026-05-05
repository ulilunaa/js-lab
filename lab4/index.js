/**
 * Точка входа — тестирование классов Item и Weapon.
 * Запуск: node src/index.js
 */

"use strict";

const {
  Item,
  Weapon,
  ItemConstructor,
  WeaponConstructor,
  safeGetInfo,
} = require("./classes");

// --- Шаг 1: Item ---

console.log("--- Шаг 1: Item ---");

const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());

sword.setWeight(4.0);
console.log(sword.getInfo());

const potion = new Item("Health Potion", 0.3, "common");
console.log(potion.getInfo());

// --- Шаг 2: Weapon ---

console.log("\n--- Шаг 2: Weapon ---");

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());

bow.use();
console.log("Прочность:", bow.durability); // 90

bow.use();
bow.use();
console.log("После ещё двух ударов:", bow.durability); // 70

bow.repair();
console.log("После ремонта:", bow.durability); // 100

// Граничный случай — прочность доходит до 0
const fragile = new Weapon("Fragile Dagger", 0.5, "common", 5, 10);
console.log("\n" + fragile.getInfo());
fragile.use(); // durability → 0
fragile.use(); // предупреждение

// --- Шаг 4А: опциональная цепочка ---

console.log("\n--- Шаг 4А: опциональная цепочка (?.) ---");

const ring = new Item("Magic Ring", 0.1, "legendary");
console.log(safeGetInfo(ring));   // нормально работает
console.log(safeGetInfo(null));   // undefined, без ошибки

// --- Шаг 4Б: функции-конструкторы ---

console.log("\n--- Шаг 4Б: функции-конструкторы (ES5) ---");

const shield = new ItemConstructor("Iron Shield", 5.0, "uncommon");
console.log(shield.getInfo());
shield.setWeight(4.5);
console.log(shield.getInfo());

const axe = new WeaponConstructor("Battle Axe", 6.0, "legendary", 40, 100);
console.log(axe.getInfo());
axe.use();
console.log("Прочность топора:", axe.durability);
axe.repair();
console.log("После ремонта:", axe.durability);

// Проверка instanceof
console.log("\nПроверка instanceof:");
console.log("axe instanceof WeaponConstructor:", axe instanceof WeaponConstructor); // true
console.log("axe instanceof ItemConstructor:  ", axe instanceof ItemConstructor);   // true
console.log("bow instanceof Weapon:           ", bow instanceof Weapon);             // true
console.log("bow instanceof Item:             ", bow instanceof Item);               // true
