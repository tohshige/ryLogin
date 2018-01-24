var slackTerminal 	= require('slack-terminalize'),
	commands 		= slackTerminal.getCommands(),
	util			= require('../util');
const tool = require('../../exp/myTools');
var ipArray = tool.localIP();
console.log(ipArray[0]);

var _helpAll = function () {
	var name,
		index,
		command,
		response = [];

	index = 1;
	for (name in commands) {
		command = commands[name];
		if (!command.exclude) {
			response.push(index++  + '. ' + _helpCommand(name));
		}
	}
  response.push(ipArray[0]);
	return response.join('\n');
};

var _helpCommand = function (name) {
  var response = [];
  if (commands[name].alias[1]){
    var cmdAlias = 'Alias: ' + commands[name].alias.join(', ');
    response = [ commands[name].help, cmdAlias, commands[name].description ];
  }else{
    response = [ commands[name].help,           commands[name].description ];
  }
	return response.join('\n');
};

module.exports = function (param) {
	var	channel		= param.channel,
		response;
	if (!param.args.length) {
		response = _helpAll();
	}
	else {
		response = _helpCommand(param.args[0]);
	}
	// util.postMessageHelp(channel, response);
	util.postMessage(channel, response, 'help');
};
