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
  res.json(predicObj);
}
app.get('/getData/:query', getLocationData);

async function getPhotoData(req, res) {
  const queryRoute = req.params.query;
  const maxWidth = req.params.maxWidth;
  const photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=' + maxWidth + '&photoreference=' + queryRoute + '&key=' + key;
  res.json({photoUrl: photo});
}
app.get('/getPhotos/:query/:maxWidth', getPhotoData);

async function getWikiData(req, res) { //&list=geosearch
  const queryRoute = req.params.query;
  const wikiArticle = await fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exsentences=2&explaintext&titles=' + queryRoute);
  const wikiObj = await wikiArticle.json();
  console.log(wikiObj);
  res.json(wikiObj);
}
app.get('/getWiki/:query', getWikiData);

//------------------------------------------------------------------port binding

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
