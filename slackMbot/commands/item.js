var request   = require('request'),
    util      = require('../util');
var _ = require("underscore");

// var jsonDataPath = require('../../test/used1r/dist/all.utf8.json');
var jsonDataPath = '../../test/used1r/dist/all.utf8.json';

var fs = require('fs');
var jsonData = JSON.parse(fs.readFileSync(jsonDataPath, 'utf8'));

module.exports = function (param) {

  // var filtered = _.where(obj, {itemURL: "nice"});
  // console.log(filtered);
  var filtered = _.where(jsonData, {itemURL: param.args[0]});
  // console.log(filtered);

  console.log(filtered.itemURL);
  console.log(filtered.itemNo);
  console.log(filtered.price);
	var	channel		= param.channel;
  var info = [];
  var shopName = 'shopjapan' ;
  // _.each(filtered,function(filtered){
  //   console.log(filtered.price)
  //   info.push('itemURL : ' + filtered.itemURL );
  //   // info.push('itemImgURL : ' + filtered.itemImgURL );
  //   info.push('itemName: ' + filtered.itemName );
  //   info.push('itemNo  : ' + filtered.itemNo );
  //   info.push('price   : ' + filtered.price);
  //   info.push('RAC番号  : ' + filtered['RAC番号']);
  //   var itemurl = 'https://item.rakuten.co.jp/' + shopName + '/' + filtered.itemURL;
  //   info.push('URL  : ' + itemurl);
  // });

  // util.postMessage(channel, info.join('\n'));

  var items = _.filter(jsonData, function(item){
    if (item.itemURL){
      return item.itemURL.indexOf(param.args[0])>=0;
    }
  });
  var count = 0;
  console.log('items.length:' + items.length);
  _.each(items,function(filtered){
    count ++ ;
    // console.log(filtered.price)
    info.push('itemURL : ' + filtered.itemURL );
    // info.push('itemImgURL : ' + filtered.itemImgURL );
    info.push('itemName: ' + filtered.itemName );
    info.push('itemNo  : ' + filtered.itemNo );
    info.push('price   : ¥' + filtered.price);
    info.push('RAC番号　: ' + filtered['RAC番号']);
    info.push('在庫数   : ' + filtered['在庫数']);
    var hyoujiFlg = (filtered['倉庫指定']===0)?' (表示ON)':' (表示OFF)';
    info.push('倉庫指定 : ' + filtered['倉庫指定'] + hyoujiFlg);
    var itemurl = 'https://item.rakuten.co.jp/' + shopName + '/' + filtered.itemURL;
    info.push('URL  : ' + itemurl);
    info.push('--------');
  });
  info.push('Result item count :' + count);

  util.postMessage(channel, info.join('\n'));

	// var	channel		= param.channel,
  //     endpoint	= param.commandConfig.endpoint.replace('{gem}', param.args[0]);
	// request(endpoint, function (err, response, body) {
	// 	var info = [];
	// 	if (!err && response.statusCode === 200) {
	// 		body = JSON.parse(body);
	// 		info.push('Gem: ' + body.name + ' - ' + body.info);
	// 		info.push('Authors: ' + body.authors);
	// 		info.push('Project URI: ' + body.project_uri);
	// 	}
	// 	else {
	// 		info = ['No such gem found!'];
	// 	}
	// 	util.postMessage(channel, info.join('\n'));
	// });

};