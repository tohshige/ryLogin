#!/usr/bin/env node
/*jshint -W100*/

'use strict';

/**
 * Promise形式での利用サンプル
 */


// var client = require('../index');
var client = require('cheerio-httpcli');

// なんとなくgooglebotのUser-Agentをセット
client.set('browser', 'googlebot');

// https://item.rakuten.co.jp/shopjapan/trsf-cwe/


// Yahooのトップページを取得
client.fetch('https://www.yahoo.co.jp/')
.then(function (result) {
  console.info('<then>', result.$('title').text());
  // Googleのトップページを取得
  return client.fetch('https://www.google.co.jp/');
}).then(function (result) {
  console.info('<then>', result.$('title').text());
//   // rakuten item を取得
//   return client.fetch('https://item.rakuten.co.jp/shopjapan/trsf-cwe')
// }).then(function (result) {
//   console.info('<then>', result.$('title').text());
//   console.info('<then>', result.$('input').text());
//   console.info('<then>', result.$('form').text());
//   console.info('<thenclass>', result.$('.inventory_choice_name').text());
//   console.info('<then>', result.$('input[type=radio][name=inventory_id]').val());
//   var data = getFoundData(result);
//   console.info('<thenFound>', data);
  
//   var form =  result.$('form');
//   var data = getFormData(form);
//   console.info('<thenResult>', data);
//   // console.info(result);
  // 例外を発生させる
  throw new Error('!!! error !!!');
}).catch(function (err) {
  // 例外発生時の処理
  console.error('<catch>', err.message);
}).finally(function () {
  // 最終的に必ず実行される処理
  console.info('<finally>');
});


client.fetch('https://item.rakuten.co.jp/shopjapan/trsf-cwe')
// .then(function (result) {
//   return client.fetch('http://hogehoge/page-1.html');
// })
// .then(function (result) {
//   return client.fetch('http://hogehoge/page-1-1.html');
// })
// .then(function (result) {
//   return client.fetch('http://hogehoge/page-1-2.html');
// })
.then(function (result) {
  var $ = result.$;
  // リンク一覧を表示
  $('span.inventory_choice_name').each(function (idx) {
    console.log($(this).text());
  });
  var resultForm = result.$('input[type=radio][name=inventory_id]');
  var resultLength = resultForm.length;
  // console.info( resultForm);
  // console.info( resultForm[0]);
  for(var i = 0; i < resultForm.length; i++) {
      console.log( resultForm[i].attribs.value) ;
  }

  // var resultForm = result.$('form');
  // var resultLength = resultForm.length;
  // // console.info( resultForm);
  // // console.info( resultForm[0]);
  // for(var i = 0; i < resultForm.length; i++) {

  //   if (resultForm[i].attribs['data-timesale-id']){
  //     console.log( resultForm[i].attribs) ;
  //     // console.log( resultForm[i]) ;
  //     console.log( resultForm[i].children) ;
  //     console.log( resultForm[i].children.next) ;
  //     if( resultForm[i].$('input[type=radio][name=inventory_id]')){
  //     console.log( resultForm[i].$('input[type=radio][name=inventory_id]'));
  //     }
  //   }
  // }

// $('form').each(function (idx) {
//     console.info('<then>', result.$('input[type=radio][name=inventory_id]').val());
//     // console.info('<then>', result.$('input[type=radio][name=inventory_id]')[2].val());
//     // console.info('<then>', result.idx.$('input[type=radio][name=inventory_id]').val());
//     // console.info('<then>', this.attr('input[type=radio][name=inventory_id]').val());

//     for(var i = 0; i < result.$('[name=inventory_id]').length; i++) {
//        console.log(result.$('[name=inventory_id]')[i].value);
//     }
//     // console.log($(this).attr('input'));
//     // console.log($(this).attr('value'));
//     // var form = result.serializeArray();
//     // console.log(form);
    
//   });
})
.catch(function (err) {
  console.log(err);
})
.finally(function () {
  // 処理完了でもエラーでも最終的に必ず実行される
});


function getFoundData(result) {
  var $ = result.$;
  var title = $(exports.titile).text();
  // ファンド情報
  var target = $(exports.foundtable);
  // 基準価額
  var baseCost = target.find(exports.foundbasedata).eq(0).text();
  // 純資産額
  var assets = target.find(exports.foundbasedata).eq(1).text();
  // 直近分配金
  var dividend = target.find(exports.foundbasedata).eq(2).text();

  var data = {
      "商品名": title,
      "基準価額": baseCost,
      "純資産額": assets,
      "直近分配金": dividend
  };
  return data;
}


function getFormData(form){
  var unindexed_array = form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}
