document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const restartButton = document.getElementById("restart");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    function checkWinner() {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                statusText.innerHTML = `🎉 Player ${currentPlayer} Wins! 🎊`;
                highlightWinningCells(combo);
                return;
            }
        }

        if (!board.includes("")) {
            gameActive = false;
            statusText.innerHTML = "It's a Draw! 🤝";
        }
    }

    function highlightWinningCells(combo) {
        combo.forEach(index => {
            cells[index].classList.add("winning-cell");
        });
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.style.color = currentPlayer === "X" ? "#ff69b4" : "#3498db";

        checkWinner();

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (gameActive) {
            statusText.innerHTML = currentPlayer === "X" ? "💜 Player X's turn 💙" : "💙 Player O's turn 💜";
        }
    }

    function restartGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        statusText.innerHTML = "💜 Player X's turn 💙";
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("winning-cell");
        });
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", restartGame);
});