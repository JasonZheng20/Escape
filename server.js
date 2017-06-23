//---------------------------------------------------------server configurations
const express = require('express');
var fetch = require('node-fetch');

const app = express();
app.use(express.static('public'));

const key = 'AIzaSyA54jCXmz_gm0MQ2SaYvkqWx04WaE7dWVI';

//---------------------------------------------------------------server requests

async function getLocationData(req, res) {
  const routeParams = req.params;
  const queryRoute = routeParams.query;
  // const predictions = await fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + queryRoute + '&language=en&types=(cities)&key=' + key);
  // const predicObj = await predictions.json();
  predicObj = {predictions: [{description: 'Tokyo, Japan', place_id: 'myplaceId', reference: 'myReference'}], status: 'OK'}; //change this back when testing is done
  res.json(predicObj);
}
app.get('/getData/:query', getLocationData);

//------------------------------------------------------------------port binding

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
