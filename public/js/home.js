class Home {
  constructor(homeScreen) {
    this.homeScreen = homeScreen;
    this.form = this.homeScreen.querySelector("form");

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.fetch = this.fetch.bind(this);
    this.onResponse = this.onResponse.bind(this);
    this.sendInfo = this.sendInfo.bind(this);

    this.form.addEventListener('submit', this.fetch);
  }

  hide() {
    this.homeScreen.classList.add("inactive");
  }

  show() {
    this.homeScreen.classList.remove("inactive");
  }

  onResponse(response) {
    return response.json();
  }

  fetch(event) {
    event.preventDefault();
    const inputString = document.querySelector('input.inputIt').value;
    const query = encodeURIComponent(inputString);
    const key = 'AIzaSyA54jCXmz_gm0MQ2SaYvkqWx04WaE7dWVI';
    fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + query + '&language=en&types=(cities)&key=' + key).then(this.onResponse).then(this.sendInfo);
    console.log(inputString);
    //if it isn't a place, then show error message
    //if it is a place then yeet
  }

  sendInfo(json) {
    if (json.status != "OK") {
      console.log("not ok");
      //demand requery
    }
    else {
      console.log(json);
    }
  }
}
