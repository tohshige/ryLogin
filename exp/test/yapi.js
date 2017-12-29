var itemcodeq= $('#goodsq').val();
var itemcode= (itemcodeq) ? itemcodeq : "shopjapan_trcs-dss";
var appid="dj00aiZpPUduRWIwMGlSMktLRiZzPWNvbnN1bWVyc2VjcmV0Jng9NGE-";
var store_id="shopjapan";
var responsegroup ='large' ; // small/medium/large
                              // デフォルト small 取得できるデータのサイズを指定できる smallが最小、最速です。
                              // 詳細はレスポンスフィールドに記載があります。
    // itemcode=$('#goods').val()                              
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
  for(var i = 0; i < 20; i++) {
    var img_goods = $('<img>').attr('src', goods.Result[i].Image.Small);
    var img_goods1= '<a href='+ goods.Result[i].Url + '>dd</a>';
    $('#content').append('<p>' + goods.Result[i].Name).append(img_goods).append(img_goods1);
    $('#content').append( goods.Result[i].Abstract);
    $('#content').append( goods.Result[i].Abstract1);
    $('#content').append( goods.Result[i].Abstract2);
    $('#content').append( goods.Result[i].Inventories[i]);
    $('#content').append( goods.Result[i].Url);
    // console.log(JSON.parse(goods.Result[i].Inventories[i]));
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

// console.log(ResultSet);
// console.log(Result);

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
 
      for(var i = 0; i < 20; i++) {
        var img_goods = $('<img>').attr('src', goods.Result[i].Image.Small);
        $('#content').append('<p>' + goods.Result[i].Name).append(img_goods);
          $('#content').append( goods.Result[i].Url);
      }
    })
    .fail(function(data) {
      alert('error');
    });
  });
});
