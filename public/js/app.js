class App {
  constructor() {
    // console.log("constructed app");
    const homeScreen = document.querySelector(".homePage");
    this.home = new Home(homeScreen);

    const resultScreen = document.querySelector(".eventsPage");
    this.result = new Result(resultScreen);
    this.result.hide();

    this.goToResult = this.goToResult.bind(this);
  }

  goToResult() {
    this.home.hide();
    this.result.show();
  }
}
