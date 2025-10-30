// 🎮 نسخه نئون بازی پوپ با تایمر و صداهای معتبر 🔊

const board = document.getElementById("game-board");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

let score = 0;
let gameOver = false;
let currentRow = 0;
let timerInterval;
let choiceTimer;

// سطح‌های بازی (از پایین به بالا)
const levels = [
  { name: "ردیف 1", correct: 1, total: 4, multiplier: 1.10 },
  { name: "ردیف 2", correct: 2, total: 4, multiplier: 1.20 },
  { name: "ردیف 3", correct: 2, total: 4, multiplier: 1.50 }
];

// صداهای معتبر از منابع Google & FreeSound
const coinSound = new Audio("https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg");
const poopSound = new Audio("https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg");

function startGame() {
  board.innerHTML = "";
  result.textContent = "";
  score = 0;
  gameOver = false;
  currentRow = 0;
  updateScore();
  playLevel(currentRow);
}

function playLevel(rowIndex) {
  if (rowIndex >= levels.length || gameOver) {
    result.textContent = `🎉 بازی تمام شد! امتیاز نهایی: ${score.toFixed(2)}`;
    return;
  }

  const level = levels[rowIndex];
  board.innerHTML = `
    <h2>${level.name} (ضریب ${level.multiplier})</h2>
  `;

  const row = document.createElement("div");
  row.classList.add("row");

  const correctIndexes = new Set();
  while (correctIndexes.size < level.correct) {
    correctIndexes.add(Math.floor(Math.random() * level.total));
  }

  for (let i = 0; i < level.total; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = "?";

    cell.addEventListener("click", () => {
      if (gameOver) return;
      handleChoice(cell, correctIndexes.has(i), level);
    });

    row.appendChild(cell);
  }

  board.appendChild(row);
  startChoiceTimer(level);
}

function handleChoice(cell, isCorrect, level) {
  clearTimeout(choiceTimer);

  if (isCorrect) {
    cell.textContent = "🤑";
    cell.classList.add("correct");
    coinSound.currentTime = 0;
    coinSound.play();

    score += 10 * level.multiplier;
    updateScore();

    result.textContent = `✅ درست زدی! امتیاز فعلی: ${score.toFixed(2)}`;
    result.style.color = "#00ff9d";

    setTimeout(() => {
      currentRow++;
      startNextLevel();
    }, 2000);
  } else {
    cell.textContent = "💩";
    cell.classList.add("wrong");
    poopSound.currentTime = 0;
    poopSound.play();
    result.textContent = `💩 باختی! امتیاز نهایی: ${score.toFixed(2)}`;
    result.style.color = "#ff5252";
    gameOver = true;
  }
}

function startChoiceTimer(level) {
  let timeLeft = 5;
  result.textContent = `🕒 ${timeLeft} ثانیه فرصت داری...`;

  choiceTimer = setInterval(() => {
    timeLeft--;
    result.textContent = `🕒 ${timeLeft} ثانیه فرصت داری...`;

    if (timeLeft <= 0) {
      clearInterval(choiceTimer);
      result.textContent = `💩 وقت تموم شد! امتیاز نهایی: ${score.toFixed(2)}`;
      result.style.color = "#ff5252";
      poopSound.play();
      gameOver = true;
    }
  }, 1000);
}

function startNextLevel() {
  clearInterval(timerInterval);
  let countdown = 30;
  result.textContent = `⏳ ${countdown} ثانیه تا شروع مرحله بعد...`;

  timerInterval = setInterval(() => {
    countdown--;
    result.textContent = `⏳ ${countdown} ثانیه تا شروع مرحله بعد...`;
    if (countdown <= 0) {
      clearInterval(timerInterval);
      playLevel(currentRow);
    }
  }, 1000);
}

function updateScore() {
  result.textContent = `امتیاز فعلی: ${score.toFixed(2)}`;
  result.style.color = "#00e5ff";
}

restartBtn.addEventListener("click", startGame);
startGame();
