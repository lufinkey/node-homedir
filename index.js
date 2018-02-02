// references

const path = require('path');
const os = require('os');
const fs = require('fs');

const home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

// exports

module.exports = homedir;

/**
 * Resolves the path to the user's home directory.
 *
 * @param {String} [username]
 * Username of user whose path you seek.
 *
 * @return {String}
 * The full path to the user's home directory.
 */
function homedir(username)
{
	switch(os.platform())
	{
		default:
			var userPath = username ? path.resolve(path.dirname(home), username) : home;
			if(!fs.existsSync(userPath))
			{
				throw new Error("user does not exist");
			}
			return userPath;
	}
}

