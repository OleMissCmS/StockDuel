
document.getElementById("duelForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const ticker1 = document.getElementById("ticker1").value.toUpperCase();
  const ticker2 = document.getElementById("ticker2").value.toUpperCase();

  // Simulated return values (replace with real scraping logic or proxy API)
  const returns = {
    [ticker1]: { YTD: 12.5, "1Y": 18.2, "3Y": 45.1, "5Y": 90.3 },
    [ticker2]: { YTD: 10.1, "1Y": 20.4, "3Y": 40.0, "5Y": 85.0 }
  };

  let score1 = 0, score2 = 0;
  const periods = ["YTD", "1Y", "3Y", "5Y"];
  const scores1 = [], scores2 = [];

  periods.forEach(period => {
    const r1 = returns[ticker1][period];
    const r2 = returns[ticker2][period];
    if (r1 > r2) {
      score1++;
      scores1.push(`${period}: ${r1}% ✅`);
      scores2.push(`${period}: ${r2}% ❌`);
    } else if (r2 > r1) {
      score2++;
      scores1.push(`${period}: ${r1}% ❌`);
      scores2.push(`${period}: ${r2}% ✅`);
    } else {
      scores1.push(`${period}: ${r1}% 🤝`);
      scores2.push(`${period}: ${r2}% 🤝`);
    }
  });

  const winner = score1 > score2 ? ticker1 : score2 > score1 ? ticker2 : "Draw";

  document.getElementById("results").innerHTML = `
    <div class='scorecard'>
      <div class='stock'>
        <h2>${ticker1}</h2>
        <ul>${scores1.map(s => `<li>${s}</li>`).join('')}</ul>
      </div>
      <div class='stock'>
        <h2>${ticker2}</h2>
        <ul>${scores2.map(s => `<li>${s}</li>`).join('')}</ul>
      </div>
    </div>
    <h2>Winner: ${winner}</h2>
  `;
});
