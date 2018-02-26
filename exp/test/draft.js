/* jshint indent:false, undef: false, unused: false, esversion: 6, jquery: false ,  globalstrict: false */
/* globals $:false */

var item = 'dummy'

var temp = ''
var hanbai = (item.Item.availability) ? '販売可' : '販売不可'
// availability:1 ka  0 fuka

temp = `<div class="ui segment"><a href=${item.Item.itemUrl} > \
<img class="ui tiny left floated image" src=${item.Item.mediumImageUrls[0].imageUrl}> \
<span>${item.Item.itemName}</span> \
<p>¥${item.Item.itemPrice}円 \
 ${item.Item.itemUrl} \
 ${item.Item.itemCode} \
 ${hanbai + item.Item.availability} \
<a class="ui tiny button blue left floated" href = "${item.Item.itemUrl}" target=_blank > rakuten商品ページへ </a> \
</div>`

$('#contentR').append(temp)

var url = 'https://service.smt.docomo.ne.jp/procedure2/C0616/ifauth/common/register?serviceCode=C0616&eventCode=001' +
'&dcmga_cid=' + clientId +
'&utm_source=' + utm_source +
'&utm_medium=' + utm_medium

window.alert(url)

// <script>
ga('create', 'UA-72191316-1', {'cookieDomain': 'health.dmkt-sp.jp'})  
ga(function (tracker) {
  ga('set', 'referrer', document.referrer)
  var location_search = location.search
  var redirect_url = 'https://service.smt.docomo.ne.jp/procedure2/C0616/ifauth/common/register?serviceCode=C0616&eventCode=001&'
  var clientId = tracker.get('clientId')	
  var match_cid = location.search.substring(0)
  if (match_cid) {
    redirect_url = redirect_url + location_search.replace(match_cid[0], '') + '&dcmga_cid=' + clientId
  } else {
    redirect_url = redirect_url + location_search + '&dcmga_cid=' + clientId
  }
  window.location.href = redirect_url
})
// </script>
// リダイレクト先ページのGoogleアナリティクス
// https://goo.gl/PGkoBH