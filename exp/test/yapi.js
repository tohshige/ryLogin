var itemcodeq= $('#goodsq').val();
var shop_id= $('#shopId').val();
var itemcode = (itemcodeq) ? itemcodeq : "shopjapan_trcs-dss";
var appid ="dj00aiZpPUduRWIwMGlSMktLRiZzPWNvbnN1bWVyc2VjcmV0Jng9NGE-";
var store_id = (shop_id) ? shop_id :"shopjapan";
var responsegroup ='large' ; // small/medium/large
                              // デフォルト small 取得できるデータのサイズを指定できる smallが最小、最速です。
                              // 詳細はレスポンスフィールドに記載があります。
    // itemcode=$('#goods').val()                              
itemLookup();

function itemLookup(){
  var itemcodeq= $('#goodsq').val();
  var itemcode= (itemcodeq) ? store_id+ '_' + itemcodeq : "shopjapan_trcs-dss";
  
  $.ajax({
  url:"https://shopping.yahooapis.jp/ShoppingWebService/V1/json/itemLookup",
  dataType: "jsonp",
  data: {
    appid:appid,
    store_id:store_id,
    itemcode:itemcode,
    responsegroup:responsegroup,
    // query: $('#goods').val()
  },
  // itemcode:"shopjapan_TRCS-DSS",
  // itemcode:"TRCS-DSS",
  // jsonpCallback: "logResults"
  })
  .done(function(data) {
    var goods = data.ResultSet[0];
    var resultTotal = data.ResultSet.totalResultsReturned
    for(var i = 0; i < resultTotal; i++) {
      var img_goods = $('<img>').attr('src', goods.Result[i].Image.Medium);
      var img_goods1= '<a href='+ goods.Result[i].Url + '></a>';
      $('#content').append('<p>' + goods.Result[i].Name).append(img_goods).append(img_goods1);
      $('#content').append( goods.Result[i].Abstract);
      $('#content').append( goods.Result[i].Abstract1);
      $('#content').append( goods.Result[i].Abstract2);
      $('#content').append( goods.Result[i].Inventories[i]);
      $('#content').append( goods.Result[i].Url+ '<br>');
      var yahooItemUrl = goods.Result[i].Url;
          yahooItemUrl = '<a class="ui button blue" href = "'+ yahooItemUrl+ '" target=_blank > 商品ページへ </a>';
      $('#content').append( yahooItemUrl);
      // console.log(JSON.parse(goods.Result[i].Inventories[i]));
      // console.log(goods.Result[i].Inventories);
      console.hash(goods.Result[i].Inventories);
      console.hash(goods.Result[i]);
      var Inventories =goods.Result[i].Inventories;
      var inventoriesTotal = Object.keys(Inventories).length;
      if (inventoriesTotal > 1  ){
        var jTotal= inventoriesTotal;
        var jArray= Inventories;
        var jAll = '<br>';
        for(var j = 0; j < jTotal-1 ; j++) {
          jAll +=jArray[j].SubCode;
          jAll +=jArray[j].Availability;
          jAll +=jArray[j].Quantity;
          jAll +=jArray[j].Order[0].Name;
          jAll +=jArray[j].Order[0].Value;
          jAll +='<br>';
        }
        $('#content').append( jAll );
      }
      // console.hash(testObj);
    }
  })
  .fail(function(data) {
    alert('error');
  });

  function logResults(json){
    console.log(json);
  }

}
$('#buttonq').on('click',  itemLookup);

// $('#setValue').on('click', function(e){
//   console.log($(this).val());
//   console.log($(this).text());
//   itemLookup();
// });
// $('.setValue').on('click', function(e){
//   console.log($(this).val());
//   console.log($(this).text());
//   $('#goodsq').val($(this).text());
//     itemLookup();
// });


//clear contents
$('#buttonq').on('click',  function(e) {
  $('#content').empty();
});
$('#button').on('click',  function(e) {
  $('#content').empty();
});

// console.log(ResultSet);
// console.log(Result);
$("input").keydown(function(event){
  var keyCode = event.keyCode;
  $("#content").val("keyCode: " + keyCode);
  // falseを返却してキー入力処理をキャンセル
  if (keyCode === 13){
    return false;
  }

});
/////////////////////////////////////////////
$(function() {
  $('#button').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      url:'http://shopping.yahooapis.jp/ShoppingWebService/V1/json/itemSearch',
      dataType: 'jsonp',
      async: 'true',
      data: {
        appid: appid,
        store_id:store_id,
        query: $('#goods').val()
      }
    })
    .done(function(data) {
      var goods = data.ResultSet[0];
      var resultTotal = data.ResultSet.totalResultsAvailable;
      $('#content').append('<h3>totalCount : ' + resultTotal);
      console.hash(goods);
 
      for(var i = 0; i < resultTotal; i++) {
        var img_goods = $('<img>').attr('src', goods.Result[i].Image.Medium);
        $('#content').append('<p>' + goods.Result[i].Name).append(img_goods);
        $('#content').append('<p>' + goods.Result[i].Url);
        var yahooItemUrl = goods.Result[i].Url;
        yahooItemUrl = '<a class="ui button blue" href = "'+ yahooItemUrl+ '" target=_blank > 商品ページを開く </a>';
        $('#content').append( yahooItemUrl);
        var racArray = goods.Result[i].Url.split('/');
        racArray = racArray[4].split('.');
        var RACNoItem = racArray[0];
        var apiUrl = '<a class="setValue" href = "/y/'+ RACNoItem+ '"  id="'+ RACNoItem+ '"> '+ RACNoItem+ ' </a>';
             apiUrl += '<a class="setValue"  id="'+ RACNoItem+ '"> '+ RACNoItem+ ' </a>';
        $('#content').append( apiUrl);
            apiUrl = '<button class="setValueBtn" id="'+ RACNoItem+ '">ボタン1</button>';
            
        $('#content').append( apiUrl);
      }
    })
    .fail(function(data) {
      alert('error');
    });
  });
});
////   for Debug TOOL      ////
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
console.hash = function(obj) {
  this.length = Object.keys(obj).length;
  this.count = 0;
  this.outText = "{\n";
  /**
  * @param {hash} obj 処理対象のオブジェクト
  * @param {number} times 処理中オブジェクトの階層
  */
  this.format = function(obj,times){
    var i = 0;
    var _objlength = Object.keys(obj).length;
    for(key in obj){
      i++;
      //階層分のタブを追加
      var tabs = "";
      for(var j = 0; j < times+1; j++){
        tabs += "\t";
      }
      this.outText += tabs + key + ":";
      if(typeof obj[key] == "object"){
        this.outText += "{" + "\n";
        //下層のオブジェクト数を足す
        this.length += Object.keys(obj[key]).length;
        //再帰処理
        this.format(obj[key],times+1);
        if(i == _objlength){
          this.outText += tabs.replace(/(\t?).$/,'$1') + "}\n";
        }
        this.count++;
      }else{
        this.outText += obj[key];
        if(i != _objlength){
          this.outText += ",\n";
        }else{
          this.outText += "\n" + tabs.replace(/(\t?).$/,'$1') + "}\n";
        }
        this.count++;
      }
    }
    if(this.length == this.count){
      console.log(this.outText);
    }
  }
  this.format(obj,0);
}
// console.hash(testObj);
