var request   = require('request'),
    util      = require('../util');
var _ = require("underscore");

// var jsonDataPath = require('../../test/used1r/dist/all.utf8.json');
var jsonDataPath = '../../test/used1r/dist/all.utf8.json';

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync(jsonDataPath, 'utf8'));

module.exports = function (param) {

  var filtered = _.where(obj, {itemURL: "nice"});
  // info.push('RAC番号　: ' + filtered['RAC番号']);


	var	channel		= param.channel,
		// endpoint	= param.commandConfig.endpoint.replace('{gem}', param.args[0]);
		endpoint	= param.commandConfig.endpoint.replace('{shopItemCode}', 'shopjapan%3A0010002632');
	console.log(endpoint);
	// console.log(jsonData);
	// console.log(obj);
	request(endpoint, function (err, response, body) {
		var info = [];
    info.push(' --- from rakuten API --- ');
		if (!err && response.statusCode === 200) {
      // console.log(response);
      
			// body = JSON.parse(body);
			body = JSON.parse(response.body);
			Items = body.Items;
      console.log(Items);
      console.log(Items[0]['Item']);
      Item = Items[0]['Item'];
			// Item = Items.Item;
      // console.log(body);
      // Items1 = JSON.parse(Items);
      console.log(Item);

      info.push('Count: ' + body.count + ' Hits: ' + body.hits + ' pageCount: ' + body.pageCount);
      info.push('itemUrl: ' + Item.itemUrl + ' itemCode: ' + Item.itemCode + ' itemPrice: ' + Item.itemPrice);
			// info.push('itemName   : ' + Items);
		}
		else {
			info = ['No such gem found!'];
		}
		util.postMessage(channel, info.join('\n'));
	});

};