

const qr = require('./qrCodeReader');

const webImage = 'https://ourcodeworld.com/public-media/articles/articleocw-57f142cf29761.jpg';

qr.decode(webImage)
    .then(console.log)
    .catch(console.log);
