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

    if (predictions.results.length < 1) {
      const field = document.querySelector('input.inputIt');
      field.value = "";
      field.placeholder = "No location found, please try again.";
    }
    else {
      const firstResult = predictions.results[0]; //maybe add functionality to this
      const placeId = firstResult.place_id;
      const placeName = firstResult.name;
      const photoReference = firstResult.photos[0]; //need to do something if no photos
      const query = photoReference.photo_reference;
      const maxWidth = document.body.offsetWidth;
      const getPhoto = await fetch('/getPhotos/' + query + '/' + maxWidth); //returns a photo
      const thePhoto = await getPhoto.json();
      const myPhoto = thePhoto.photoUrl;
      const information = {
        id: placeId,
        name: placeName,
        photo: myPhoto //to change this once i query the picture
      };
      document.dispatchEvent(new CustomEvent('goToResults', {detail: information}));
    }
  }
}
