class SearchResult {
  constructor(htmlElement) {
    this.htmlElement = htmlElement;
  }

  markedText(str) {
    return `<span style="background-color: yellow">${str}</span>`;
  }

  renderCompanyData(company, newCompanyName, newSymbolName, spanClass) {
    return `<img src="${
      company.profile.image
    }" class="logo"> <li class="fs-5 d-inline-block p-1 mb-1"><a href="/company.html?symbol=${
      company.symbol
    }">${newCompanyName} (${newSymbolName})</a></li>  <span class="${spanClass}" id="stock-percent">(+${parseFloat(
      company.profile.changesPercentage
    ).toFixed(2)}%)</span>`;
  }

  renderResults(companies) {
    stockList.innerHTML = `<ul id="stock-list"></ul>`;
    for (let i = 0; i < companies.length; i++) {
      const CompanyLi = document.createElement("li");
      const searched = document.getElementById("user-input").value;
      if (searched !== "") {
        const regex = new RegExp(searched, "i");
        const newCompanyName = companies[i].profile.companyName.replace(
          regex,
          this.markedText
        );
        const newSymbolName = companies[i].symbol.replace(
          regex,
          this.markedText
        );
        if (companies[i].profile.changesPercentage > 0) {
          CompanyLi.innerHTML = this.renderCompanyData(
            companies[i],
            newCompanyName,
            newSymbolName,
            "text-success"
          );
        } else {
          CompanyLi.innerHTML = this.renderCompanyData(
            companies[i],
            newCompanyName,
            newSymbolName,
            "text-danger"
          );
        }
        const compareButton = document.createElement("button");
        compareButton.setAttribute(
          "class",
          "btn btn-primary d-inline-block ms-5"
        );
        compareButton.setAttribute("id", "compare-btn");
        compareButton.innerText = "Compare";
        CompanyLi.appendChild(compareButton);
      }
      stockList.appendChild(CompanyLi);
    }
  }
}
