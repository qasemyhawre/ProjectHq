function ProfileApp() {
  const [user, setUser] = React.useState(null);
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadUserData = async () => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
      if (!currentUser) {
        window.location.href = 'login.html';
        return;
      }
      
      setUser(currentUser);
      
      try {
        const userStats = await DBUtils.getUserStats(currentUser.id);
        setStats(userStats);
      } catch (error) {
        console.error('خطا در بارگذاری آمار:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-8">
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{backgroundColor: 'var(--primary-color)'}}>
                <div className="icon-user text-4xl text-white"></div>
              </div>
              <div className="mr-6">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="icon-loader text-4xl animate-spin" style={{color: 'var(--primary-color)'}}></div>
              </div>
            ) : stats && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-purple-50 rounded-xl p-6 text-center">
                    <div className="icon-trophy text-4xl mb-2" style={{color: 'var(--primary-color)'}}></div>
                    <p className="text-3xl font-bold">{stats.totalScore}</p>
                    <p className="text-gray-600">مجموع امتیاز</p>
                  </div>
                  
                  <div className="bg-cyan-50 rounded-xl p-6 text-center">
                    <div className="icon-gamepad-2 text-4xl mb-2" style={{color: 'var(--secondary-color)'}}></div>
                    <p className="text-3xl font-bold">{stats.gamesPlayed}</p>
                    <p className="text-gray-600">بازی انجام شده</p>
                  </div>
                  
                  <div className="bg-orange-50 rounded-xl p-6 text-center">
                    <div className="icon-star text-4xl text-orange-500 mb-2"></div>
                    <p className="text-3xl font-bold">{stats.recentGames.filter(g => g.objectData.IsHighScore).length}</p>
                    <p className="text-gray-600">رکورد شکسته</p>
                  </div>
                </div>

                {stats.recentGames.length > 0 && (
                  <div className="border-t pt-6">
                    <h2 className="text-xl font-bold mb-4">آخرین بازی‌ها</h2>
                    <div className="space-y-3">
                      {stats.recentGames.map((game, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                          <div>
                            <p className="font-medium">{game.objectData.GameType}</p>
                            <p className="text-sm text-gray-600">{new Date(game.createdAt).toLocaleDateString('fa-IR')}</p>
                          </div>
                          <div className="text-left">
                            <p className="text-2xl font-bold" style={{color: 'var(--primary-color)'}}>{game.objectData.Score}</p>
                            {game.objectData.IsHighScore && (
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">رکورد جدید!</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            
            <div className="mt-8 flex gap-4">
              <button onClick={handleLogout} className="btn-primary flex items-center gap-2">
                <div className="icon-log-out"></div>
                خروج از حساب
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProfileApp />);