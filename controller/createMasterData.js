const fs = require('fs');
const axios = require('axios');

// Function to read data from players.json
function readPlayersData() {
  try {
    const playersData = fs.readFileSync('./config/players.json', 'utf-8');
    return JSON.parse(playersData);
  } catch (error) {
    console.error('Error reading players.json:', error.message);
    return null;
  }
}

// Function to read data from heroes.json
function readHeroesData() {
  try {
    const heroesData = fs.readFileSync('./config/heroes.json', 'utf-8');
    return JSON.parse(heroesData);
  } catch (error) {
    console.error('Error reading heroes.json:', error.message);
    return null;
  }
}

// Function to fetch recent matches for a player
async function fetchRecentMatches(accountId) {
  try {
    const response = await axios.get(`https://api.opendota.com/api/players/${accountId}/recentMatches`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recent matches for accountId ${accountId}:`, error.message);
    return null;
  }
}

// Function to fetch additional player information
async function fetchPlayerInfo(accountId) {
  try {
    const response = await axios.get(`https://api.opendota.com/api/players/${accountId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching player information for accountId ${accountId}:`, error.message);
    return null;
  }
}

// Main function to create MasterData
async function createMasterData() {
  // Read data from players.json
  const playersData = readPlayersData();

  if (!playersData) {
    console.error('Failed to read players data. Exiting...');
    return;
  }

  // Read data from heroes.json
  const heroesData = readHeroesData();

  if (!heroesData) {
    console.error('Failed to read heroes data. Exiting...');
    return;
  }

  // Organize player information by name
  const playerInfoByName = {};

  // Fetch recent matches and additional player information for each player
  await Promise.all(
    playersData.map(async (player) => {
      const recentMatches = await fetchRecentMatches(player.accountId);
      const playerInfo = await fetchPlayerInfo(player.accountId);

      // Add win/loss information to recentMatches
      const matchesWithResult = recentMatches.map(match => {
        const heroId = match.hero_id;
        const heroInfo = heroesData.find(hero => hero.id === heroId);

        // Determine the result (win or loss) based on conditions
        const result = (
          (match.player_slot < 100 && match.radiant_win) ||
          (match.player_slot >= 100 && !match.radiant_win)
        ) ? 'win' : 'loss';

        return { ...match, heroInfo, result };
      });

      playerInfoByName[player.name] = {
        ...player,
        recentMatches: matchesWithResult,
        playerInfo,
      };
    })
  );

  // Convert the playerInfoByName object to an array
  const playerInfoArray = Object.values(playerInfoByName);

  // Combine all data into a single object
  const MasterData = {
    players: playerInfoArray,
    heroes: heroesData,
    // Add more as needed
  };

  // Convert the combined data to JSON
  const jsonData = JSON.stringify(MasterData, null, 2);

  // Write JSON data to a file named MasterData.json
  fs.writeFileSync('./controller/MasterData.json', jsonData);

  console.log('master data created and saved to MasterData.json');
}

// Run the main function
createMasterData();
