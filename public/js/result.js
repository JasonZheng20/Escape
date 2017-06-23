class Result {
  constructor(resultScreen) {
    this.resultScreen = resultScreen;

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }

  hide() {
    this.resultScreen.classList.add("inactive");
  }

  show(info) {
    this.resultScreen.classList.remove("inactive");
    this.resultScreen.querySelector(".locationTitle").textContent = info.name;
    this.resultScreen.querySelector(".picHalf").style.backgroundImage = "url('" + info.photo + "')";
  }
}
