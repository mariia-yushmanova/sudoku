/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
function solve(boardString) { 
  //принимает проверяемое число, его позицию (в виде массива или отдельно индексов)
  //и саму доску. возвращает true или false в зависимости прошла проверка или нет
  function validCheck (number, position/*row, col*/, board) {
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
    const blockColStart = Maht.floor(col / 3) * 3;

    for (let i = blockRowStart; i < 3; i += 1) {
      for (let j = blockColStart; j < 3; j += 1) {
        if (board[i][j] === number) return false;
      }
    }
  return true; //если все 3 проверки прошли то число подходит
  }
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
function prettyBoard(board) {

}

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
