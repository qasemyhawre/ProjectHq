class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">مشکلی پیش آمده</h1>
            <button onClick={() => window.location.reload()} className="btn-primary">
              بارگذاری مجدد
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    const featuredGame = {
      id: 'pop',
      title: 'بازی پاپ',
      description: 'محبوب‌ترین و پرهیجان‌ترین بازی! آماده برای کسب امتیازات بالا؟',
      icon: 'star',
      url: 'pop-game.html',
      badge: 'محبوب'
    };

    const games = [
      { id: 2, title: 'بازی مار', description: 'مار را هدایت کنید و غذا جمع کنید', icon: 'zap', url: 'snake-game.html' },
      { id: 3, title: 'بازی 2048', description: 'اعداد را ترکیب کنید و به 2048 برسید', icon: 'grid-3x3', url: '2048-game.html' },
      { id: 4, title: 'بازی حافظه', description: 'کارت‌های یکسان را پیدا کنید', icon: 'brain', url: 'memory-game.html' },
      { id: 5, title: 'بازی دوز', description: 'سه تا یک خط! با دوست بازی کنید', icon: 'circle', url: 'tictactoe-game.html' },
      { id: 1, title: 'بازی حدس عدد', description: 'یک عدد را حدس بزنید و امتیاز کسب کنید', icon: 'dice-5', url: 'game.html' }
    ];

    return (
      <div className="min-h-screen" data-name="app" data-file="app.js">
        <Header />
        <Hero />
        <FeaturedGame game={featuredGame} />
        <main className="container mx-auto px-4 py-16" id="games">
          <h2 className="text-3xl font-bold text-center mb-12">سایر بازی‌ها</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);