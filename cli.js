#!/usr/bin/env node

const { homedirSync } = require('./');

var username = process.argv[2];
if(username == null)
{
	console.error("no username provided");
	process.exit(1);
}

try
{
	var homepath = homedirSync(username);
	if(homepath != null)
	{
		console.log(homepath);
	}
	process.exit(0);
}
catch(error)
{
	console.error(error.message);
	process.exit(1);
}
