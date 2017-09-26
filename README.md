
# Node Qr Code Reader

The core of this project is mydansun/QrCode-Reader-Node.js https://github.com/mydansun/QrCode-Reader-Node.js

### Example

```
const qrReader = require('./qrCodeReader');

qrReader.decode('https://<image_from_the_web')
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log(err);
	});
```


### Dependencies

Before you do this `npm install canvas`, download the dependencies from the link underneath!

the Canvas module has some native dependencies that need to be compiled.

[>> So visit first this link and install the depencecies for your OS <<](https://www.npmjs.com/package/canvas#installation)

### Errors & Fixes

**If you get an error that looks like this one**

```
Error: Image given has not completed loading
    at Error (native)
    at /Users/rene/orat.io/qrcode-reader/node_modules/get-image-data/shared.js:6:13
    at /Users/rene/orat.io/qrcode-reader/node_modules/get-image-data/index.js:18:36
    at load (/Users/rene/orat.io/qrcode-reader/node_modules/get-image/server.js:18:5)
    at FSReqWrap.readFileAfterClose [as oncomplete] (fs.js:445:3)
TypeError: Cannot read property 'height' of undefined
    at Object.qrcode.echo (/Users/rene/orat.io/qrcode-reader/jsqrcode/qrcode.js:34:32)
    at /Users/rene/orat.io/qrcode-reader/jsqrcode/qrcode.js:79:16
    at /Users/rene/orat.io/qrcode-reader/node_modules/get-image-data/index.js:21:7
    at load (/Users/rene/orat.io/qrcode-reader/node_modules/get-image/server.js:18:5)
    at FSReqWrap.readFileAfterClose [as oncomplete] (fs.js:445:3)
```

**Solution**

There are 2 modules `get-image` and `get-image-data`.

Delete the node_modules/ directories from inside this modules.

```
rm -rf node_modules/get-image/node_modules/
rm -rf node_modules/get-image-data/node_modules/
```
