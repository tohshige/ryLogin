var webClient = require('slack-terminalize').getWebClient();
/**
 * Wrapper function for postMessage from slack-client to handle formatting.
 * 
 * @param  { object } slack-client Channel boject
 * @param  { string } message to send to Slack channel
 * @param  { boolean } flag to indicate block formatting
 * @return { none }
 * 
 */
var postMessage = function (channel, response, format) {
	format = format || true;
	if(format === 'help'){
    response = (format && ':question:helpを表示します。 ```' + response + '```') || response;
  }else{
  response = (format && '```' + response + '```') || response;
  }
    // more on this API here: https://api.slack.com/methods/chat.postMessage
	webClient.chat.postMessage(channel, response, {
		as_user: true
	});
};
// var postMessageHelp = function (channel, response, format) {
// 	format = format || true;
// 	response = (format && ':question:```' + response + '```') || response;
//     // more on this API here: https://api.slack.com/methods/chat.postMessage
// 	webClient.chat.postMessageHelp(channel, response, {
// 		as_user: true
// 	});
// };

/// test attachments
// var postMessage = function (channel, response, format) {
// 	format = format || true;
// 	response = (format && '```' + response + '```') || response;
//     // more on this API here: https://api.slack.com/methods/chat.postMessage
// 	webClient.chat.postMessage(channel, response, {
//     as_user: true,
//     username: response.username,
//     text: response.text,
//     icon_url: response.icon_url,
//     attachments: response.attachments
// 	});
// };

exports.postMessage = postMessage;
// exports.postMessageHelp = postMessageHelp;
// exports.postMessage1 = postMessage1;