const gradient = require("gradient-string");
const tinycolor = require("tinycolor2");

function solve(boardString) {
  const board = [];
  let arrBoard = boardString.split("");
  for (let i = 0; i < arrBoard.length; i += 9) {
    const check = arrBoard.slice(i, i + 9);
    board.push(check);
  }

  // используй дальше board

  //  функция ищет первую попавшуюся чёрточку и возвращает её индекс
  function findEmptyField(board) {
    //переменная для результата
    const arrPosition = [];
    // перебор по массивам
    for (let i = 0; i < board.length; i++) {
      // поиск элемента с чёрточкой и возврат его индекса
      a = board[i].findIndex((el) => el === "-");

      if (a >= 0) {
        //  тут я беру индекс массива в котором есть чёрточки
        console.log(board[i]);
        arrPosition.push(board.findIndex((el) => el === board[i]));
        //  тут я добавляю индекс самой чёрточки
        arrPosition.push(a);
        // тут была проверка,что нам возвращает результат в консоль
        return arrPosition;
      }
    }
  }

  const position = findEmptyField(board);
  console.table(board);

  //принимает проверяемое число, его позицию (в виде массива или отдельно индексов)
  //и саму доску. возвращает true или false в зависимости прошла проверка или нет

  checkValidity(2, position, board);
}

// Проверяет повтор 1-9 в квадрате
function checkValidity(number, position /*row, col*/, board) {
  const [row, col] = position;
  const boardSize = 9;
  //проверка наличия числа в строке
  for (let i = 0; i < boardSize; i += 1) {
    if (board[i][col] === number) return false;
  }
  //проверка наличия числа в столбце
  for (let j = 0; j < boardSize; j += 1) {
    if (board[row][j] === number) return false;
  }
  //проверка наличия числа в блоке 3х3
  const blockRowStart = Math.floor(row / 3) * 3;
  const blockColStart = Math.floor(col / 3) * 3;

  for (let i = blockRowStart; i < 3; i += 1) {
    for (let j = blockColStart; j < 3; j += 1) {
      if (board[i][j] === number) return false;
    }
  }
  return true; //если все 3 проверки прошли то число подходит
}

const proverka = [
  ["1", "4", "5", "8", "9", "2", "6", "7", "3"],
  ["8", "9", "3", "1", "7", "6", "4", "2", "5"],
  ["2", "7", "6", "4", "3", "5", "8", "1", "9"],
  ["5", "1", "9", "2", "4", "7", "3", "8", "6"],
  ["7", "6", "2", "5", "8", "3", "1", "9", "4"],
  ["3", "8", "4", "9", "6", "1", "7", "5", "2"],
  ["9", "5", "7", "6", "1", "4", "2", "3", "8"],
  ["4", "3", "8", "7", "2", "9", "5", "6", "1"],
  ["6", "2", "1", "3", "5", "8", "9", "4", "7"],
];

function isSolved(board) {
  let sum = 0;
  for (let i = 0; i < board.length; i += 1) {
    const sumStr = board[i].reduce((a, b) => Number(a) + Number(b));
    sum += sumStr;
  }
  if (sum === 405) {
    return true;
  } else {
    return false;
  }
}
// console.log(isSolved(proverka));

function arrToString(arr) {
  return arr
    .map((line) => {
      return line.join("");
    })
    .join("");
}

function prettyBoard(board) {
  const stringBoard = arrToString(board);
  let coolBoard = stringBoard.match(/.{9}/g).map((el) => {
    el = el.split("");
    el.unshift("|");
    el.push("|");
    el.splice(4, 0, "|");
    el.splice(8, 0, "|");
    return el;
  });

  const veryCoolBoard = coolBoard.map((el) => el.join(" ")).join("\n");
  const coolGradient = gradient(
    tinycolor.random(),
    tinycolor.random(),
    tinycolor.random(),
    tinycolor.random()
  );
  console.log(coolGradient(veryCoolBoard));
  return coolGradient(veryCoolBoard);
}
prettyBoard(proverka);

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
