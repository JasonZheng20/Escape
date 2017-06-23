//---------------------------------------------------------server configurations
const express = require('express');
var fetch = require('node-fetch');

const app = express();
app.use(express.static('public'));

const key = 'AIzaSyA54jCXmz_gm0MQ2SaYvkqWx04WaE7dWVI';

//---------------------------------------------------------------server requests

async function getLocationData(req, res) {
  const queryRoute = req.params.query;
  const predictions = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?input=' + queryRoute + '&language=en&types=(regions)&key=' + key);
  const predicObj = await predictions.json();
  // predicObj = {predictions: [{description: 'Tokyo, Japan', place_id: 'myplaceId', reference: 'myReference'}], status: 'OK'}; //change this back when testing is done
  res.json(predicObj);
}
app.get('/getData/:query', getLocationData);

async function getPhotoData(req, res) {
  console.log('ran photo fetch func');
  const queryRoute = req.params.query;
  const maxWidth = req.params.maxWidth;
  // const photo = 'https://maps.googleapis.com/map/api/place/photo?maxwidth=' + maxWidth + '&photoreference=' + queryRoute + '&key=' + key;
  const photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=' + key;
  console.log(photo);
  res.json({photoUrl: photo});
}
app.get('/getPhotos/:query/:maxWidth', getPhotoData);

//------------------------------------------------------------------port binding

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
