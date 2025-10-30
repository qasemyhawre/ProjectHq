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
  const gameContainer = document.getElementById('pop-game');

  const soundCorrect = new Audio('sounds/correct.mp3');
  const soundWrong = new Audio('sounds/wrong.mp3');

  const rowDivs = rows.map((rowData, index) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'pop-row';
    rowDiv.dataset.row = index;
    rowDiv.style.opacity = index === 0 ? '1' : '0.5';

    const options = [];
    for (let i = 0; i < rowData.correct; i++) options.push('correct');
    for (let i = 0; i < rowData.wrong; i++) options.push('wrong');
    options.sort(() => Math.random() - 0.5);

    options.forEach(type => {
      const cell = document.createElement('div');
      cell.className = 'pop-cell';
      cell.dataset.type = type;
      cell.textContent = type === 'correct' ? '🤑' : '💩';
      cell.style.fontSize = '2em';
      cell.addEventListener('click', () => handleClick(cell, index));
      rowDiv.appendChild(cell);
    });

    gameContainer.appendChild(rowDiv);
    return rowDiv;
  });

  function setActiveRow(index) {
    rowDivs.forEach((r, i) => {
      r.style.opacity = i === index ? '1' : '0.5';
    });
  }

  function handleClick(cell, rowIndex) {
    if (rowIndex !== currentRow) return;

    const rowData = rows[rowIndex];

    if (cell.dataset.type === 'correct') {
      score += rowData.multiplier * 10;
      soundCorrect.play();
      setTimeout(() => {
        currentRow++;
        if (currentRow < rows.length) {
          setActiveRow(currentRow);
          startTimer();
        } else {
          showFinalScore();
        }
      }, 500);
    } else {
      soundWrong.play();
    }
  }

  let timerInterval;
  function startTimer() {
    let timer = 5;
    const timerDiv = document.getElementById('pop-timer');
    if (timerDiv) timerDiv.textContent = `زمان باقی مانده: ${timer}s`;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timer--;
      if (timerDiv) timerDiv.textContent = `زمان باقی مانده: ${timer}s`;
      if (timer <= 0) {
        clearInterval(timerInterval);
        currentRow++;
        if (currentRow < rows.length) {
          setActiveRow(currentRow);
          startTimer();
        } else {
          showFinalScore();
        }
      }
    }, 1000);
  }

  function showFinalScore() {
    gameContainer.innerHTML = `<div class="final-score">امتیاز شما: ${score.toFixed(1)}</div>`;
  }

  const timerDiv = document.createElement('div');
  timerDiv.id = 'pop-timer';
  timerDiv.className = 'timer';
  gameContainer.appendChild(timerDiv);

  setActiveRow(currentRow);
  startTimer();
});
