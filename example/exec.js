#!/usr/bin/env node
/*jshint -W100*/

'use strict';

const exec = require('child_process').exec;
exec('ls -la ./', (err, stdout, stderr) => {
  if (err) { console.log(err); }
  console.log(stdout);
});
exec('node yl test', (err, stdout, stderr) => {
  if (err) { console.log(err); }
  console.log(stdout);
});

