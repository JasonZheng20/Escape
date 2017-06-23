class Home {
  constructor(homeScreen) {
    this.homeScreen = homeScreen;
    this.form = this.homeScreen.querySelector("form");

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.fetch = this.fetch.bind(this);

    this.form.addEventListener('submit', this.fetch);
  }

  hide() {
    this.homeScreen.classList.add("inactive");
  }

  show() {
    this.homeScreen.classList.remove("inactive");
  }

  async fetch(event) {
    event.preventDefault();
    const inputString = document.querySelector('input.inputIt').value;
    const query = encodeURIComponent(inputString);
    const info = await fetch('/getData/' + query);
    const predictions = await info.json();
    console.log(predictions);
    if (predictions.status != "OK") {
      const field = document.querySelector('input.inputIt');
      field.value = "";
      field.placeholder = "No location found, please try again.";
    }
    else {
      const firstResult = predictions.predictions[0];
      const placeId = firstResult.place_id;
      const placeName = firstResult.description;
      const photoReference = firstResult.reference;

      const information = {
        id: placeId,
        name: placeName,
        photoArray: photoReference //to change this once i query the pictures
      };
      document.dispatchEvent(new CustomEvent('goToResults', {detail: information}));
      //send a custom event sendInfo
      //send another request to get photo

      // console.log(this.placeId);
      // console.log(this.placeName);
      // console.log(this.photoReference);
    }

    //if it isn't a place, then show error message
    //if it is a place then yeet
      //0. if multiple, create a list
      //1. type out the name
      //2. get photos
      //3. get description
      //4. get weather
      //5. get nearby landmarks
  }
}
