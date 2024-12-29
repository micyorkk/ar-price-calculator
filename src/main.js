import Chart from 'chart.js/auto';

const apiUrl = "https://api.coingecko.com/api/v3/simple/price?ids=arweave&vs_currencies=usd";
const historicalApiUrl = "https://api.coingecko.com/api/v3/coins/arweave/market_chart?vs_currency=usd&days=7";

const priceElement = document.getElementById('price');
const resultElement = document.getElementById('result');
const convertBtn = document.getElementById('convert-btn');
const arAmountInput = document.getElementById('ar-amount');

// Fetch Current Price
async function fetchCurrentPrice() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  const price = data.arweave.usd;
  priceElement.textContent = `$${price}`;
  return price;
}

// Fetch Historical Data
async function fetchHistoricalData() {
  const response = await fetch(historicalApiUrl);
  const data = await response.json();
  return data.prices.map(entry => ({
    time: new Date(entry[0]).toLocaleDateString(),
    price: entry[1],
  }));
}

// Render Chart
async function renderChart() {
  const historicalData = await fetchHistoricalData();
  const ctx = document.getElementById('price-chart').getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: historicalData.map(entry => entry.time),
      datasets: [{
        label: 'AR Price (USD)',
        data: historicalData.map(entry => entry.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      }]
    },
    options: {
      responsive: true,
    }
  });
}

// Convert AR to USD
convertBtn.addEventListener('click', async () => {
  const arAmount = parseFloat(arAmountInput.value);
  const currentPrice = await fetchCurrentPrice();
  if (!isNaN(arAmount)) {
    resultElement.textContent = `Result: $${(arAmount * currentPrice).toFixed(2)}`;
  } else {
    resultElement.textContent = "Please enter a valid number.";
  }
});

// Initialize App
fetchCurrentPrice();
renderChart();
