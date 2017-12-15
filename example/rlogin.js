#!/usr/bin/env node
/*jshint -W100*/

'use strict';

/**
 * Promise形式での利用サンプル
 */


// var client = require('../index');
var client = require('cheerio-httpcli');
var browser = 'chrome'; // chrome , firefox , googlebot
var url = 'https://glogin.rms.rakuten.co.jp/' ;
// User-Agentをセット
client.set('browser', browser);


// https://item.rakuten.co.jp/shopjapan/trsf-cwe/

// client.fetch(url)
// .then(function (result) {
//   console.info('<title>', result.$('title').text());
//   // var form = $('form[name=login]');
//   var form = $('form[class=rf-form-login--form]');
 
//   // ユーザー名とパスワードをセット(field()については後述)
//   form.field({
//     // login_id: 'omata@mergerick.com',
//     login_id: 'testshop4204',
//     passwd: 'Mergerick1204'
//   });
 
//   // 送信ボタンを押してフォームを送信(コールバック形式)
//   // ※上で指定したuserとpass以外はデフォルトのパラメータとなる
//   form.find('input[name=submit]').click(function (err, $, res, body) {

//   // プロミス形式でログインフォーム送信
//   // return result.$('form[name=login]').submit({ login_id : 'hoge', passwd: 'fuga' })

//   // form.find('input[type=submit]').click(function (err, $, res, body) {
//     // フォーム送信後に移動したページ取得後の処理
//     console.info('<then>', res.$('title').text());
//     console.info('<rthen>', res);
//     console.info('<ethen>', err);
//     console.info('<bthen>', body);
    

//   }).catch(function (err) {
//     // 例外発生時の処理
//     console.error('<catch>', err.message);
//     console.error('<catch>', err);
//   }).finally(function () {
//   // 最終的に必ず実行される処理
//   console.info('<finally>');
//   });
// });


client.fetch(url)
.then(function (result) {
  console.log(result.response.cookies);
  // プロミス形式でログインフォーム送信
  // return result.$('form[name=login]').submit({ user: 'hoge', pass: 'fuga' })
  // var form = $('form[class=rf-form-login--form]');
  // console.log(result.$('form[class=rf-form-login--form]').text());
  var csrf = 'NWNjdDA5b3YHMzIRZ3sWTnMGNjoEcBYbBDkiJnRjBRp8JwEaSRQuAQ==';
  var mukadeV = '98f5a7fae7dce6335581950211';
  var moduleV = 'BizAuth';
  var actionV = 'BizAuthCustomerAttest';
  // return result.$('form[class=rf-form-login--form]').submit({ 
  return result.$('form').submit({ 
    login_id : 'testshop4204', passwd: 'Mergerick1204',_csrf: csrf, mukade : mukadeV 
    , module : moduleV , action: actionV 
  })
})
.then(function (result) {
  // if (! result.response.headers['x-niconico-id']) {
  //   throw new Error('login failed');
  // }
  // ログイン後のクッキー内容確認
  console.log(result.response.cookies);
  console.info('<strong>', result.$('strong').text());
  console.info('<error>', result.$('p[class=rf-form-message]').text());
  console.info('<h2>', result.$('h2').text());
  console.info('<h3>', result.$('h3').text());
  return result.$('form[class=rf-form-login--form]').submit({ user_id : 'testuser_943', passwd: '58plemTe' })
})
.then(function (result) {
  // ログイン後のクッキー内容確認
  console.log(result.response.cookies);
  console.info('<strong>', result.$('strong').text());
  console.info('<error>', result.$('p[class=rf-form-message]').text());
  console.info('<title>', result.$('title').text());
  console.info('<h2>', result.$('h2').text());
  console.info('<h3>', result.$('h3').text());
  console.log(result.response.cookies._csrf);
});

