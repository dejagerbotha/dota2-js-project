function getTop3Heroes(masterData) {
    return masterData.players.map(player => {
      const playerName = player.playerInfo.profile.personaname;
      const heroStats = {};
  
      // Count the occurrences of each hero
      player.recentMatches.forEach(match => {
        const heroName = match.heroInfo.localized_name;
        heroStats[heroName] = (heroStats[heroName] || 0) + 1;
      });
  
      // Sort the heroes by play count in descending order
      const sortedHeroes = Object.entries(heroStats).sort((a, b) => b[1] - a[1]);
  
      // Take the top 3 heroes
      const top3Heroes = sortedHeroes.slice(0, 3).map(entry => ({ heroName: entry[0], playCount: entry[1] }));
  
      return { playerName, top3Heroes };
    });
  }
  
  function getTop5HeroesAcrossPlayers(masterData) {
    const heroStats = {};
  
    // Iterate over all players
    masterData.players.forEach(player => {
      // Count the occurrences of each hero for the player
      player.recentMatches.forEach(match => {
        const heroName = match.heroInfo.localized_name;
        heroStats[heroName] = (heroStats[heroName] || 0) + 1;
      });
    });
  
    // Sort the heroes by play count in descending order
    const sortedHeroes = Object.entries(heroStats).sort((a, b) => b[1] - a[1]);
  
    // Take the top 5 heroes
    const top5Heroes = sortedHeroes.slice(0, 5).map(entry => ({ heroName: entry[0], playCount: entry[1] }));
  
    return top5Heroes;
  }
  
  module.exports = { getTop3Heroes, getTop5HeroesAcrossPlayers };