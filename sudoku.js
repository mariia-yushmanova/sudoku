/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */

function solve(boardString) {
  const board = [];
  let arrBoard = boardString.split("");
  for (let i = 0; i < arrBoard.length; i += 9) {
    const check = arrBoard.slice(i, i + 9);
    board.push(check);
  }

  // используй дальше board

  //  функция ищет перву попавшуюся чёрточку и возвращает её индекс
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
        // console.log(result);
        console.log(arrPosition + "TEST");

        return arrPosition;
      }
    }
  }

  const position = findEmptyField(board);
  console.table(board)

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

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */
function isSolved(board) {

}

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
