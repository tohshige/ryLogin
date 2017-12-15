'use strict';

var jsonQuery = require('json-query')
var fs = require( "fs" );

// const images2 = JSON.parse( fs.readFileSync( '../../used1r/dist/all.utf8.json'));
const images2 =  fs.readFileSync( '../../used1r/dist/all.utf8.json');

var data = {
  people: [
    {name: 'Matt', country: 'NZ', city: 'Lower Hutt'},
    {name: 'Pete', country: 'AU', city: 'Melbourne'},
    {name: 'Mikey', country: 'NZ', city: 'Wellington'}
  ]
}

var helpers = {
  select: function (input) {
    if (Array.isArray(input)) {
      c(input)
      var keys = [].slice.call(arguments, 1)
      return input.map(function (item) {
        return Object.keys(item).reduce(function (result, key) {
          if (~keys.indexOf(key)) {
            result[key] = item[key]
          }
          return result
        }, {})
      })
    }
  }
}

var result = jsonQuery('people:select(name, country)', {
  data: data, locals: helpers
}).value

// console.log(result);
// console.log(
// jsonQuery('people[country=NZ].name', {
//   data: data
// }));
var itemURL = 'w';
var result= jsonQuery('[itemURL=wds]', {
  data: images2
  // , locals: helpers
}).value
function c(arry){
  console.log('!!!' + arry);
}
c(result);

  
var result = jsonQuery('select(itemURL, itemNo)', {
  data: images2, locals: helpers
}).value
c(result);
