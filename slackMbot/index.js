var slackTerminal = require('slack-terminalize');

// slackTerminal.init('xoxb-token', {
slackTerminal.init('xoxb-291078047106-DC5jykVIC9UgxjjRkLqtCdKz', {
  //xoxb-291078047106-DC5jykVIC9UgxjjRkLqtCdKz
      // slack rtm client options here
    // more info at: https://github.com/slackhq/node-slack-client/blob/master/lib/clients/rtm/client.js
}, {
    // app configurations to suit your project structure
    // to see the list of all possible config,
    // check this out: https://github.com/ggauravr/slack-terminalize/blob/master/util/config.js
	CONFIG_DIR: __dirname + '/config',
	COMMAND_DIR: __dirname + '/commands'
});
