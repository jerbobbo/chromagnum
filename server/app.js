var express = require('express');
var app = new express();
var path = require('path');

var watson = require('watson-developer-cloud');
var speech_to_text = watson.speech_to_text({
  username: 'dfbde444-a301-4795-a9c5-bd812d407560',
  password: 'pbfXTxfPmpMS',
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
});

speech_to_text.getModel({model_id:'en-US_BroadbandModel'}, function(err, model) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(model, null, 2));
});

app.use(express.static(path.join(__dirname, '../browser')));
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use('/', require(path.join(__dirname, './routes')));

var port = 8080 || process.env.PORT;
app.listen(8080, function() {
  console.log('listening on port ' + port);
});

module.exports = app;
