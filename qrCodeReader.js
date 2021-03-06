
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

image = require('get-image-data');
BitMatrix = require("./jsqrcode/bitmat.js");
require("./jsqrcode/grid.js");
require("./jsqrcode/qrcode.js");
FinderPatternFinder = require("./jsqrcode/findpat.js");
Detector = require("./jsqrcode/detector.js");
GF256Poly = require("./jsqrcode/gf256poly.js");
GF256 = require("./jsqrcode/gf256.js");
ReedSolomonDecoder = require("./jsqrcode/rsdecoder.js");
Decoder = require("./jsqrcode/decoder.js");
Version = require("./jsqrcode/version.js");
FormatInformation = require("./jsqrcode/formatinf.js");
ErrorCorrectionLevel = require("./jsqrcode/errorlevel.js");
DataBlock = require("./jsqrcode/datablock.js");
BitMatrixParser = require("./jsqrcode/bmparser.js");
require("./jsqrcode/datamask.js");
AlignmentPatternFinder = require("./jsqrcode/alignpat.js");
QRCodeDataBlockReader = require("./jsqrcode/databr.js");

function random(len) {
    let rdmString = "";
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
    return rdmString.substr(0, len);
}

function getRandomFile() {
    const downloads = path.join(__dirname, 'downloads');
    if(!fs.existsSync(downloads)) {
        fs.mkdirSync(downloads);
    }
    return path.join(downloads, random(32));
}

function decode(url) {
    return new Promise((resolve, reject) => {
        if(fs.existsSync(url)) {
            qrcode.decode(url, (success, result) => {
                if(success)
                    resolve(result);
                else
                    reject('Nothing found');
            });
            return;
        }

        if(!url.startsWith('https') || !url.startsWith('http'))
            return reject('Image path invalid');

        (url.startsWith('https') ? https : http)
        .get(url, (res) => {
            if(res.statusCode != 200)
                return reject('Could not fetch image file from the web');

            const imageFile = getRandomFile();

            res.pipe(fs.createWriteStream(imageFile))
            .on('finish', () => {
                qrcode.decode(imageFile, (success, result) => {
                    if(success)
                        resolve(result);
                    else
                        reject('Nothing found in the image');
                    fs.unlink(imageFile);
                });
            });
        });
    });
}

module.exports = {
    decode: decode
};
