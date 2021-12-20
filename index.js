const userInput = document.getElementById("user-input");
const button = document.getElementById("btn");
const spinner = document.getElementById("spinner");
const stockList = document.getElementById("stock-list");
const marqueeList = document.getElementById("marquee-list");

fetch(
  "https://financialmodelingprep.com/api/v3/stock/list?apikey=0c1eadac9f5255d60b21f8dd4e291026"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (let i = 0; i < 500; i++) {
      let newLi = document.createElement("li");
      newLi.innerHTML = `<li class="d-inline-flex me-3 fw-bold text-white">${data[i].symbol}<span class="ms-1 text-success fw-bold">${data[i].price}</span></li>`;
      marqueeList.appendChild(newLi);
    }
  });

spinner.classList.add("d-none");
button.addEventListener("click", function stockSearch() {
  spinner.classList.remove("d-none");
  fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${userInput.value}&limit=10&exchange=NASDAQ`
  )
    .then(function (response) {
      spinner.classList.add("d-none");
      return response.json();
    })
    .then(function (data) {
      stockList.innerHTML = `<ul id="stock-list"></ul>`;
      for (let i = 0; i < data.length; i++) {
        const liCompanyData = document.createElement("li");
        fetch(
          `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${data[i].symbol}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            if (data.profile.changesPercentage > 0) {
              liCompanyData.innerHTML = `<img src="${
                data.profile.image
              }" class="logo"> <li class="fs-5 d-inline-block p-1 mb-1"><a href="/company.html?symbol=${
                data.symbol
              }">${data.profile.companyName} (${
                data.symbol
              })</a></li>  <span class="text-success" id="stock-percent">(+${parseFloat(
                data.profile.changesPercentage
              ).toFixed(2)}%)</span>`;
            } else {
              liCompanyData.innerHTML = `<img src="${
                data.profile.image
              }" class="logo"> <li class="fs-5 d-inline-block p-1 mb-1"><a href="/company.html?symbol=${
                data.symbol
              }">${data.profile.companyName} (${
                data.symbol
              })</a></li>  <span class="text-danger" id="stock-percent">(${parseFloat(
                data.profile.changesPercentage
              ).toFixed(2)}%)</span>`;
            }
          });
        stockList.appendChild(liCompanyData);
      }
    });
});
