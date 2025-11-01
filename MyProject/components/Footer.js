function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20" data-name="footer" data-file="components/Footer.js">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="icon-gamepad-2 text-2xl" style={{color: 'var(--secondary-color)'}}></div>
              <span className="text-2xl font-bold">گیم لند</span>
            </div>
            <p className="text-gray-400">پلتفرم بازی‌های آنلاین با بهترین تجربه</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">دسترسی سریع</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="index.html" className="hover:text-white transition-colors">خانه</a></li>
              <li><a href="index.html#games" className="hover:text-white transition-colors">بازی‌ها</a></li>
              <li><a href="profile.html" className="hover:text-white transition-colors">پروفایل</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">تماس با ما</h3>
            <p className="text-gray-400">info@gameland.com</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© 2025 گیم لند. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}