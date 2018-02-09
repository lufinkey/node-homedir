# userhomepath

 Platform agnostic user home directory path resolution for Node.js
  
 While `os.userInfo().homedir` or `os.homedir` can give you the home directory for the current user, this module will give you the home directory for *any* user, including system users.

## Install

```bash
npm install --save userhomepath
```

## Usage

```javascript
const { homedir } = require('userhomepath');

// find the home directory for user "luis", and log it to the console
homedir('luis').then(userPath) {
	// success
	console.log(userPath);
}).catch(error) {
	// error
	console.error("error: "+error.message);
});
```

The **homedir** function attempts to resolve the home directory of the given (*case-sensitive*, except on Windows) username.
A **homedirSync** function is also provided, which blocks until the function finishes.
If the user does not exist, or an anomaly occurs (missing `/etc/passwd` file, expected command output changed, etc), an exception is thrown.
If the user exists, but does not have a home directory, null is returned.
Upon success, a string containing the fully qualified path to the user's home directory is returned.

### CLI

For testing purposes, I also included a cli:

```bash
# find the home directory for user "luis"
userhomepath luis
```

## License

  [MIT](LICENSE.md)

