const express = require('express');
var fetch = require('node-fetch');

const app = express();
app.use(express.static('public'));

const key = 'AIzaSyA54jCXmz_gm0MQ2SaYvkqWx04WaE7dWVI';
//---------------------------------------------------------server configurations

// var cors = require('cors')
//
// var app = express()
// app.use(cors())

//---------------------------------------------------------------server requests

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

async function onGet(req, res) {
  const routeParams = req.params;
  const queryRoute = routeParams.query;

  const predictions = await fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + queryRoute + '&language=en&types=(cities)&key=' + key);

  const predicObj = await predictions.json();
  console.log(predicObj);
  // const predicObj = [queryRoute];

  res.json(predicObj);
}
app.get('/getData/:query', onGet);

//------------------------------------------------------------------port binding

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});
