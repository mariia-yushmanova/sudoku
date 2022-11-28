// Подключить функции из файла sudoku.js.
// const sudoku = require('./sudoku');
import gradient from "gradient-string";
import tinycolor from "tinycolor2";

import * as sudoku from "./sudoku.js";
import chalk from "chalk";
// import * as sudoku from './sudokuNew.js'
// const { solve, isSolved, prettyBoard } = require('./sudoku');

function readAndSolve(error, fileData) {
  // Если чтение файла не удалось, выбросить ошибку с описанием проблемы и

  // завершить работу функции.

  const coolGradientT = gradient(
    tinycolor.random(),
    tinycolor.random(),
    tinycolor.random(),
    tinycolor.random()
  );

  if (error) {
    throw error;
  }

  // Разбить содержимое файла построчно и отфильтровать все пустые строки.
  const puzzles = fileData.split("\n").filter((line) => line !== "");

  // Получить номер судоку из process.argv, либо взять 1-й судоку по умолчанию.
  let puzzleNumber = Number(process.argv[2]) || 1;

  // Ограничить номер судоку максимальным числом массива с паззлами.
  if (puzzleNumber > puzzles.length) {
    puzzleNumber = puzzles.length;
  }

  // Получить желаемый судоку по индексу и вывести его в консоль.
  const puzzle = puzzles[puzzleNumber - 1];
  // console.log(`Решаем судоку №${puzzleNumber}:`);
  console.log(chalk.rgb(255, 20, 147).bgGray(puzzle, "\n"));

  const crying = `
                                                                 
  `;

  // Использовать функцию solve из файла sudoku.js для решения судоку.
  const solvedPuzzle = sudoku.solve(puzzle);

  // Использовать функцию isSolved из файла sudoku.js для проверки решения судоку.
  if (!sudoku.isSolved(solvedPuzzle)) {
    console.log(
      chalk.bgCyan(`Не смогли решить судоку №   ${puzzleNumber} :(`) +
        ` \n ${coolGradientT(crying)}`,
      "\n"
    );
    return; // Если судоку не решён, завершить работу этой функции.
  }

  // Код ниже сработает, только если проверка решения судоку прошла успешно.
  let done = `Судоку №  ${puzzleNumber} решён успешно!`;
  console.log(coolGradientT(done));

  // Использовать функцию prettyBoard из файла sudoku.js для форматирования
  // игрового поля в строку в желаемом формате.
  // тут придёт заглушка
  console.log(sudoku.prettyBoard(solvedPuzzle), "\n");
}

// module.exports = readAndSolve;

export { readAndSolve };
