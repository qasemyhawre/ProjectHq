function GameCard({ game }) {
  return (
    <div className="card cursor-pointer" data-name="game-card" data-file="components/GameCard.js" onClick={() => window.location.href = game.url}>
      <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 bg-white">
        <div className={`icon-${game.icon} text-3xl`} style={{color: 'var(--primary-color)'}}></div>
      </div>
      <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
      <p className="text-gray-600 mb-4">{game.description}</p>
      <button className="w-full px-4 py-2 rounded-lg font-medium transition-colors" style={{backgroundColor: 'var(--secondary-color)', color: 'white'}}>
        شروع بازی
      </button>
    </div>
  );
}