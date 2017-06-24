class Result {
  constructor(resultScreen) {
    this.resultScreen = resultScreen;

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.returnToHome = this.returnToHome.bind(this);

    document.querySelector('.backButton').addEventListener('click', this.returnToHome);
  }

  hide() {
    this.resultScreen.classList.add("inactive");
  }

  show(info) {
    this.resultScreen.classList.remove("inactive");
    this.resultScreen.querySelector(".locationTitle").textContent = info.name; //change text size if it is too big
    this.resultScreen.querySelector("#under").textContent = info.geographic; //change text size if it is too big
    this.resultScreen.querySelector(".picHalf").style.backgroundImage = "url('" + info.photo + "')";
    if (info.description.length > 0) {
      this.resultScreen.querySelector(".About").textContent = "About";
      this.resultScreen.querySelector(".AboutText").textContent = info.description;
    }
  }

  returnToHome() {
    document.dispatchEvent(new CustomEvent('goHome'));
  }
}
