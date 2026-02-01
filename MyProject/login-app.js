function LoginApp() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const user = await DBUtils.loginUser(email, password);
      if (user && user.objectId) {
        localStorage.setItem('currentUser', JSON.stringify({
          id: user.objectId,
          name: user.objectData.Name,
          email: user.objectData.Email
        }));
        window.location.href = 'profile.html';
      } else {
        setError('ایمیل یا رمز عبور اشتباه است');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'ایمیل یا رمز عبور اشتباه است');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-cyan-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8" style={{color: 'var(--primary-color)'}}>ورود به حساب</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">ایمیل</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{borderColor: 'var(--border-color)'}} required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">رمز عبور</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{borderColor: 'var(--border-color)'}} required />
          </div>
          
          {error && <p className="text-red-600 text-sm">{error}</p>}
          
          <button type="submit" className="w-full btn-primary">ورود</button>
        </form>
        
        <div className="mt-6 text-center space-y-2">
          <a href="forgot-password.html" className="block text-sm hover:underline" style={{color: 'var(--secondary-color)'}}>رمز عبور خود را فراموش کرده‌اید؟</a>
          <p className="text-sm">حساب کاربری ندارید؟ <a href="register.html" className="font-medium hover:underline" style={{color: 'var(--primary-color)'}}>ثبت نام</a></p>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoginApp />);