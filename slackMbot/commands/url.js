var request = require('request'),
  util = require('../util');

const tool = require('../../exp/myTools');


var key = "AIzaSyB-bGjK9UsObQEgSm_qi8aUC7IhoGbdEBE";
// var gapi = require('gapi');
// gapi.server.setApiKey(key);

var google = require('googleapis');
// var urlshortener = google.urlshortener('v1');
var auth = key; // or you could use oauth2Client
var urlshortener = google.urlshortener({
  version: 'v1',
  auth: auth
});


///////////////////////// slackBot ///////////////////////////////////

module.exports = function (param) {
  var	channel		= param.channel;
  var urlDummy = "https://developers.google.com/apis-explorer/#search/urlshortener.url.insert/m/urlshortener/v1/urlshortener.url.insert?fields=id%252ClongUrl&_h=6&resource=%257B%250A++%2522longUrl%2522%253A+%2522https%253A%252F%252Fdevelopers.google.com%252Fapis-explorer%252F%2523search%252Furlshortener.url.insert%252Fm%252Furlshortener%252Fv1%252Furlshortener.url.insert%2522%250A%257D&";
  var url = "https://qiita.com/Sophick12224/items/d2b67dee8d283c37c826";
  var key = "AIzaSyB-bGjK9UsObQEgSm_qi8aUC7IhoGbdEBE";
  var apiUrl = "https://www.googleapis.com/urlshortener/v1/url?key=" + key;
  var argUrl = param.args[0]; // request URL
  // console.log(apiUrl);
  if (argUrl) {
    argUrl = argUrl.replace(/[\<\>]/g, "");
    argUrltmp = argUrl.split('|');
    argUrl=(argUrltmp[1])?argUrltmp[1]:argUrl;
    console.log(argUrl);
  } else {
    argUrl = urlDummy;
  }

  var auth = key; // or you could use oauth2Client
  var urlshortener = google.urlshortener({
    version: 'v1',
    auth: auth
  });

  var params = {
    resource: {
      'longUrl': argUrl
    }
  };


  // get the long url of a shortened url
  // urlshortener.url.get(params, function (err, response) {
  urlshortener.url.insert(params, function (err, response) {
    var info = [];
    if (err) {
      console.log('Encountered error!!', err);
      info.push('error : ', err);
    } else {
      console.log('Long url is bb ', response.data.longUrl);
      console.log('response.data ', response.data);
      info.push('URL短縮します request : \n' + response.data.longUrl);
      info.push('↓ URL短縮 なう ↓ result : \n' + response.data.id); // result short url
    }
    util.postMessage(channel, info.join('\n\n'));

  });




};