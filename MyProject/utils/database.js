const DBUtils = {
  async registerUser(name, email, password) {
    try {
      const existingUsers = await trickleListObjects('user', 100, true);
      const userExists = existingUsers.items.find(u => u.objectData.Email === email);
      
      if (userExists) {
        throw new Error('این ایمیل قبلاً ثبت شده است');
      }

      const newUser = await trickleCreateObject('user', {
        Name: name,
        Email: email,
        Password: password,
        TotalScore: 0,
        GamesPlayed: 0
      });

      return newUser;
    } catch (error) {
      console.error('خطا در ثبت نام:', error);
      throw error;
    }
  },

  async loginUser(email, password) {
    try {
      const users = await trickleListObjects('user', 100, true);
      const user = users.items.find(u => 
        u.objectData.Email === email && u.objectData.Password === password
      );

      if (!user) {
        throw new Error('ایمیل یا رمز عبور اشتباه است');
      }

      return user;
    } catch (error) {
      console.error('خطا در ورود:', error);
      throw error;
    }
  },

  async saveGameScore(userId, gameType, score, duration) {
    try {
      const userScores = await trickleListObjects(`game_score`, 100, true);
      const userGameScores = userScores.items.filter(s => 
        s.objectData.UserId === userId && s.objectData.GameType === gameType
      );

      const highScore = userGameScores.length > 0 
        ? Math.max(...userGameScores.map(s => s.objectData.Score))
        : 0;
      
      const isHighScore = score > highScore;

      const gameScore = await trickleCreateObject('game_score', {
        UserId: userId,
        GameType: gameType,
        Score: score,
        Duration: duration,
        IsHighScore: isHighScore
      });

      const user = await trickleGetObject('user', userId);
      await trickleUpdateObject('user', userId, {
        TotalScore: (user.objectData.TotalScore || 0) + score,
        GamesPlayed: (user.objectData.GamesPlayed || 0) + 1
      });

      return { gameScore, isHighScore };
    } catch (error) {
      console.error('خطا در ذخیره امتیاز:', error);
      throw error;
    }
  },

  async getUserStats(userId) {
    try {
      const user = await trickleGetObject('user', userId);
      const scores = await trickleListObjects('game_score', 100, true);
      const userScores = scores.items.filter(s => s.objectData.UserId === userId);

      return {
        user: user.objectData,
        totalScore: user.objectData.TotalScore || 0,
        gamesPlayed: user.objectData.GamesPlayed || 0,
        recentGames: userScores.slice(0, 5)
      };
    } catch (error) {
      console.error('خطا در دریافت آمار:', error);
      throw error;
    }
  }
};