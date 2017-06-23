class App {
  constructor() {
    const homeScreen = document.querySelector(".homePage");
    this.home = new Home(homeScreen);

    const resultScreen = document.querySelector(".eventsPage");
    this.result = new Result(resultScreen);
    this.result.hide();

    this.goToResult = this.goToResult.bind(this);

    document.addEventListener('goToResults', this.goToResult);
  }

  goToResult(event) {
    this.home.hide();
    const info = event.detail;
    this.result.show(info);
  }
}
