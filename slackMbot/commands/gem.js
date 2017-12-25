var request   = require('request'),
    util      = require('../util');
var _ = require("underscore");

// var jsonDataPath = require('../../test/used1r/dist/all.utf8.json');
var jsonDataPath = '../../test/used1r/dist/all.utf8.json';

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync(jsonDataPath, 'utf8'));

module.exports = function (param) {

  var filtered = _.where(obj, {itemURL: "nice"});
  console.log(filtered);
  var filtered = _.where(obj, {itemURL: "crff"});
  console.log(filtered);
  console.log(filtered.itemURL);
  console.log(filtered.itemName);


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