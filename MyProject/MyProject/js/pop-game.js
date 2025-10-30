// 🎮 بازی پوپ نسخه‌ی امتیازدار با صدا و اموجی‌ها 🤑💩

// گرفتن عناصر HTML
const board = document.getElementById("game-board");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

// سطح‌های بازی (از پایین به بالا)
const levels = [
  { correct: 1, total: 4 }, // ردیف 5 (پایینی)
  { correct: 2, total: 4 }, // ردیف 4
  { correct: 2, total: 4 }, // ردیف 3
  { correct: 3, total: 4 }, // ردیف 2
  { correct: 3, total: 4 }  // ردیف 1 (بالایی)
];

let score = 0;
let gameOver = false;

// 🎵 ایجاد صداها
const coinSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_8a1e2f3c3a.mp3"); // صدای پول
const poopSound = new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_5f4f0d4a93.mp3"); // صدای پوپ

function createGame() {
  board.innerHTML = "";
  result.textContent = "";
  score = 0;
  gameOver = false;

  // از پایین به بالا رسم می‌کنیم
  for (let rowIndex = levels.length - 1; rowIndex >= 0; rowIndex--) {
    const level = levels[rowIndex];
    const row = document.createElement("div");
    row.classList.add("row");

    const correctIndexes = new Set();
    while (correctIndexes.size < level.correct) {
      correctIndexes.add(Math.floor(Math.random() * level.total));
    }

    for (let i = 0; i < level.total; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      cell.addEventListener("click", () => {
        if (gameOver || cell.classList.contains("correct") || cell.classList.contains("wrong")) return;

        if (correctIndexes.has(i)) {
          cell.classList.add("correct");
          cell.textContent = "🤑";
          coinSound.currentTime = 0;
          coinSound.play();
          score += 10;
        } else {
          cell.classList.add("wrong");
          cell.textContent = "💩";
          poopSound.currentTime = 0;
          poopSound.play();
          result.textContent = `💩 باختی! امتیاز نهایی: ${score}`;
          result.style.color = "#ff5252";
          gameOver = true;
        }

        updateScore();

        // بررسی برنده شدن
        const allCorrect = [...document.querySelectorAll(".cell.correct")].length;
        const totalCorrect = levels.reduce((sum, l) => sum + l.correct, 0);
        if (allCorrect === totalCorrect && !gameOver) {
          result.textContent = `🎉 برنده شدی! امتیاز نهایی: ${score}`;
          result.style.color = "#4caf50";
          gameOver = true;
        }
      });

      row.appendChild(cell);
    }

    board.appendChild(row);
  }

  updateScore();
}

function updateScore() {
  result.textContent = `امتیاز فعلی: ${score}`;
  result.style.color = "#4caf50";
}

restartBtn.addEventListener("click", createGame);
createGame();
