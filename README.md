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
If the user does not exist, or if the operation couldn't be completed, an exception is thrown.
If the user exists, but does not have a home directory, null is returned.
Upon success, a string containing the fully qualified path to the user's home directory is returned.

## Thanks npm

Shout out to all the useless modules out there that just provide the exact same functionality as `os.userInfo().homedir`

- [userhome](https://www.npmjs.org/package/userhome)
- [home-dir](https://www.npmjs.org/package/home-dir)
- [homepath](https://www.npmjs.com/package/homepath)
- [user-home](https://www.npmjs.com/package/user-home)
- [home-path](https://www.npmjs.com/package/home-path)
- [home](https://www.npmjs.com/package/home)

...and sooo many more

## License

  [MIT](LICENSE.md)

