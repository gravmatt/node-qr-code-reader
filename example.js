

const qr = require('./qrCodeReader');

// const webImage = 'https://video-images.vice.com/articles/59c921d4617fb82f92e55932/lede/1506353622639-1506080123352-Screen-Shot-2017-09-22-at-73339-AM.png?crop=1xw:0.8102xh;0xw,0.0374xh&resize=1546:*';
const webImage = 'https://ourcodeworld.com/public-media/articles/articleocw-57f142cf29761.jpg';


qr.decode(webImage)
    .then(console.log)
    .catch(console.log);
