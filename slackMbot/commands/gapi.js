var request   = require('request'),
    util      = require('../util');

const tool = require('../../exp/myTools');

var url = "https://qiita.com/Sophick12224/items/d2b67dee8d283c37c826";
var key = "AIzaSyB-bGjK9UsObQEgSm_qi8aUC7IhoGbdEBE";
var apiUrl =  "https://www.googleapis.com/urlshortener/v1/url?key="+key;
// var apiUrl =  "https://www.googleapis.com/urlshortener/v1/url";
console.log(apiUrl);
tool.c(apiUrl);

var key = "AIzaSyB-bGjK9UsObQEgSm_qi8aUC7IhoGbdEBE";
// var gapi = require('gapi');
// gapi.server.setApiKey(key);

var google = require('googleapis');
// var urlshortener = google.urlshortener('v1');
var auth = key ; // or you could use oauth2Client
var urlshortener = google.urlshortener({ version: 'v1', auth: auth });

var params = {
  shortUrl: 'http://goo.gl/xKbRu3'
};

// get the long url of a shortened url
urlshortener.url.get(params, function (err, response) {
  if (err) {
    console.log('Encountered error', err);
  } else {
    console.log('Long url is', response.longUrl);
  }
});


  
  ///////////////////////// slackBot ///////////////////////////////////

module.exports = function (param) {
  // var url = "http://phi-jp.github.io/runstant/release/alpha/#UEsDBAoAAAAAAAh3/0QFmPrFFgMAABYDAAAEAAAAZGF0YXsidmVyc2lvbiI6IjAuMC4xIiwiY3VycmVudCI6Imh0bWwiLCJzZXR0aW5nIjp7InRpdGxlIjoiQm9va21hcmtsZXQiLCJkZXRhaWwiOiLjg5bjg4Pjgq/jg57jg7zjgq/jg6zjg4Pjg4jjgoJSdW5zdGFudOOBquOCieewoeWNmOOBq++8gSJ9LCJjb2RlIjp7Imh0bWwiOnsidHlwZSI6Imh0bWwiLCJ2YWx1ZSI6IjwhRE9DVFlQRSBodG1sPlxuIFxuPGh0bWw+XG4gICAgPGhlYWQ+XG4gICAgICAgIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiIC8+XG4gICAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIHVzZXItc2NhbGFibGU9bm9cIiAvPlxuICAgICAgICA8bWV0YSBuYW1lPVwiYXBwbGUtbW9iaWxlLXdlYi1hcHAtY2FwYWJsZVwiIGNvbnRlbnQ9XCJ5ZXNcIiAvPlxuICAgICAgICA8dGl0bGU+JHt0aXRsZX08L3RpdGxlPlxuICAgICAgICA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PVwiJHtkZXNjcmlwdGlvbn1cIiAvPlxuICAgIDwvaGVhZD5cbiAgICA8Ym9keT5cbiAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6d2luZG93LnByb21wdCgnJywnLSBbJytkb2N1bWVudC50aXRsZSsnXScgKycoJysgbG9jYXRpb24uaHJlZisnKScpO3ZvaWQoMCk7XCI+R2V0TWQ8L2E+XG4gICAgPC9ib2R5PlxuPC9odG1sPiJ9LCJzdHlsZSI6eyJ0eXBlIjoiY3NzIiwidmFsdWUiOiJib2R5IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyO1xufSJ9LCJzY3JpcHQiOnsidHlwZSI6ImphdmFzY3JpcHQiLCJ2YWx1ZSI6IiJ9fX1QSwECFAAKAAAAAAAIdv9EBZj6xRYDAAAWAwAABAAAAAAAAAAAAAAAAAAAAAAAZGF0YVBLBQYAAAAAAQABADIAAAA4AwAAAAA=";
  var url = "https://qiita.com/Sophick12224/items/d2b67dee8d283c37c826";
  var key = "AIzaSyB-bGjK9UsObQEgSm_qi8aUC7IhoGbdEBE";
  var apiUrl =  "https://www.googleapis.com/urlshortener/v1/url?key="+key;
  // console.log(apiUrl);
  console.log(param.args[0]);
  var argUrl =param.args[0];
  argUrl =argUrl.replace(/[\<\>]/g,"");
  // argUrl = argUrl.split('\<');
  // argUrl = argUrl[1];
  // argUrl = argUrl.split('\>');
  // argUrl = argUrl[1];
console.log(argUrl);

  var auth = key ; // or you could use oauth2Client
var urlshortener = google.urlshortener({ version: 'v1', auth: auth });

var params = {
  resource: {'longUrl': argUrl}
  // shortUrl: 'http://goo.gl/xKbRu3'
  // longUrl: 'https://developers.google.com/apis-explorer/#search/urlshortener.url.insert/m/urlshortener/v1/urlshortener.url.insert?fields=id%252ClongUrl&_h=6&resource=%257B%250A++%2522longUrl%2522%253A+%2522https%253A%252F%252Fdevelopers.google.com%252Fapis-explorer%252F%2523search%252Furlshortener.url.insert%252Fm%252Furlshortener%252Fv1%252Furlshortener.url.insert%2522%250A%257D&'
};


// get the long url of a shortened url
// urlshortener.url.get(params, function (err, response) {
urlshortener.url.insert(params, function (err, response) {
  if (err) {
    console.log('Encountered error!!', err);
  } else {
    console.log('Long url is bb ', response.data.longUrl);
    console.log('response ', response.data);
  }
});


  // var options = {
  //     url: apiUrl,
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     json: true,
  //     body: JSON.stringify({
  //       longUrl: url
  //     })
  // };
  
  // request.post(options, function(error, response, body) {
	// 	var info = [];
  //     if (!error && response.statusCode == 200) {
  //         spawn("cmd", ["/C", "start " + body.id]);
  //     } else {
  //         console.log('error: ' + response.statusCode);
  //         info.push('code: ' + response.statusCode);
  //         info.push('status: ' + response.statusMessage);
  //       }
  //     util.postMessage(channel, info.join('\n\n'));
  //   });


	var	channel		= param.channel,
		endpoint	= param.commandConfig.endpoint.replace('{gem}', param.args[0]);
	console.log(endpoint);
	// console.log(jsonData);
	// console.log(obj);
	request(endpoint, function (err, response, body) {
		var info = [];
		if (!err && response.statusCode === 200) {
			body = JSON.parse(body);
			info.push('Gem: ' + body.name + ' - ' + body.info);
			info.push('Authors: ' + body.authors);
			info.push('Project URI: ' + body.project_uri);
		}
		else {
			info = ['No such gem found!'];
		}
		util.postMessage(channel, info.join('\n\n'));
	});

};
