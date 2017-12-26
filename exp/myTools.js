
exports.nowDateTime = function nowDateTime() {
  const moment = require('moment');
  const jst = +9;
  let now = moment().utcOffset(jst).format("YYYY-MMDD-HHmm");
  console.log(now);
  return now;
}



exports.localIP = function localIP() {
  var os = require('os');
  var ifaces = os.networkInterfaces();
  var ipArray =[];

  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        // console.log(ifname + ':' + alias, iface.address);
        ipArray.push( iface.address );
      } else {
        // this interface has only one ipv4 adress
        // console.log(ifname, iface.address);
        ipArray.push( iface.address );
      }
      ++alias;
    });
  });
 console.log(ipArray) ;
  return ipArray;
}

c(process.argv);
if(process.argv[1].lastIndexOf('myTools')!== -1 && process.argv[2]){
  var argv2 = process.argv[2];
  c(argv2);
  var tool =require('./myTools');
  tool.localIP();
  tool.nowDateTime();
  tool.argv2;
  
}

function c(arry){
  console.log('!!!' + arry);
}
