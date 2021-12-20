class SearchForm {
  constructor(element) {
    this.element = element;
    this.input = "";
  }
  async createSymbol(symbolArr) {
    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.input}&limit=10&exchange=NASDAQ`
    );
    const data = await response.json();
    console.log(data, this.input);
    for (let i = 0; i < data.length; i++) {
      symbolArr[i] = data[i].symbol;
    }
  }
  async createData(dataArr, symbolArr) {
    for (let i = 0; i < symbolArr.length; i++) {
      const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbolArr[i]}`
      );
      const data = await response.json();
      dataArr[i] = data;
    }
  }
  async onSearch(callback) {
    const userInput = document.createElement("input");
    userInput.setAttribute("placeholder", "Company Name");
    userInput.setAttribute(
      "class",
      "form-control-sm d-flex border border-secondary border-2 w-100"
    );
    userInput.setAttribute("type", "search");
    userInput.setAttribute("id", "user-input");
    this.element.appendChild(userInput);
    const button = document.createElement("button");
    this.element.appendChild(button);
    button.setAttribute("id", "search-button");
    button.setAttribute("type", "submit");
    button.setAttribute(
      "class",
      "btn btn-primary d-flex ms-2 align-items-center"
    );
    button.innerHTML = `<span id="spinner" class="d-none spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Search`;
    const spinner = document.getElementById("spinner");
    const formData = this;

    button.addEventListener("click", async function () {
      formData.input = userInput.value;
      spinner.classList.remove("d-none");
      const symbolArr = [];
      const dataArr = [];
      console.log(this);
      await formData.createSymbol(symbolArr);
      await formData.createData(dataArr, symbolArr);
      callback(dataArr);
      spinner.classList.add("d-none");
    });
  }
}
