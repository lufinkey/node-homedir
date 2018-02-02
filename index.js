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
		case 'linux':
			var passwd = fs.readFileSync('/etc/passwd');
			if(passwd == null)
			{
				// passwd file doesn't exist for some reason
				throw new Error("missing /etc/passwd file");
			}
			//convert passwd to a string
			passwd = passwd.toString();
			//split lines and read line by line
			var lines = passwd.split('\n');
			for(var line of lines)
			{
				var parts = line.split(':');
				if(parts[0] == username)
				{
					var userPath = parts[5];
					if(userPath === "")
					{
						return null;
					}
					else if(userPath == null)
					{
						throw new Error("bad /etc/passwd file format")
					}
					return userPath;
				}
			}
			throw new Error("user does not exist");

		default:
			var userPath = username ? path.resolve(path.dirname(home), username) : home;
			if(!fs.existsSync(userPath))
			{
				throw new Error("user does not exist");
			}
			return userPath;
	}
}

