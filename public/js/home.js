class Home {
  constructor(homeScreen) {
    this.homeScreen = homeScreen;

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }

  hide() {
    this.homeScreen.classList.add("inactive");
  }

  show() {
    this.homeScreen.classList.remove("inactive");
  }
}
