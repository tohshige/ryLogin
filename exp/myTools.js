
exports.nowDateTime = function nowDateTime() {
  const moment = require('moment');
  const jst = +9;
  let now = moment().utcOffset(jst).format("YYYY-MMDD-HHmm");
  console.log(now);
  return now;
}
