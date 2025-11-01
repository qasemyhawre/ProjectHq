function RegisterApp() {
  const [formData, setFormData] = React.useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = React.useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('رمز عبور و تکرار آن مطابقت ندارند');
      return;
    }
    
    try {
      const newUser = await DBUtils.registerUser(formData.name, formData.email, formData.password);
      localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.objectId,
        name: newUser.objectData.Name,
        email: newUser.objectData.Email
      }));
      window.location.href = 'profile.html';
    } catch (err) {
      setError(err.message || 'خطا در ثبت نام');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-cyan-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8" style={{color: 'var(--primary-color)'}}>ثبت نام</h1>
        
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">نام و نام خانوادگی</label>
            <input type="text" value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">ایمیل</label>
            <input type="email" value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">رمز عبور</label>
            <input type="password" value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">تکرار رمز عبور</label>
            <input type="password" value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2" required />
          </div>
          
          {error && <p className="text-red-600 text-sm">{error}</p>}
          
          <button type="submit" className="w-full btn-primary">ثبت نام</button>
        </form>
        
        <p className="mt-6 text-center text-sm">حساب کاربری دارید؟ <a href="login.html" className="font-medium hover:underline" style={{color: 'var(--primary-color)'}}>ورود</a></p>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RegisterApp />);