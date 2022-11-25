/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
const fs = require("fs");
const fileText = fs.readFileSync("./puzzles.txt", "utf-8");

function solve(boardString) {
  const valuesNumber = Number(process.argv[2]);
  const result = [];
  let arrBoard = boardString.split("");
  for (let i = 0; i < arrBoard.length; i += 9) {
    const check = arrBoard.slice(i, i + 9);
    result.push(check);
  }
  return result;
}

// console.log(
//   solve(
//     "1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--"
//   )
// );

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */

// Проверяет повтор 1-9 в квадрате
function checkValidity() {}

function isSolved(board) {}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */
function prettyBoard(board) {}

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
