// بازی پوپ 🎯
const board = document.getElementById("game-board");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

// تنظیمات بازی
const levels = [
  { correct: 3, total: 4 }, // ردیف 1
  { correct: 3, total: 4 }, // ردیف 2
  { correct: 2, total: 4 }, // ردیف 3
  { correct: 2, total: 4 }, // ردیف 4
  { correct: 1, total: 4 }  // ردیف 5
];

let gameOver = false;

function createGame() {
  board.innerHTML = "";
  result.textContent = "";
  gameOver = false;

  levels.forEach((level, rowIndex) => {
    const row = document.createElement("div");
    row.classList.add("row");

    // ساختن خانه‌ها
    const correctIndexes = new Set();
    while (correctIndexes.size < level.correct) {
      correctIndexes.add(Math.floor(Math.random() * level.total));
    }

    for (let i = 0; i < level.total; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      cell.addEventListener("click", () => {
        if (gameOver) return;

        if (correctIndexes.has(i)) {
          cell.classList.add("correct");
          cell.textContent = "✅";
        } else {
          cell.classList.add("wrong");
          cell.textContent = "💩";
          result.textContent = "باختی 😅 روی پوپ زدی!";
          result.style.color = "#ff5252";
          gameOver = true;
        }

        // بررسی اگر همه گزینه‌های درست پیدا شدن
        const allCorrect = [...document.querySelectorAll(".cell.correct")].length;
        const totalCorrect = levels.reduce((sum, l) => sum + l.correct, 0);
        if (allCorrect === totalCorrect && !gameOver) {
          result.textContent = "🎉 برنده شدی!";
          result.style.color = "#4caf50";
          gameOver = true;
        }
      });

      row.appendChild(cell);
    }

    board.appendChild(row);
  });
}

restartBtn.addEventListener("click", createGame);
createGame();
