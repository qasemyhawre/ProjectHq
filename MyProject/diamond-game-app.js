function DiamondGameApp() {
  const [score, setScore] = React.useState(0);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [diamonds, setDiamonds] = React.useState([]);
  const [bombs, setBombs] = React.useState([]);
  const [timeLeft, setTimeLeft] = React.useState(30);
  const [gameOver, setGameOver] = React.useState(false);

  React.useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          saveScore();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const itemGenerator = setInterval(() => {
      if (Math.random() > 0.3) {
        setDiamonds(prev => [...prev, { id: Date.now(), x: Math.random() * 80 + 10 }]);
      } else {
        setBombs(prev => [...prev, { id: Date.now(), x: Math.random() * 80 + 10 }]);
      }
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(itemGenerator);
    };
  }, [gameStarted, gameOver]);

  const collectDiamond = (id) => {
    setDiamonds(prev => prev.filter(d => d.id !== id));
    setScore(prev => prev + 10);
  };

  const hitBomb = (id) => {
    setBombs(prev => prev.filter(b => b.id !== id));
    setScore(prev => Math.max(0, prev - 20));
  };

  const saveScore = async () => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user) {
      try {
        await DBUtils.saveGameScore(user.id, 'بازی الماس', score, 30);
      } catch (error) {
        console.error('خطا در ذخیره امتیاز:', error);
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setDiamonds([]);
    setBombs([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold" style={{color: 'var(--primary-color)'}}>بازی الماس</h1>
                <p className="text-gray-600">امتیاز: {score}</p>
              </div>
              <div className="text-2xl font-bold" style={{color: 'var(--secondary-color)'}}>
                زمان: {timeLeft}
              </div>
            </div>

            {!gameStarted && !gameOver && (
              <div className="text-center py-16">
                <div className="icon-gem text-6xl mb-4" style={{color: 'var(--primary-color)'}}></div>
                <h2 className="text-2xl font-bold mb-4">الماس‌ها را جمع کنید!</h2>
                <p className="text-gray-600 mb-6">از بمب‌ها دوری کنید و در 30 ثانیه بیشترین امتیاز را کسب کنید</p>
                <button onClick={startGame} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold">
                  شروع بازی
                </button>
              </div>
            )}

            {gameStarted && !gameOver && (
              <div className="relative bg-gradient-to-b from-sky-200 to-sky-100 rounded-2xl h-96 overflow-hidden">
                {diamonds.map(diamond => (
                  <div key={diamond.id} onClick={() => collectDiamond(diamond.id)}
                    className="absolute animate-fall cursor-pointer"
                    style={{left: `${diamond.x}%`, top: '-10%'}}>
                    <div className="icon-gem text-4xl text-cyan-500"></div>
                  </div>
                ))}
                {bombs.map(bomb => (
                  <div key={bomb.id} onClick={() => hitBomb(bomb.id)}
                    className="absolute animate-fall cursor-pointer"
                    style={{left: `${bomb.x}%`, top: '-10%'}}>
                    <div className="icon-bomb text-4xl text-red-500"></div>
                  </div>
                ))}
              </div>
            )}

            {gameOver && (
              <div className="text-center py-16">
                <h2 className="text-3xl font-bold mb-4">بازی تمام شد!</h2>
                <p className="text-2xl mb-6">امتیاز نهایی: {score}</p>
                <button onClick={startGame} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold">
                  بازی جدید
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fall {
          from { top: -10%; }
          to { top: 110%; }
        }
        .animate-fall {
          animation: fall 4s linear;
        }
      `}</style>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DiamondGameApp />);