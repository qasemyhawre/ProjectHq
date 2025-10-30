// pop-game.js
document.addEventListener('DOMContentLoaded', () => {

  const rows = [
    { correct: 3, wrong: 1, multiplier: 1.2 },
    { correct: 3, wrong: 1, multiplier: 1.3 },
    { correct: 2, wrong: 2, multiplier: 1.6 },
    { correct: 2, wrong: 2, multiplier: 1.8 },
    { correct: 1, wrong: 3, multiplier: 2.0 }
  ];

  let currentRow = 0;
  let score = 0;
  let canClick = true;

  const gameContainer = document.getElementById('pop-game');

  // صداها
  const soundCorrect = new Audio('sounds/correct.mp3'); // از لینک قبلی استفاده کن
  const soundWrong = new Audio('sounds/wrong.mp3');

  // پاک کردن بازی قبلی
  function clearGame() {
    gameContainer.innerHTML = '';
  }

  // ایجاد خانه‌ها برای ردیف فعلی
  function createRow(rowData, rowIndex) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'pop-row';
    rowDiv.dataset.row = rowIndex;

    // جمع تعداد خانه‌ها
    const total = rowData.correct + rowData.wrong;

    // آرایه گزینه‌ها
    const options = [];
    for (let i = 0; i < rowData.correct; i++) options.push('correct');
    for (let i = 0; i < rowData.wrong; i++) options.push('wrong');

    // شفل
    options.sort(() => Math.random() - 0.5);

    options.forEach((type, i) => {
      const cell = document.createElement('div');
      cell.className = 'pop-cell';
      cell.dataset.type = type;
      cell.textContent = type === 'correct' ? '🤑' : '💩';
      cell.style.fontSize = '2em';
      cell.addEventListener('click', () => handleClick(cell, rowData));
      rowDiv.appendChild(cell);
    });

    return rowDiv;
  }

  // هندل کلیک
  function handleClick(cell, rowData) {
    if (!canClick) return;

    canClick = false;

    if (cell.dataset.type === 'correct') {
      score += rowData.multiplier * 10;
      soundCorrect.play();
    } else {
      soundWrong.play();
    }

    // بعد از 0.5 ثانیه، به مرحله بعد می‌رویم یا صبر می‌کنیم
    setTimeout(() => {
      currentRow++;
      if (currentRow < rows.length) {
        canClick = true;
        renderRow();
      } else {
        showFinalScore();
      }
    }, 500);
  }

  // رندر ردیف فعلی
  function renderRow() {
    clearGame();
    const rowData = rows[currentRow];
    const rowDiv = createRow(rowData, currentRow);
    gameContainer.appendChild(rowDiv);

    // تایمر 5 ثانیه
    let timer = 5;
    const timerDiv = document.createElement('div');
    timerDiv.className = 'timer';
    timerDiv.textContent = `زمان باقی مانده: ${timer}s`;
    gameContainer.appendChild(timerDiv);

    const interval = setInterval(() => {
      timer--;
      timerDiv.textContent = `زمان باقی مانده: ${timer}s`;
      if (timer <= 0) {
        clearInterval(interval);
        currentRow++;
        if (currentRow < rows.length) {
          canClick = true;
          renderRow();
        } else {
          showFinalScore();
        }
      }
    }, 1000);
  }

  // نمایش امتیاز نهایی
  function showFinalScore() {
    clearGame();
    const scoreDiv = document.createElement('div');
    scoreDiv.className = 'final-score';
    scoreDiv.textContent = `امتیاز شما: ${score.toFixed(1)}`;
    scoreDiv.style.fontSize = '2em';
    gameContainer.appendChild(scoreDiv);
  }

  // شروع بازی
  renderRow();
});
