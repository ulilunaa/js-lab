/**
 * @fileoverview Лабораторная работа №4 — система инвентаря.
 * Классы Item и Weapon, функции-конструкторы, опциональная цепочка.
 */

"use strict";

// ─── Шаг 1 & 2: Классы (ES6) ────────────────────────────────

/**
 * Предмет инвентаря.
 */
class Item {
  /**
   * @param {string} name   - название предмета
   * @param {number} weight - вес в кг
   * @param {string} rarity - 'common' | 'uncommon' | 'rare' | 'legendary'
   */
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /**
   * Возвращает строку с информацией о предмете.
   * @returns {string}
   */
  getInfo() {
    return `[${this.rarity.toUpperCase()}] ${this.name} | Вес: ${this.weight} кг`;
  }

  /**
   * Меняет вес предмета. Отрицательные значения и 0 игнорируются.
   * @param {number} newWeight
   */
  setWeight(newWeight) {
    if (newWeight <= 0) {
      console.warn(`setWeight: некорректное значение ${newWeight}`);
      return;
    }
    this.weight = newWeight;
    console.log(`Вес "${this.name}" обновлён до ${this.weight} кг`);
  }
}

/**
 * Оружие — расширяет Item, добавляет урон и прочность.
 * @extends Item
 */
class Weapon extends Item {
  /**
   * @param {string} name       - название
   * @param {number} weight     - вес в кг
   * @param {string} rarity     - редкость
   * @param {number} damage     - урон
   * @param {number} durability - прочность (0–100)
   */
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = Math.min(100, Math.max(0, durability));
  }

  /**
   * Возвращает информацию об оружии, включая урон и прочность.
   * @returns {string}
   */
  getInfo() {
    return super.getInfo() + ` | Урон: ${this.damage} | Прочность: ${this.durability}/100`;
  }

  /**
   * Использует оружие — снижает прочность на 10.
   * Если прочность уже 0, выводит предупреждение.
   */
  use() {
    if (this.durability <= 0) {
      console.warn(`"${this.name}" сломано и не может быть использовано!`);
      return;
    }
    this.durability = Math.max(0, this.durability - 10);
    console.log(`"${this.name}" использовано. Прочность: ${this.durability}/100`);
  }

  /**
   * Ремонтирует оружие — восстанавливает прочность до 100.
   */
  repair() {
    this.durability = 100;
    console.log(`"${this.name}" отремонтировано. Прочность: ${this.durability}/100`);
  }
}

// ─── Шаг 4А: опциональная цепочка (?.) ──────────────────────

/**
 * Безопасно получает информацию о предмете.
 * Если item === null или undefined — просто вернёт undefined, без ошибки.
 * @param {Item|null|undefined} item
 * @returns {string|undefined}
 */
function safeGetInfo(item) {
  return item?.getInfo();
}

// ─── Шаг 4Б: Функции-конструкторы (ES5) ─────────────────────

/**
 * Конструктор предмета инвентаря (аналог класса Item, ES5-стиль).
 * @constructor
 * @param {string} name
 * @param {number} weight
 * @param {string} rarity
 */
function ItemConstructor(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

/**
 * @returns {string}
 */
ItemConstructor.prototype.getInfo = function () {
  return `[${this.rarity.toUpperCase()}] ${this.name} | Вес: ${this.weight} кг`;
};

/**
 * @param {number} newWeight
 */
ItemConstructor.prototype.setWeight = function (newWeight) {
  if (newWeight <= 0) {
    console.warn(`setWeight: некорректное значение ${newWeight}`);
    return;
  }
  this.weight = newWeight;
  console.log(`Вес "${this.name}" обновлён до ${this.weight} кг`);
};

/**
 * Конструктор оружия (аналог класса Weapon, ES5-стиль).
 * @constructor
 * @param {string} name
 * @param {number} weight
 * @param {string} rarity
 * @param {number} damage
 * @param {number} durability
 */
function WeaponConstructor(name, weight, rarity, damage, durability) {
  ItemConstructor.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = Math.min(100, Math.max(0, durability));
}

// Настраиваем цепочку прототипов
WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
WeaponConstructor.prototype.constructor = WeaponConstructor;

/** @returns {string} */
WeaponConstructor.prototype.getInfo = function () {
  return ItemConstructor.prototype.getInfo.call(this) +
    ` | Урон: ${this.damage} | Прочность: ${this.durability}/100`;
};

WeaponConstructor.prototype.use = function () {
  if (this.durability <= 0) {
    console.warn(`"${this.name}" сломано!`);
    return;
  }
  this.durability = Math.max(0, this.durability - 10);
  console.log(`"${this.name}" использовано. Прочность: ${this.durability}/100`);
};

WeaponConstructor.prototype.repair = function () {
  this.durability = 100;
  console.log(`"${this.name}" отремонтировано. Прочность: ${this.durability}/100`);
};

module.exports = { Item, Weapon, ItemConstructor, WeaponConstructor, safeGetInfo };
