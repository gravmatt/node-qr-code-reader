
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

function getHttpModule(url) {
    if(url.startsWith('https')) return https;
    else return http;
}

function decode(url) {
    return new Promise((resolve, reject) => {
        getHttpModule(url).get(url, (res) => {
            res.pipe(fs.createWriteStream('tmp_image_file'))
            .on('finish', () => {
                qrcode.decode('tmp_image_file', (success, result) => {
                    if(success) resolve(result);
                    else reject('Nothing found');
                    fs.unlink('tmp_image_file');
                });
            });
        });
    });
}

module.exports = {
    decode: decode
};
