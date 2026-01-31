function ForgotPasswordApp() {
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (user) {
      setMessage('لینک بازیابی رمز عبور به ایمیل شما ارسال شد');
    } else {
      setMessage('ایمیل وارد شده پیدا نشد');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-cyan-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8" style={{color: 'var(--primary-color)'}}>فراموشی رمز عبور</h1>
        
        <p className="text-center mb-6 text-gray-600">ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود</p>
        
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">ایمیل</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2" required />
          </div>
          
          {message && <p className="text-sm text-center" style={{color: 'var(--secondary-color)'}}>{message}</p>}
          
          <button type="submit" className="w-full btn-primary">ارسال لینک بازیابی</button>
        </form>
        
        <div className="mt-6 text-center">
          <a href="login.html" className="text-sm hover:underline" style={{color: 'var(--primary-color)'}}>بازگشت به صفحه ورود</a>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ForgotPasswordApp />);