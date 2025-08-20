
const form = document.getElementById('duelForm');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const ticker1 = document.getElementById('ticker1').value.toUpperCase();
  const ticker2 = document.getElementById('ticker2').value.toUpperCase();
  const periods = ['YTD', '1Y', '3Y', '5Y'];
  const today = new Date();

  const getDate = (yearsAgo = 0) => {
    const d = new Date(today);
    d.setFullYear(d.getFullYear() - yearsAgo);
    return d.toISOString().split('T')[0];
  };

  const getPrice = async (ticker, date) => {
    const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?from=${date}&to=${date}&apikey=demo`;
    const res = await fetch(url);
    const data = await res.json();
    return data.historical?.[0]?.adjClose || null;
  };

  const calculateReturns = async (ticker) => {
    const currentDate = today.toISOString().split('T')[0];
    const currentPrice = await getPrice(ticker, currentDate);
    const returns = {};
    for (let y of [0, 1, 3, 5]) {
      const pastDate = getDate(y);
      const pastPrice = await getPrice(ticker, pastDate);
      if (currentPrice && pastPrice) {
        returns[periods[y]] = ((currentPrice - pastPrice) / pastPrice * 100).toFixed(2);
      } else {
        returns[periods[y]] = 'N/A';
      }
    }
    return returns;
  };

  const r1 = await calculateReturns(ticker1);
  const r2 = await calculateReturns(ticker2);

  let score1 = 0, score2 = 0;
  let html = `<div class='scorecard'>`;
  html += `<div class='stock'><img src='https://storage.googleapis.com/iex/api/logos/${ticker1}.png' class='logo'><h2>${ticker1}</h2><ul>`;
  for (let p of periods) {
    const val1 = r1[p];
    const val2 = r2[p];
    if (val1 !== 'N/A' && val2 !== 'N/A') {
      if (+val1 > +val2) { score1++; html += `<li>${p}: ${val1}% ✅</li>`; }
      else if (+val2 > +val1) { html += `<li>${p}: ${val1}% ❌</li>`; }
      else { html += `<li>${p}: ${val1}% 🤝</li>`; }
    } else {
      html += `<li>${p}: N/A</li>`;
    }
  }
  html += `</ul></div>`;

  html += `<div class='stock'><img src='https://storage.googleapis.com/iex/api/logos/${ticker2}.png' class='logo'><h2>${ticker2}</h2><ul>`;
  for (let p of periods) {
    const val1 = r1[p];
    const val2 = r2[p];
    if (val1 !== 'N/A' && val2 !== 'N/A') {
      if (+val2 > +val1) { score2++; html += `<li>${p}: ${val2}% ✅</li>`; }
      else if (+val1 > +val2) { html += `<li>${p}: ${val2}% ❌</li>`; }
      else { html += `<li>${p}: ${val2}% 🤝</li>`; }
    } else {
      html += `<li>${p}: N/A</li>`;
    }
  }
  html += `</ul></div></div>`;

  const winner = score1 > score2 ? ticker1 : score2 > score1 ? ticker2 : 'Draw';
  html += `<h2>Winner: ${winner}</h2>`;
  resultsDiv.innerHTML = html;
});
