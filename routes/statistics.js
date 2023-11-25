// statistics.js

function getPlayerTotals(masterData) {
  const playerStats = {};

  masterData.players.forEach(player => {
    const playerName = player.playerInfo.profile.personaname;

    const totals = player.recentMatches.reduce(
      (accumulator, match) => {
        accumulator.killsTotal += match.kills || 0;
        accumulator.deathsTotal += match.deaths || 0;
        accumulator.assistsTotal += match.assists || 0;
        accumulator.heroDamageTotal += match.hero_damage || 0;
        accumulator.towerDamageTotal += match.tower_damage || 0;
        accumulator.heroHealingTotal += match.hero_healing || 0;
        accumulator.lastHitsTotal += match.last_hits || 0;

        return accumulator;
      },
      {
        killsTotal: 0,
        deathsTotal: 0,
        assistsTotal: 0,
        heroDamageTotal: 0,
        towerDamageTotal: 0,
        heroHealingTotal: 0,
        lastHitsTotal: 0,
      }
    );

    playerStats[playerName] = totals;
  });

  return playerStats;
}


// statistics.js

function getPlayerAverages(masterData) {
  const playerAverages = {};

  masterData.players.forEach(player => {
    const playerName = player.playerInfo.profile.personaname;

    const totals = player.recentMatches.reduce(
      (accumulator, match) => {
        accumulator.killsTotal += match.kills || 0;
        accumulator.deathsTotal += match.deaths || 0;
        accumulator.assistsTotal += match.assists || 0;
        accumulator.heroDamageTotal += match.hero_damage || 0;
        accumulator.towerDamageTotal += match.tower_damage || 0;
        accumulator.heroHealingTotal += match.hero_healing || 0;
        accumulator.lastHitsTotal += match.last_hits || 0;
        accumulator.goldPerMinTotal += match.gold_per_min || 0;
        accumulator.xpPerMinTotal += match.xp_per_min || 0;

        return accumulator;
      },
      {
        killsTotal: 0,
        deathsTotal: 0,
        assistsTotal: 0,
        heroDamageTotal: 0,
        towerDamageTotal: 0,
        heroHealingTotal: 0,
        lastHitsTotal: 0,
        goldPerMinTotal: 0,
        xpPerMinTotal: 0,
      }
    );

    const numMatches = player.recentMatches.length || 1; // Avoid division by zero
    const averages = {
      killsAverage: totals.killsTotal / numMatches,
      deathsAverage: totals.deathsTotal / numMatches,
      assistsAverage: totals.assistsTotal / numMatches,
      heroDamageAverage: totals.heroDamageTotal / numMatches,
      towerDamageAverage: totals.towerDamageTotal / numMatches,
      heroHealingAverage: totals.heroHealingTotal / numMatches,
      lastHitsAverage: totals.lastHitsTotal / numMatches,
      goldPerMinAverage: totals.goldPerMinTotal / numMatches,
      xpPerMinAverage: totals.xpPerMinTotal / numMatches,
    };

    playerAverages[playerName] = averages;
  });

  return playerAverages;
}


module.exports = { getPlayerTotals,getPlayerAverages };
