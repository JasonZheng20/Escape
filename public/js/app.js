class App {
  constructor() {
    const homeScreen = document.querySelector(".homePage");
    this.home = new Home(homeScreen);

    const resultScreen = document.querySelector(".eventsPage");
    this.result = new Result(resultScreen);
    this.result.hide();

    this.goToResult = this.goToResult.bind(this);
    this.goHome = this.goHome.bind(this);

    document.addEventListener('goToResults', this.goToResult);
    document.addEventListener('goHome', this.goHome);
  }

  goToResult(event) {
    this.home.hide();
    const info = event.detail;
    this.result.show(info);
  }

  goHome() {
    this.result.hide();
    this.home.show();
  }
}
