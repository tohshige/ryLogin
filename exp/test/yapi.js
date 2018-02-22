/* jshint indent:false, undef: true, unused: true, esversion: 6, jquery: false ,  globalstrict: false */
/* globals $:false */

// call from /exp/routes/index.js

var itemCodeQ = $('#goodsq').val()
var shopId = $('#select').val()
var itemCode = (itemCodeQ) || 'shopjapan_trcs-dss'
var appid = 'dj00aiZpPUduRWIwMGlSMktLRiZzPWNvbnN1bWVyc2VjcmV0Jng9NGE-'
var storeId = (shopId) || 'shopjapan'
var responsegroup = 'large'  // small/medium/large
                             // デフォルト small 取得できるデータのサイズを指定できる smallが最小、最速です。
                             // 詳細はレスポンスフィールドに記載があります。
    // itemcode=$('#goods').val()
// itemLookupY()  // yahoo item code
itemLookupR()  // rakuten item code

// storeId + '%3A0010001903'
$('#buttonR').on('click', itemLookupR)
// $('#buttonBoth').on('click',  itemLookupR , itemLookupY );
$('#buttonBoth').on('click', function () {
  $('#content').empty()
  $('#contentR').empty()
  // itemLookupY();
  itemLookupR()// rakuten
  itemWordY()  // yahoo word

  // 'mouseenter': itemLookupY(),
  // 'mouseleave': itemLookupR()
})

  // console.log(req.query); // for logging
  // console.log('req.query.w ' + req.query.w); // for logging
// console.log('itemId ' + itemId) // for logging

function itemLookupR (argItemCode) {
  var shopCode = $('#select').val()
  var zaikoFlg = $('.ui.toggle').find('input').is(':checked')
  var itemCodeFlg = $('#itemCode').find('input').is(':checked')
  // alert(itemCodeFlg);
  var availability = 1
  if (zaikoFlg) {
    availability = 0
  }
  var Rendpoint = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706'
  var applicationId = '1049332431882910331'
  var itemcodeR = (argItemCode) || $('#goods').val()
  // itemcodeR = (req.query.w) ? req.query.w : $('#goods').val()
  // var itemCodeQ = $('#goodsq').val();
  var params = {
    url: Rendpoint,
    type: 'get',
    data: {
      applicationId: applicationId,
      shopCode: shopCode,
        // keyword : itemcodeR ,
      availability: availability,
      format: 'json'
    }
  }
  if (!itemCodeFlg) {
    params.data.keyword = itemcodeR
  }
  // 数字の方のITEMCode指定になるので、あとで //
  // if(itemCodeFlg){
  //                             // この指定だと動かない。オブジェクトがはいってしまう
  //   params.data.itemCode = shopCode +':'+ itemcodeR;
  // }

  $.ajax(params)
  .done(function (data) {
      // console.hash(goods.Result[i]);
      // data.count =1; //debug
    if (data.count > 0) {
      $('#rResult').text(' totalCount : ' + data.count)
      console.hash(data)
      $.each(data.Items, function (i, item) {
        var temp = ''
        var hanbai = (item.Item.availability) ? '販売可' : '販売不可'
        // availability:1 ka  0 fuka
        // var temp = $(`<li><a href="${item.Item.itemUrl}"><img src="${item.Item.mediumImageUrls[0].imageUrl}"></a></li>);
        temp = `<div class="ui raised segment">
        <img class="ui tiny left floated image" src=${item.Item.mediumImageUrls[0].imageUrl}>
        <a class="ui tiny button blue right floated padding3" href = "${item.Item.itemUrl}" target=_blank>
        <span class="ui red circular label">R </span> 商品ページ</a>
       <span class="tinyFont">${item.Item.itemName}</span>
        <p>¥${item.Item.itemPrice}円
         ${item.Item.itemUrl}
         ${item.Item.itemCode}
         ${hanbai + item.Item.availability}<br>
         </div>`
        $('#contentR').append(temp)
      }) // each
    } // if
  })
  .fail(function (data) {
    window.alert('error')
  })

  function logResults (json) {
    console.log(json)
  }
}
function itemLookupY (argItemCode) {
  var itemCodeQ = (argItemCode) || $('#goodsq').val()
  // var itemCodeQ = $('#goodsq').val();
  var itemCode = (itemCodeQ) ? storeId + '_' + itemCodeQ : 'shopjapan_trcs-dss'
  var imageSize = 300
  $.ajax({
    url: 'https://shopping.yahooapis.jp/ShoppingWebService/V1/json/itemLookupY',
    dataType: 'jsonp',
    data: {
      appid: appid,
      storeId: storeId,
      itemcode: itemCode,
      image_size: imageSize,
      responsegroup: responsegroup
    // query: $('#goods').val()
    }
  // itemcode:"shopjapan_TRCS-DSS",
  // itemcode:"TRCS-DSS",
  // jsonpCallback: "logResults"
  })
  .done(function (data) {
    var goods = data.ResultSet[0]
    var resultTotal = data.ResultSet.totalResultsReturned
    for (var i = 0; i < resultTotal; i++) {
      var imgGoods = $('<img>').attr('src', goods.Result[i].Image.Medium)
      var imgGoods1 = '<a href=' + goods.Result[i].Url + '></a>'
      $('#content').append('<p>' + goods.Result[i].Name).append(imgGoods).append(imgGoods1)
      $('#content').append(goods.Result[i].Abstract)
      $('#content').append(goods.Result[i].Abstract1)
      $('#content').append(goods.Result[i].Abstract2)
      $('#content').append(goods.Result[i].Inventories[i])
      $('#content').append(goods.Result[i].Url + '<br>')
      var yahooItemUrl = goods.Result[i].Url
      yahooItemUrl = '<a class="ui button blue" href = "' + yahooItemUrl + '" target=_blank > 商品ページへ </a>'
      $('#content').append(yahooItemUrl)
      // console.log(JSON.parse(goods.Result[i].Inventories[i]));
      // console.log(goods.Result[i].Inventories);
      console.hash(goods.Result[i].Inventories)
      console.hash(goods.Result[i])
      var Inventories = goods.Result[i].Inventories
      var inventoriesTotal = Object.keys(Inventories).length
      if (inventoriesTotal > 1) {
        var jTotal = inventoriesTotal
        var jArray = Inventories
        var jAll = '<br>'
        for (var j = 0; j < jTotal - 1; j++) {
          jAll += jArray[j].SubCode
          jAll += jArray[j].Availability
          jAll += jArray[j].Quantity
          jAll += jArray[j].Order[0].Name
          jAll += jArray[j].Order[0].Value
          jAll += '<br>'
        }
        $('#content').append(jAll)
      }
      // console.hash(testObj);
    }
  })
  .fail(function (data) {
    window.alert('error itemLookupY')
  })

  function logResults (json) {
    console.log(json)
  }
}
// $('#buttonq').on('click',  itemLookupY);

// $('#setValue').on('click', function(e){
//   console.log($(this).val());
//   console.log($(this).text());
//   itemLookupY();
// });
// $('.setValue').on('click', function(e){
//   console.log($(this).val());
//   console.log($(this).text());
//   $('#goodsq').val($(this).text());
//     itemLookupY();
// });

// clear contents
$('#buttonq').on('click', function (e) {
  $('#content').empty()
  itemLookupY()
})
$('#button').on('click', function (e) {
  $('#content').empty()
})
$('#buttonR').on('click', function (e) {
  $('#contentR').empty()
})

// console.log(ResultSet);
// console.log(Result);
$('input').keydown(function (event) {
  var keyCode = event.keyCode
  $('#content').val('keyCode: ' + keyCode)
  // falseを返却してキー入力処理をキャンセル
  if (keyCode === 13) {
    // itemLookupR();//rakuten
    return false
  }
})
/// //////////////////////////////////////////
// $(".ui.toggle.checkbox").checkbox("uncheck");

// $('.ui.toggle.checkbox').checkbox()
//   .first().checkbox({
//     onChecked: function() {        $("label[for='"+$(this).attr("id")+"']").removeClass('dn').addClass('up').attr('data-content','ON');
//   },
//   onUnchecked: function() {
//     $("label[for='"+$(this).attr("id")+"']").removeClass('up').addClass('dn').attr('data-content','OFF');
//   }
// });

// $('.ui.checkbox').checkbox({debug: true});

function itemWordY () {
  // $(function() {
  // $('#button').on('click', function(e) {
  var zaikoFlg = $('.ui.toggle').find('input').is(':checked')
  var availability = 1
  if (zaikoFlg) {
    availability = 0
  }
    // var zaikoFlg = $('#zaiko').val();
    // console.log('zaiko : ' +zaikoFlg );
    // e.preventDefault();
  $.ajax({
    url: 'http://shopping.yahooapis.jp/ShoppingWebService/V1/json/itemSearch',
    dataType: 'jsonp',
    async: 'true',
    data: {
      appid: appid,
      storeId: storeId,
      availability: availability,
      query: $('#goods').val()
    }
  })
    .done(function (data) {
      var goods = data.ResultSet[0]
      var resultTotal = data.ResultSet.totalResultsAvailable
      $('#content').append('<h3>Yahoo totalCount : ' + resultTotal)
      console.hash(goods)

      for (var i = 0; i < resultTotal; i++) {
        var imgGoods = $('<img>').attr('src', goods.Result[i].Image.Medium)
        $('#content').append('<p>' + goods.Result[i].Name).append(imgGoods)
        $('#content').append('<p>' + goods.Result[i].Url)
        var yahooItemUrl = goods.Result[i].Url
        yahooItemUrl = '<a class="ui button blue" href = "' + yahooItemUrl + '" target=_blank > 商品ページを開く </a>'
        $('#content').append(yahooItemUrl)
        var racArray = goods.Result[i].Url.split('/')
        racArray = racArray[4].split('.')
        var RACNoItem = racArray[0]
        var apiUrl = '<a class="setValue" href = "/y/' + RACNoItem + '"  id="' + RACNoItem + '"> ' + RACNoItem + ' </a>'
        apiUrl += '<a class="setValue"  id="' + RACNoItem + '"> ' + RACNoItem + ' </a>'
        $('#content').append(apiUrl)
        apiUrl = '<button class="setValueBtn" id="' + RACNoItem + '">ボタン1</button>'

        $('#content').append(apiUrl)

        // itemLookupY(RACNoItem);// 商品IDで詳細を表示
      }
    })
    .fail(function (data) {
      window.alert('error')
    })
  // });
};

$('#button').on('click', itemWordY)

/// /   for Debug TOOL      ////
/**
連想配列を文字列に整形してコンソールに表示
* @method console.hash
* @param {hash} obj 処理対象のオブジェクト
* @method format 連想配列を文字列に整形
* @property {number} length オブジェクト全体の数
* @property {number} count 整形処理をの終わったオブジェクト数
* @property {string} outText コンソールに書き出すテキスト
*/
// console.hash = function(obj) {
console.hash = function (obj) {
  this.length = Object.keys(obj).length
  this.count = 0
  this.outText = '{\n'
  /**
  * @param {hash} obj 処理対象のオブジェクト
  * @param {number} times 処理中オブジェクトの階層
  */
  this.format = function (obj, times) {
    var i = 0
    var key = []
    var _objlength = Object.keys(obj).length
    for (key in obj) {
      i++
      // 階層分のタブを追加
      var tabs = ''
      for (var j = 0; j < times + 1; j++) {
        tabs += '\t'
      }
      this.outText += tabs + key + ':'
      if (typeof obj[key] === 'object') {
        this.outText += '{' + '\n'
        // 下層のオブジェクト数を足す
        this.length += Object.keys(obj[key]).length
        // 再帰処理
        this.format(obj[key], times + 1)
        if (i === _objlength) {
          this.outText += tabs.replace(/(\t?).$/, '$1') + '}\n'
        }
        this.count++
      } else {
        this.outText += obj[key]
        if (i !== _objlength) {
          this.outText += ',\n'
        } else {
          this.outText += '\n' + tabs.replace(/(\t?).$/, '$1') + '}\n'
        }
        this.count++
      }
    }
    if (this.length === this.count) {
      console.log(this.outText)
    }
  }
  this.format(obj, 0)
}
// console.hash(testObj);
