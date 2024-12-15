const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.querySelector('.current-player');
const restartBtn = document.querySelector('.restart-btn');

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '🐐';
let gameActive = true;

function printBoard() {
  cells.forEach((cell, index) => {
    cell.textContent = gameBoard[index];
  });
}

function checkWin() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  return winningCombos.some(combo =>
    gameBoard[combo[0]] !== '' &&
    gameBoard[combo[0]] === gameBoard[combo[1]] &&
    gameBoard[combo[1]] === gameBoard[combo[2]]
  );
}

function handleMove(position) {
  if (gameBoard[position] === '' && gameActive) {
    gameBoard[position] = currentPlayer;
    printBoard();

    if (checkWin()) {
      gameActive = false;
      alert(`Player ${currentPlayer} wins!`);
      return;
    }

    if (gameBoard.every(cell => cell !== '')) {
      gameActive = false;
      alert("It's a draw!");
      return;
    }

    currentPlayer = currentPlayer === '🐐' ? '🍇' : '🐐';
    currentPlayerDisplay.textContent = currentPlayer;
  }
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleMove(index));
});

restartBtn.addEventListener('click', () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = '🐐';
  gameActive = true;
  printBoard();
  currentPlayerDisplay.textContent = currentPlayer;
});

printBoard();
