const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get("symbol");
const companyImg = document.getElementById("company-img");
const companyName = document.getElementById("company-name");
const companyDesc = document.getElementById("company-desc");
const companyLink = document.getElementById("company-link");
const stockPrice = document.getElementById("stock-price");
const stockPercent = document.getElementById("stock-percent");
const spinnerCompanyPage = document.getElementById("spinner-company");
const bottomChart = document.getElementById("myChart");
const companyContainer = document.getElementById("company-container");
const chartDataUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;
const stockDates = [];
const closePrice = [];

spinnerCompanyPage.classList.remove("d-none");
bottomChart.classList.add("d-none");
fetch(
  `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    companyImg.src = data.profile.image;
    companyName.innerText = data.profile.companyName;
    companyDesc.innerText = data.profile.description;
    companyLink.innerHTML = `<div class="d-flex mb-5 mt-4 justify-content-center fs-5" id="company-link"><a href="${data.profile.website}">${data.profile.companyName}</a></div>`;
    stockPrice.innerText = `Stock price: $${data.profile.price}`;
    if (data.profile.changesPercentage > 0) {
      stockPercent.innerHTML = `<span class="text-success" id="stock-percent">(+${parseFloat(
        data.profile.changesPercentage
      ).toFixed(2)}%)</span>`;
    } else {
      stockPercent.innerHTML = `<span class="text-danger" id="stock-percent">(${parseFloat(
        data.profile.changesPercentage
      ).toFixed(2)}%)</span>`;
    }
  });

getChart(chartDataUrl);

async function getStockData(url) {
  const response = await fetch(url);
  const data = await response.json();
  spinnerCompanyPage.classList.add("d-none");
  bottomChart.classList.remove("d-none");
  for (let i = 0; i < data.historical.length; i++) {
    stockDates[i] = data.historical[data.historical.length - i - 1].date;
    closePrice[i] = data.historical[data.historical.length - i - 1].close;
  }
}

async function getChart(url) {
  await getStockData(url);
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Stock Price History",
          data: closePrice,
          backgroundColor: ["rgba(120, 81, 169, 1)"],
          borderColor: ["rgba(120, 81, 169, 1)"],
          pointHoverBackgroundColor: ["rgba(255, 165, 0, 1)"],
          borderWidth: 1,
          fill: true,
          pointRadius: 0,
        },
      ],
    },
  });
}
