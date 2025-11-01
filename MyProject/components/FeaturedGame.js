function FeaturedGame({ game }) {
  return (
    <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 py-16" data-name="featured-game" data-file="components/FeaturedGame.js">
      <div className="container mx-auto px-4">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 md:p-12 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
              {game.badge}
            </span>
            <div className="icon-trending-up text-2xl"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{game.title}</h2>
              <p className="text-xl mb-6 text-purple-100">{game.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="icon-users text-xl"></div>
                  <span>هزاران بازیکن</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="icon-trophy text-xl"></div>
                  <span>جوایز ویژه</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="icon-zap text-xl"></div>
                  <span>سرعت بالا</span>
                </div>
              </div>
              
              <a href={game.url} className="inline-block px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                شروع بازی پاپ
              </a>
            </div>
            
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white border-opacity-30 hover:scale-110 transition-transform duration-300">
                <div className={`icon-${game.icon} text-8xl`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}