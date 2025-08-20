document.getElementById("duelForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const ticker1 = document.getElementById("ticker1").value.toUpperCase();
  const ticker2 = document.getElementById("ticker2").value.toUpperCase();

  const ratios = [
    "ROA", "ROE", "Net Margin", "Gross Margin", "Operating Margin",
    "Current Ratio", "Quick Ratio", "Cash Ratio",
    "Debt-to-Equity", "Interest Coverage",
    "Asset Turnover", "Inventory Turnover", "Receivables Turnover",
    "P/E Ratio", "P/B Ratio"
  ];

  const dummyData = () => ratios.map(r => ({ name: r, value: Math.random() * 100 }));

  const data1 = dummyData();
  const data2 = dummyData();

  let score1 = 0, score2 = 0;

  const list1 = document.getElementById("ratios1");
  const list2 = document.getElementById("ratios2");
  list1.innerHTML = "";
  list2.innerHTML = "";

  data1.forEach((r1, i) => {
    const r2 = data2[i];
    const better = r1.value > r2.value ? 1 : r1.value < r2.value ? 2 : 0;
    if (better === 1) score1++;
    else if (better === 2) score2++;

    list1.innerHTML += `<li>${r1.name}: ${r1.value.toFixed(2)}</li>`;
    list2.innerHTML += `<li>${r2.name}: ${r2.value.toFixed(2)}</li>`;
  });

  document.getElementById("logo1").src = `https://logo.clearbit.com/${ticker1}.com`;
  document.getElementById("logo2").src = `https://logo.clearbit.com/${ticker2}.com`;

  document.getElementById("name1").textContent = `${ticker1} (${score1} pts)`;
  document.getElementById("name2").textContent = `${ticker2} (${score2} pts)`;

  document.getElementById("results").classList.remove("hidden");
});
