function TowerGameApp() {
  const [blocks, setBlocks] = React.useState([]);
  const [currentBlock, setCurrentBlock] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [direction, setDirection] = React.useState(1);

  React.useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveBlock = setInterval(() => {
      setCurrentBlock(prev => {
        if (!prev) return { x: 0, width: 100 };
        const newX = prev.x + direction * 2;
        if (newX <= 0 || newX >= 100 - prev.width) {
          setDirection(d => -d);
        }
        return { ...prev, x: Math.max(0, Math.min(100 - prev.width, newX)) };
      });
    }, 20);

    return () => clearInterval(moveBlock);
  }, [gameStarted, gameOver, direction]);

  const dropBlock = async () => {
    if (!currentBlock || gameOver) return;

    const lastBlock = blocks[blocks.length - 1];
    
    if (blocks.length > 0) {
      const overlap = Math.min(
        currentBlock.x + currentBlock.width,
        lastBlock.x + lastBlock.width
      ) - Math.max(currentBlock.x, lastBlock.x);

      if (overlap <= 0) {
        setGameOver(true);
        await saveScore();
        return;
      }

      const newWidth = overlap;
      const newX = Math.max(currentBlock.x, lastBlock.x);
      
      setBlocks([...blocks, { x: newX, width: newWidth, y: blocks.length }]);
      setCurrentBlock({ x: 0, width: newWidth });
      setScore(score + 1);
    } else {
      setBlocks([{ x: currentBlock.x, width: currentBlock.width, y: 0 }]);
      setCurrentBlock({ x: 0, width: 100 });
      setScore(1);
    }
  };

  const saveScore = async () => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user) {
      try {
        await DBUtils.saveGameScore(user.id, 'بازی برج', score, 0);
      } catch (error) {
        console.error('خطا در ذخیره امتیاز:', error);
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setBlocks([]);
    setCurrentBlock({ x: 0, width: 100 });
    setScore(0);
    setGameOver(false);
    setDirection(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-pink-500">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold" style={{color: 'var(--primary-color)'}}>بازی برج</h1>
              <p className="text-2xl font-bold mt-2" style={{color: 'var(--secondary-color)'}}>
                ارتفاع: {score}
              </p>
            </div>

            {!gameStarted && (
              <div className="text-center py-16">
                <div className="icon-box text-6xl mb-4" style={{color: 'var(--primary-color)'}}></div>
                <h2 className="text-2xl font-bold mb-4">برج خود را بسازید!</h2>
                <p className="text-gray-600 mb-6">بلوک‌ها را روی هم بچینید و بالاترین برج را بسازید</p>
                <button onClick={startGame} className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-bold">
                  شروع بازی
                </button>
              </div>
            )}

            {gameStarted && !gameOver && (
              <>
                <div className="relative bg-gradient-to-b from-sky-400 to-sky-200 rounded-2xl h-96 mb-4 overflow-hidden">
                  {currentBlock && (
                    <div className="absolute bg-purple-500 h-8 transition-all"
                      style={{
                        left: `${currentBlock.x}%`,
                        width: `${currentBlock.width}%`,
                        top: '10px'
                      }}>
                    </div>
                  )}
                  {blocks.slice().reverse().map((block, index) => (
                    <div key={index} className="absolute bg-gradient-to-r from-cyan-500 to-blue-500 h-8"
                      style={{
                        left: `${block.x}%`,
                        width: `${block.width}%`,
                        bottom: `${index * 32}px`
                      }}>
                    </div>
                  ))}
                </div>
                <button onClick={dropBlock} className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-bold text-xl">
                  رها کن!
                </button>
              </>
            )}

            {gameOver && (
              <div className="text-center py-16">
                <h2 className="text-3xl font-bold mb-4">بازی تمام شد!</h2>
                <p className="text-2xl mb-6">ارتفاع نهایی: {score}</p>
                <button onClick={startGame} className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-bold">
                  بازی جدید
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TowerGameApp />);