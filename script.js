const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const modeToggle = document.getElementById('modeToggle');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (board[index] === '' && isGameActive) {
        board[index] = currentPlayer;
        event.target.innerText = currentPlayer;
        checkResult();
        if (isGameActive) {
            botMove();
        }
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `${currentPlayer} has won!`;
        isGameActive = false;
    } else if (!board.includes('')) {
        statusText.innerText = `It's a Draw!`;
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerText = `${currentPlayer}'s Turn`;
    }
}

function botMove() {
    let emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = currentPlayer;
        cells[randomIndex].innerText = currentPlayer;
        checkResult();
    }
}

function resetGame() {
    currentPlayer = 'X';
    isGameActive = true;
    board = ['', '', '', '', '', '', '', '', ''];
    statusText.innerText = "X's Turn";
    cells.forEach(cell => cell.innerText = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    modeToggle.innerText = document.body.classList.contains('light-mode') ? "Switch to Dark Mode" : "Switch to Light Mode";
});
