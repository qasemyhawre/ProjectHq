function Header({ isLoggedIn = false, onLogout = null }) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const loggedIn = isLoggedIn || currentUser !== null;

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('currentUser');
      window.location.href = 'index.html';
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50" data-name="header" data-file="components/Header.js">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="index.html" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white">
            <div className="icon-gamepad-2 text-2xl" style={{color: 'var(--primary-color)'}}></div>
          </div>
          <span className="text-2xl font-bold" style={{color: 'var(--primary-color)'}}>گیم لند</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="index.html" className="font-medium hover:text-[var(--primary-color)] transition-colors">خانه</a>
          <a href="index.html#games" className="font-medium hover:text-[var(--primary-color)] transition-colors">بازی‌ها</a>
        </nav>
        
        <div className="flex items-center gap-4">
          {loggedIn ? (
            <>
              <a href="profile.html" className="font-medium hover:text-[var(--primary-color)] transition-colors flex items-center gap-2">
                <div className="icon-user text-lg"></div>
                پروفایل
              </a>
              <button onClick={handleLogoutClick} className="btn-primary text-sm">
                خروج
              </button>
            </>
          ) : (
            <>
              <a href="login.html" className="font-medium hover:text-[var(--primary-color)] transition-colors">ورود</a>
              <a href="register.html" className="btn-primary text-sm">ثبت نام</a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
