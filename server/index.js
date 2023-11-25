const express = require('express');
const cors = require('cors');
const topHeroes = require('./../routes/topHeroes'); // Adjust the path accordingly
const statistics = require('./../routes/statistics'); // Import the statistics module
const masterData = require('./../controller/masterData');

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

// Your existing top3heroes endpoint
app.get('/top3heroes', (req, res) => {
  const top3HeroesArray = topHeroes.getTop3Heroes(masterData);
  res.json(top3HeroesArray);
});

// New endpoint for top 5 heroes across players
app.get('/top5heroes', (req, res) => {
  const top5HeroesArray = topHeroes.getTop5HeroesAcrossPlayers(masterData);
  res.json(top5HeroesArray);
});

// New endpoint for player statistics
app.get('/getPlayerTotals', (req, res) => {
  const totalKillsByPlayer = statistics.getPlayerTotals(masterData);
  res.json(totalKillsByPlayer);
});

// New endpoint for player statistics
app.get('/getPlayerAverages', (req, res) => {
  const totalKillsByPlayer = statistics.getPlayerAverages(masterData);
  res.json(totalKillsByPlayer);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
