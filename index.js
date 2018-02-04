
const path = require('path');
const os = require('os');
const fs = require('fs');
const { spawnSync } = require('child_process');

/**
 * Resolves the path to the user's home directory.
 *
 * @function homedirSync
 *
 * @param {String} username - Username of user whose path you seek.
 *
 * @throws {Error} if the user does not exist, or the operation couldn't be completed
 *
 * @return {String}
 * The full path to the user's home directory, or null if the user has no home directory.
 */
function homedirSync(username)
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

		case 'darwin':
			var result = spawnSync('dscacheutil', ['-q', 'user', '-a', 'name', username]);
			// get lines from dscacheutil's stdout
			var output = result.stdout.toString().split("\n");
			// look for line that starts with "dir:" and return value
			for(var line of output)
			{
				if(line.startsWith('dir: '))
				{
					var userPath = line.substring(5, line.length);
					if(userPath == '')
					{
						return null;
					}
					return userPath;
				}
			}
			throw new Error("user does not exist");
		
		case 'win32':
			var result = spawnSync('wmic', ['useraccount', 'where', 'name="'+username+'"', 'get', 'sid']);
			var output = result.stdout.toString().split("\n");
			for(var i=0; i<output.length; i++)
			{
				output[i] = output[i].trim();
			}
			if(output[0] != "SID" || output[1] == null)
			{
				throw new Error("user does not exist");
			}
			var sid = output[1];
			if(sid == '')
			{
				throw new Error("unexpected output");
			}
			var regPath = 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList\\'+sid;
			result = spawnSync(__dirname+'\\win-reg-query.bat', [ regPath, "ProfileImagePath" ]);
			var userPath = result.stdout.toString();
			if(userPath == null || userPath == "")
			{
				return null;
			}
			return userPath;

		default:
			throw new Error("unsupported platform");
	}
}

/**
 * Resolves the path to the user's home directory.
 *
 * @async
 * @function homedir
 *
 * @param {String} username - Username of user whose path you seek.
 *
 * @throws {Error} if the user does not exist, or the operation couldn't be completed
 *
 * @return {String}
 * The full path to the user's home directory, or null if the user has no home directory.
 */
async function homedir(username)
{
	return homedirSync(username);
}


// export functions

module.exports = {
	homedir: homedir,
	homedirSync: homedirSync
};
