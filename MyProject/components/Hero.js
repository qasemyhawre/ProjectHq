function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-purple-600 to-cyan-500 text-white py-20" data-name="hero" data-file="components/Hero.js">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          به پلتفرم بازی‌های آنلاین خوش آمدید
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-purple-100">
          بازی کن، رقابت کن، و برنده شو!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="register.html" className="px-8 py-4 bg-white rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105" style={{color: 'var(--primary-color)'}}>
            همین حالا شروع کن
          </a>
          <a href="#games" className="px-8 py-4 border-2 border-white rounded-lg font-bold text-lg transition-all duration-300 hover:bg-white hover:shadow-2xl hover:scale-105" style={{':hover': {color: 'var(--primary-color)'}}}>
            مشاهده بازی‌ها
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
}