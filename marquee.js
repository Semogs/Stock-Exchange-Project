const marqueeList = document.getElementById("marquee-list");

class Marquee {
  constructor(element) {
    this.element = element;
    this.marqueeCreator();
  }
  async marqueeCreator() {
    const response = await fetch(
      "https://financialmodelingprep.com/api/v3/stock/list?apikey=0c1eadac9f5255d60b21f8dd4e291026"
    );
    const data = await response.json();
    for (let i = 0; i < 500; i++) {
      const marqueeLi = document.createElement("li");
      marqueeLi.innerHTML = `<li class="d-inline-flex me-3 fw-bold text-white">${data[i].symbol}<span class="ms-1 text-success fw-bold">${data[i].price}</span></li>`;
      this.element.appendChild(marqueeLi);
    }
  }
}

const newMarquee = new Marquee(marqueeList);
