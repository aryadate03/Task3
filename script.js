let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = false;
let gameMode = null; // 'friend' or 'computer'

const statusDisplay = document.getElementById("status");
const cells = document.getElementsByClassName("cell");

const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function setGameMode(mode) {
  gameMode = mode;
  resetGame();
  gameActive = true;
  statusDisplay.innerText = `Current Player: ${currentPlayer}`;
}

function makeMove(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  cells[index].innerText = currentPlayer;

  if (checkWin()) {
    statusDisplay.innerText = `${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusDisplay.innerText = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerText = `Current Player: ${currentPlayer}`;

  if (gameMode === 'computer' && currentPlayer === 'O') {
    setTimeout(computerMove, 500); // slight delay for realism
  }
}

function computerMove() {
  let emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex);
}

function checkWin() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board.fill("");
  for (let cell of cells) {
    cell.innerText = "";
  }
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.innerText = `Current Player: ${currentPlayer}`;
}
