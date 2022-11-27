const gradient = require("gradient-string");
const tinycolor = require("tinycolor2");

function checkValidity(currPos, arrBoard, num) {
  const [y, x] = currPos;

  for (let i = 0; i < 9; i++) {
    if (Number(arrBoard[y][i]) === num && i !== x) {
      return false;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (Number(arrBoard[i][x]) === num && i !== y) {
      return false;
    }
  }

  const firstBlockOfBoxY = Math.floor(y / 3) * 3;
  const firstBlockOfBoxX = Math.floor(x / 3) * 3;

  for (let i = firstBlockOfBoxY; i < 3 + firstBlockOfBoxY; i++) {
    for (let j = firstBlockOfBoxX; j < 3 + firstBlockOfBoxX; j++) {
      if (Number(arrBoard[i][j]) === num && i !== y && j !== x) {
        return false;
      }
    }
  }
  return true;
}

function findEmptyField(arrBoard) {
  for (let y = 0; y < 9; y += 1) {
    for (let x = 0; x < 9; x += 1) {
      if (arrBoard[y][x] === "-") {
        return [y, x];
      }
    }
  }
  return null;
}

function solve(boardString) {
  const arrBoard = [];
  const arrBoardSplit = boardString.split("");
  for (let i = 0; i < arrBoardSplit.length; i += 9) {
    const check = arrBoardSplit.slice(i, i + 9);
    arrBoard.push(check);
  }
  step = () => {
    const currPos = findEmptyField(arrBoard);
    if (currPos === null) {
      return true;
    }
    for (let num = 1; num <= 9; num += 1) {
      const isValid = checkValidity(currPos, arrBoard, num);
      if (isValid) {
        const [y, x] = currPos;
        arrBoard[y][x] = String(num);
        if (step()) {
          return true;
        }
        arrBoard[y][x] = "-";
      }
    }
    return false;
  };
  step();
  return arrBoard;
}

//  функция ищет первую попавшуюся чёрточку и возвращает её индекс
// function findEmptyField(board) {
//   //переменная для результата
//   const arrPosition = [];
//   // перебор по массивам
//   for (let i = 0; i < board.length; i++) {
//     // поиск элемента с чёрточкой и возврат его индекса
//     a = board[i].findIndex((el) => el === "-");

//     if (a >= 0) {
//       //  тут я беру индекс массива в котором есть чёрточки
//       console.log(board[i]);
//       arrPosition.push(board.findIndex((el) => el === board[i]));
//       //  тут я добавляю индекс самой чёрточки
//       arrPosition.push(a);
//       // тут была проверка,что нам возвращает результат в консоль
//       return arrPosition;
//     }
//   }
// }
// возвращает true или false в зависимости прошла проверка или нет

// функция заполняет пустые клетки цифрами
// function fillNumber(board) {
//   const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//   // eslint-disable-next-line no-restricted-syntax
//   for (const number of numbers) {
//     const position = findEmptyField(board);
//     if (checkValidity(number, position, board) === true) {
//       const [i, j] = position;
//       board[i][j] = number;
//     } else fillNumber(board);
//   }
//   return board;
// }

// const proverka = [
//   ["1", "4", "5", "8", "9", "2", "6", "7", "3"],
//   ["8", "9", "3", "1", "7", "6", "4", "2", "5"],
//   ["2", "7", "6", "4", "3", "5", "8", "1", "9"],
//   ["5", "1", "9", "2", "4", "7", "3", "8", "6"],
//   ["7", "6", "2", "5", "8", "3", "1", "9", "4"],
//   ["3", "8", "4", "9", "6", "1", "7", "5", "2"],
//   ["9", "5", "7", "6", "1", "4", "2", "3", "8"],
//   ["4", "3", "8", "7", "2", "9", "5", "6", "1"],
//   ["6", "2", "1", "3", "5", "8", "9", "4", "7"],
// ];

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
  // console.log(coolGradient(veryCoolBoard));
  return coolGradient(veryCoolBoard);
}
// prettyBoard(proverka);

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
