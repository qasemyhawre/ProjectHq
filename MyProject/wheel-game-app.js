function WheelGameApp() {
  const [spinning, setSpinning] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);
  const [result, setResult] = React.useState(null);
  const [totalWin, setTotalWin] = React.useState(0);
  const [betAmount, setBetAmount] = React.useState('');
  const [balance, setBalance] = React.useState(1000);
  const [spinCount, setSpinCount] = React.useState(0);

  const multipliers = [0, 0, 1.1, 1.4, 1.5, 2.0, 9.0, 0, 0, 10];
  const colors = ['#1e293b', '#374151', '#10b981', '#06b6d4', '#8b5cf6', '#ec4899', '#fb923c', '#475569', '#64748b', '#fbbf24'];

  const getWeightedRandomIndex = (currentSpinCount) => {
    const newCount = currentSpinCount + 1;
    
    if (newCount % 100 === 0) {
      return 9;
    }
    
    if (newCount % 50 === 0 || newCount % 33 === 0) {
      return 6;
    }
    
    const zeroIndices = [0, 1, 7, 8];
    const winIndices = [2, 3, 4, 5];
    
    const rand = Math.random();
    if (rand < 0.4) {
      return zeroIndices[Math.floor(Math.random() * zeroIndices.length)];
    } else {
      return winIndices[Math.floor(Math.random() * winIndices.length)];
    }
  };

  const spinWheel = async () => {
    const bet = parseFloat(betAmount);
    if (!bet || bet <= 0 || bet > balance) {
      setResult({ message: 'مبلغ شرط بندی نامعتبر است', win: 0 });
      return;
    }

    setBalance(balance - bet);
    setSpinning(true);
    setResult(null);

    const newSpinCount = spinCount + 1;
    setSpinCount(newSpinCount);

    const selectedIndex = getWeightedRandomIndex(spinCount);
    const targetRotation = rotation + 360 * 5 + (selectedIndex * 36);
    
    setRotation(targetRotation);

    setTimeout(async () => {
      setSpinning(false);
      const multiplier = multipliers[selectedIndex];
      const winAmount = bet * multiplier;
      
      setTotalWin(totalWin + winAmount);
      setBalance(balance + winAmount);
      
      if (multiplier === 0) {
        setResult({ message: `متأسفانه باختید! ضریب 0x`, win: 0 });
      } else if (multiplier >= 1.0) {
        setResult({ message: `تبریک! ضریب ${multiplier}x - شما ${winAmount.toFixed(0)} امتیاز بردید!`, win: winAmount });
        const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (user) {
          try {
            await DBUtils.saveGameScore(user.id, 'بازی چرخ شانس', Math.floor(winAmount), 0);
          } catch (error) {
            console.error('خطا در ذخیره امتیاز:', error);
          }
        }
      } else {
        setResult({ message: `ضریب ${multiplier}x - شما ${winAmount.toFixed(0)} امتیاز بردید!`, win: winAmount });
      }
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold mb-2" style={{color: 'var(--primary-color)'}}>چرخ شانس</h1>
              <p className="text-xl text-gray-600">موجودی: {balance.toFixed(0)} امتیاز</p>
            </div>

            <div className="flex justify-center mb-8">
              <div className="relative w-80 h-80">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                  <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-red-600"></div>
                </div>
                
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl shadow-yellow-500/50 ring-4 ring-yellow-400 transition-transform duration-[4000ms] ease-out"
                  style={{ transform: `rotate(${rotation}deg)` }}>
                  {multipliers.map((multiplier, index) => (
                    <div key={index} className="absolute w-full h-full"
                      style={{
                        transform: `rotate(${index * 36}deg)`,
                        clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%)',
                        background: multiplier === 0 ? colors[index] : `linear-gradient(135deg, ${colors[index]}, ${colors[index]}dd)`
                      }}>
                      <div className={`absolute top-[25%] right-[35%] font-bold text-lg transform rotate-[18deg] ${multiplier === 10 ? 'text-2xl' : 'text-lg'} ${multiplier === 0 ? 'text-gray-400' : 'text-white drop-shadow-lg'}`}>
                        {multiplier}x
                      </div>
                    </div>
                  ))}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-white opacity-20 pointer-events-none"></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <input type="number" value={betAmount} onChange={(e) => setBetAmount(e.target.value)}
                disabled={spinning}
                className="w-full px-4 py-3 border-2 rounded-xl text-center text-xl"
                placeholder="مبلغ شرط بندی" style={{borderColor: 'var(--primary-color)'}} />
              
              <button onClick={spinWheel} disabled={spinning}
                className="w-full px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold text-xl disabled:opacity-50">
                {spinning ? 'در حال چرخش...' : 'چرخاندن چرخ'}
              </button>
            </div>

            {result && (
              <div className={`mt-6 p-4 rounded-xl text-center text-lg font-bold ${
                result.win > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {result.message}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WheelGameApp />);
