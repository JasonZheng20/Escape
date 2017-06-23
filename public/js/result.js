class Result {
  constructor(resultScreen) {
    this.resultScreen = resultScreen;

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }

  hide() {
    this.resultScreen.classList.add("inactive");
  }

  show() {
    this.resultScreen.classList.remove("inactive");
  }
}
