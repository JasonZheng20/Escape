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

    //---------------------------------------------------------------Google Part

    const query = encodeURIComponent(inputString);
    // const info = await fetch('/getData/' + query);
    // const predictions = await info.json();
    // console.log(predictions);
    //
    // if (predictions.status != "OK") {
    //   const field = document.querySelector('input.inputIt');
    //   field.value = "";
    //   field.placeholder = "No location found, please try again.";
    // }
    // else {
    //   const firstResult = predictions.results[0]; //maybe add functionality to this
    //   const placeId = firstResult.place_id;
    //   const placeName = firstResult.name;
    //   // if (firstResult.photos.length < 1) {
    //     //get prefecture photos, save that photo as photoReference
    //   // }
    //   // else {
    //     const photoReference = firstResult.photos[0]; //need to do something if no photos, if no photo get prefecture photo
    //   // }
    //   const query = photoReference.photo_reference;
    //   const maxWidth = document.body.offsetWidth;
    //   const getPhoto = await fetch('/getPhotos/' + query + '/' + maxWidth); //returns a photo
    //   const thePhoto = await getPhoto.json();
    //   const myPhoto = thePhoto.photoUrl;
    //   const geoLoc = firstResult.formatted_address;

      //----------------------------------------------------------Wikipedia Part

      // const wikiQuery = encodeURIComponent(placeName); //NORMALLY USE THIS ONE
      const wikiQuery = query;
      const wiki = await fetch('/getWiki/' + wikiQuery);
      const wikiJson = await wiki.json();
      const extractTextObj = wikiJson.query.pages;
      for (const mapKey in extractTextObj) {
        this.finalText = extractTextObj[mapKey].extract; //maybe shorten it to two to three sentences
        console.log(this.finalText);
      }

      //--------------------------------------------------------Information send
      const information = {
        // id: placeId,
        // name: placeName,
        // photo: myPhoto,
        // geographic: geoLoc
        description: this.finalText
      };
      document.dispatchEvent(new CustomEvent('goToResults', {detail: information}));
      const field = document.querySelector('input.inputIt');
      field.value = "";
      field.placeholder = "Enter a City or Town to start!";
    // }
  }
}
