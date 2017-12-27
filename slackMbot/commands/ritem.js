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

  var	channel		= param.channel;
  var info = [];
  var shopName = 'shopjapan' ;


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
    info.push('itemName: ' + filtered.itemName );
    info.push('itemNo  : ' + filtered.itemNo );
    info.push('price   : ¥' + filtered.price);
    info.push('RAC番号　: ' + filtered['RAC番号']);
    info.push('在庫数   : ' + filtered['在庫数']);
    info.push('倉庫指定 : ' + filtered['倉庫指定']);
    var itemurl = 'https://item.rakuten.co.jp/' + shopName + '/' + filtered.itemURL;
    info.push('URL  : ' + itemurl);
    info.push(' -------- item ' + count );


    //- yotei 1つめ分 
    var RACNo = filtered['RAC番号'];
    var racArray = RACNo.split('-');
    var RACNoItem = parseInt(racArray[1], 10); 
    console.log('RACNoItem:' + RACNoItem);

    endpoint	= param.commandConfig.endpoint.replace('{shopItemCode}', shopName + '%3A00'+RACNoItem);
    console.log('endpoint '+ endpoint);
    request(endpoint, async function (err, response, body) {
      
      info.push(' --- from rakuten API --- ');
      if (!err && response.statusCode === 200) {
        // console.log(response);
        
        // body = JSON.parse(body);
        body = JSON.parse(response.body);
        ItemsApi = body.Items;
        if(ItemsApi[0]){
          
          // console.log(Items);
          // console.log(Items[0]['Item']);
          Item = ItemsApi[0]['Item'];
          console.log(Item);
    
          info.push(filtered.itemURL + ' :WEBでの表示されているようです(在庫あり)');
          info.push('Count: ' + body.count + ' Hits: ' + body.hits + ' pageCount: ' + body.pageCount);
          info.push('itemUrl: ' + Item.itemUrl + ' itemCode: ' + Item.itemCode + ' itemPrice: ' + Item.itemPrice);
          // return info;
          // info.push('itemName   : ' + Items);
        }
        else {
          info.push(filtered.itemURL + ' :WEBでの表示無しOR在庫なし: api には見当たりませんでした。');
        }
      }
      else {
          info.push(filtered.itemURL +' WEBでの表示無しOR在庫なし: api には見当たりませんでした。');
          // info = ['No such gem found!'];
      }
      util.postMessage(channel, info.join('\n'));
    });

    // info.push('itemUrl: ' + Item.itemUrl + ' itemCode: ' + Item.itemCode + ' itemPrice: ' + Item.itemPrice);
    // info = info.concat(info2);
    // console.log(info2);
    // util.postMessage(channel, info.join('\n'));
        

  });
  info.push('Result item count :' + count);



  // util.postMessage(channel, info.join('\n'));
// 
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