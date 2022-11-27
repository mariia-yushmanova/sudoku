import gradient from 'gradient-string';
import tinycolor from 'tinycolor2';
import chalkAnimation from 'chalk-animation';

// функция формирующая из строки массив с игровым полем
function getBoard(boardString) {
    const board = [];
    for (let i = 0; i < boardString.length; i += 9) {
      const row = boardString.slice(i, i + 9);
      board.push(row.split(''));
    }
    return board;
  }

// функция проверки наличия пустых ячеек на поле
// возаращает true или false
  function checkEmpty(board) {
    for (let i = 0; i < 9; i += 1) {
      for (let j = 0; j < 9; j += 1) {
        if (board[i][j] === '-') {
          return true;
        }
      }
    }
    return false;
  }
  
// функция проверяющая возможные решения
// возвращает массив с возможными для решения цифрами
  function checkSolve(position, board) {
    const [i, j] = position;
    const numbers = {
      1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
    };
    // проверка по строке
    for (let col = 0; col < board.length; col += 1) {
      const number = board[i][col];
      // eslint-disable-next-line no-restricted-syntax
      for (const key in numbers) {
        if (key === number) {
          delete numbers[key];
        }
      }
    }
    // проверка по столбцу
    for (let row = 0; row < board.length; row += 1) {
      const number = board[row][j];
      // eslint-disable-next-line no-restricted-syntax
      for (const key in numbers) {
        if (key === number) {
          delete numbers[key];
        }
      }
    }
    // проверка по блоку 3х3
    const miniRow = Math.floor(i / 3) * 3;
    const miniCol = Math.floor(j / 3) * 3;
    for (let row = miniRow; row < miniRow + 3; row += 1) {
      for (let col = miniCol; col < miniCol + 3; col += 1) {
        const number = board[row][col];
        // eslint-disable-next-line no-restricted-syntax
        for (const key in numbers) {
          if (key === number) {
            delete numbers[key];
          }
        }
      }
    }
    return Object.keys(numbers);
  }
  
  // функция решающая судоку
  // пока решает только первые 5 досок
  // вопрос зацикленности все еще открыт
  // не понимаю как перебирать варинты решения
  function getSolve(board) {
    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board.length; j += 1) {
        if (board[i][j] === '-') {
          const position = [i, j];
          const numbers = checkSolve(position, board);
          if (numbers.length === 1) {
            const [number] = numbers;
            // eslint-disable-next-line no-param-reassign
            board[i][j] = number;
            getSolve(board);
            if (checkEmpty(board) === false) getSolve(board);
          }
        }
      }
    }
    return board;
  }
 
function solve(boardString) {
    const board = getBoard(boardString);
    getSolve(board);
    if (checkEmpty(board) === false) getSolve(board);
    return board;
}

function isSolved(board) {
    let sum = 0;
    for (let i = 0; i < board.length; i += 1) {
      const sumStr = board[i].reduce((a, b) => Number(a) + Number(b));
      sum += sumStr;
    }
    return (sum === 405);
  }

function prettyBoard(board) {
    const solvedBoard = [];
    for (let j = 0; j < board.length; j += 1) {
      if (j % 3 === 0) solvedBoard.push('\n');
      for (let i = 0; i < board[j].length; i += 1) {
        if (i % 3 === 2) {
          if (i % 9 === 8) {
            const result = `${board[j][i]}\n`;
            solvedBoard.push(result);
          } else {
            const result = `${board[j][i]}   `;
            solvedBoard.push(result);
          }
        } else {
          const result = `${board[j][i]}  `;
          solvedBoard.push(result);
        }
      }
    }

//------------------------------------------------------------

const coolGradient = gradient(
  tinycolor.random(),
  tinycolor.random(),
  tinycolor.random(),
  tinycolor.random()
);

// тут мы возвращаем борду и она крутиться в "цикле" чтобы была анимация
  const result = `${solvedBoard.join('')}`;

const rainbow = chalkAnimation.rainbow(result); // Animation starts


setTimeout(() => {
  rainbow.stop(); // Animation stops
}, 1000);

setTimeout(() => {
  rainbow.start(); // Animation resumes
}, 2000);

const ninja = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠢⣤⡄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⠋⠈⠑⠠⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣶⣆⣴⡟⠀⠀⠀⠀⠀⠈⠐⠄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠢⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⢿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠟⠁⣼⣿⣿⣿⣤⣦⣶⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣷⣾⣿⣿⣿⣿⣿⡿⣿⣿⠗⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣴⣾⡾⠿⠟⠛⠉⠉⠀⠈⠀⠀⢸⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣀⣤⠾⠛⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠧⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠈⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`

//------------------------------------------------------------

    return coolGradient(ninja);
  }
  // Экспортировать функции для использования в другом файле (например, readAndSolve.js).

  export  {
    solve,
    isSolved,
    prettyBoard,
  };
