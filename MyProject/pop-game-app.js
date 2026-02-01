function PopGameApp() {
  const [balance, setBalance] = React.useState(0);
  const [betAmount, setBetAmount] = React.useState('');
  const [gameState, setGameState] = React.useState('betting');
  const [countdown, setCountdown] = React.useState(5);
  const [currentRow, setCurrentRow] = React.useState(0);
  const [selectedCell, setSelectedCell] = React.useState(null);
  const [revealedCells, setRevealedCells] = React.useState([]);
  const [grid, setGrid] = React.useState([]);
  const [multiplier, setMultiplier] = React.useState(1.0);
  const [canCashout, setCanCashout] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [isRevealing, setIsRevealing] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  const rowMultipliers = [1.10, 1.20, 1.50, 2.00, 3.00];
  const correctCounts = [3, 3, 2, 2, 1];

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(user);
    setBalance(1000);
  }, []);

  const generateGrid = () => {
    const newGrid = [];
    for (let i = 0; i < 5; i++) {
      const row = [false, false, false, false];
      const correctCount = correctCounts[i];
      const indices = [0, 1, 2, 3];
      for (let j = 0; j < correctCount; j++) {
        const randomIndex = Math.floor(Math.random() * indices.length);
        row[indices[randomIndex]] = true;
        indices.splice(randomIndex, 1);
      }
      newGrid.push(row);
    }
    return newGrid;
  };

  const startGame = () => {
    const bet = parseFloat(betAmount);
    if (!bet || bet <= 0 || bet > balance) {
      setMessage('مبلغ شرط بندی نامعتبر است');
      return;
    }
    setBalance(balance - bet);
    setGameState('countdown');
    setGrid(generateGrid());
    setCurrentRow(0);
    setRevealedCells([]);
    setMultiplier(1.0);
    setCanCashout(false);
    setMessage('');
    let counter = 5;
    const timer = setInterval(() => {
      counter--;
      setCountdown(counter);
      if (counter === 0) {
        clearInterval(timer);
        setGameState('playing');
        setCountdown(5);
      }
    }, 1000);
  };

  const selectCell = async (cellIndex) => {
    if (isRevealing || gameState !== 'playing') return;
    setIsRevealing(true);
    setSelectedCell(cellIndex);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const isCorrect = grid[currentRow][cellIndex];
    const newRevealed = [...revealedCells, { row: currentRow, cell: cellIndex, correct: isCorrect }];
    setRevealedCells(newRevealed);
    
    if (isCorrect) {
      const newMultiplier = multiplier * rowMultipliers[currentRow];
      setMultiplier(newMultiplier);
      
      if (currentRow < 4) {
        setCurrentRow(currentRow + 1);
        setCanCashout(true);
        setMessage(`عالی! ضریب فعلی: ${newMultiplier.toFixed(2)}x`);
      } else {
        await saveGameResult(newMultiplier);
        setGameState('won');
        const winAmount = parseFloat(betAmount) * newMultiplier;
        setBalance(balance + winAmount);
        setMessage(`تبریک! شما برنده شدید! برد: ${winAmount.toFixed(0)} امتیاز`);
      }
    } else {
      await saveGameResult(0);
      setGameState('lost');
      setMessage('متاسفانه باختید!');
    }
    
    setSelectedCell(null);
    setIsRevealing(false);
  };

  const cashout = async () => {
    if (!canCashout || isRevealing) return;
    const winAmount = parseFloat(betAmount) * multiplier;
    setBalance(balance + winAmount);
    await saveGameResult(multiplier);
    setGameState('cashedout');
    setMessage(`برداشت موفق! مبلغ: ${winAmount.toFixed(0)} امتیاز`);
  };

  const saveGameResult = async (finalMultiplier) => {
    if (!currentUser) return;
    try {
      const score = Math.floor(parseFloat(betAmount) * finalMultiplier);
      await DBUtils.saveGameScore(currentUser.id, 'بازی پاپ', score, 0);
    } catch (error) {
      console.error('خطا در ذخیره نتیجه:', error);
    }
  };

  const resetGame = () => {
    setGameState('betting');
    setBetAmount('');
    setCurrentRow(0);
    setRevealedCells([]);
    setMultiplier(1.0);
    setCanCashout(false);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-500">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold" style={{color: 'var(--primary-color)'}}>بازی پاپ</h1>
                <p className="text-gray-600">موجودی: {balance.toFixed(0)} امتیاز</p>
              </div>
              {gameState === 'playing' && canCashout && (
                <button onClick={cashout} disabled={isRevealing}
                  className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors disabled:opacity-50">
                  برداشت ({(parseFloat(betAmount) * multiplier).toFixed(0)})
                </button>
              )}
            </div>

            {gameState === 'betting' && (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-4">مبلغ شرط بندی را وارد کنید</h2>
                <input type="number" value={betAmount} onChange={(e) => setBetAmount(e.target.value)}
                  className="w-64 px-4 py-3 border-2 rounded-xl text-center text-2xl mb-4"
                  placeholder="مبلغ" style={{borderColor: 'var(--primary-color)'}} />
                <button onClick={startGame} className="block w-64 mx-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-2xl transition-all">
                  شروع بازی
                </button>
              </div>
            )}

            {gameState === 'countdown' && (
              <div className="text-center py-16">
                <div className="text-8xl font-bold mb-4 animate-pulse bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl">{countdown}</div>
                <p className="text-2xl text-gray-600">بازی در حال شروع...</p>
              </div>
            )}

            {(gameState === 'playing' || gameState === 'won' || gameState === 'lost' || gameState === 'cashedout') && (
              <div className="space-y-4">
                {grid.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-3 justify-center">
                    {row.map((cell, cellIndex) => {
                      const revealed = revealedCells.find(r => r.row === rowIndex && r.cell === cellIndex);
                      const isActive = rowIndex === currentRow && gameState === 'playing';
                      return (
                        <button key={cellIndex} onClick={() => isActive && selectCell(cellIndex)}
                          disabled={!isActive || isRevealing}
                          className={`w-24 h-24 rounded-2xl text-2xl font-bold transition-all duration-300 transform ${
                            revealed ? (revealed.correct ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg shadow-green-500/50' : 'bg-gradient-to-br from-red-400 to-red-600 text-white shadow-lg shadow-red-500/50') :
                            isActive ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 cursor-pointer' :
                            'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-500'
                          } ${selectedCell === cellIndex && 'animate-pulse scale-105 shadow-2xl'}`}>
                          {revealed ? (revealed.correct ? '✓' : '✗') : '?'}
                        </button>
                      );
                    })}
                    <div className="flex items-center justify-center w-20 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {rowMultipliers[rowIndex]}x
                    </div>
                  </div>
                ))}
              </div>
            )}

            {message && (
              <div className={`mt-6 p-4 rounded-xl text-center text-lg font-bold ${
                gameState === 'won' || gameState === 'cashedout' ? 'bg-green-100 text-green-800' : 
                gameState === 'lost' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {message}
              </div>
            )}

            {(gameState === 'won' || gameState === 'lost' || gameState === 'cashedout') && (
              <button onClick={resetGame} className="mt-6 w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-2xl transition-all">
                بازی جدید
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PopGameApp />);
