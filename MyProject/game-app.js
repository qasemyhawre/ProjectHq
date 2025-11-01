function GameApp() {
  const [targetNumber, setTargetNumber] = React.useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = React.useState('');
  const [attempts, setAttempts] = React.useState(0);
  const [message, setMessage] = React.useState('');
  const [gameWon, setGameWon] = React.useState(false);

  const handleGuess = () => {
    const num = parseInt(guess);
    setAttempts(attempts + 1);
    
    if (num === targetNumber) {
      setMessage(`آفرین! عدد را در ${attempts + 1} تلاش حدس زدید!`);
      setGameWon(true);
    } else if (num < targetNumber) {
      setMessage('عدد بزرگتر است!');
    } else {
      setMessage('عدد کوچکتر است!');
    }
    setGuess('');
  };

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(0);
    setMessage('');
    setGameWon(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="card text-center">
            <h1 className="text-3xl font-bold mb-4">بازی حدس عدد</h1>
            <p className="text-gray-600 mb-8">یک عدد بین 1 تا 100 حدس بزنید</p>
            
            <div className="mb-6">
              <input type="number" value={guess} onChange={(e) => setGuess(e.target.value)}
                disabled={gameWon}
                className="w-full px-4 py-3 border rounded-lg text-center text-2xl focus:outline-none focus:ring-2"
                placeholder="عدد خود را وارد کنید" />
            </div>
            
            <button onClick={handleGuess} disabled={gameWon || !guess} className="btn-primary w-full mb-4">
              حدس بزن
            </button>
            
            {message && (
              <div className={`p-4 rounded-lg mb-4 ${gameWon ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                {message}
              </div>
            )}
            
            <p className="text-gray-600">تعداد تلاش‌ها: {attempts}</p>
            
            {gameWon && (
              <button onClick={resetGame} className="mt-4 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
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
root.render(<GameApp />);