
exports.nowDateTime = function nowDateTime (arg) {
  let formatDate = (arg) || 'YYYY-MMDD-HHmm'
  const moment = require('moment')
  const jst = +9
  let now = moment().utcOffset(jst).format(formatDate)
  console.log(now)
  return now
}

exports.localIP = function localIP () {
  const os = require('os')
  const ifaces = os.networkInterfaces()
  let ipArray = []

  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0

    ifaces[ifname].forEach(function (iface) {
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return
      }
      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        // console.log(ifname + ':' + alias, iface.address);
        ipArray.push(iface.address)
      } else {
        // this interface has only one ipv4 adress
        // console.log(ifname, iface.address);
        ipArray.push(iface.address)
      }
      ++alias
    })
  })
  console.log(ipArray)
  return ipArray
}

if (process.argv[1].lastIndexOf('myTools') !== -1 && process.argv[2]) {
  // localのときだけコンソールへマシンのIPを表示する。
  var argv2 = process.argv[2]
  var tool = require('./myTools')
  tool.c('argv2' + argv2)
  tool.localIP()
  tool.nowDateTime()
  // tool.argv2
  console.log(`[Debug]: ${argv2}`)
}

exports.c = function c (arry) {
  console.log('!!!' + arry)
}

// 改行が自由に バッククオート（`～`）で囲む
var b =
`
aaaa\nbbbb
  cccc
`
// old
// console.log('JS テンプレートリテラル' + b + ' ') // 変数が見にくい
console.log(`JS テンプレートリテラル ${b} `)
/*
JS テンプレートリテラル

aaaa
bbbb
  cccc

*/
