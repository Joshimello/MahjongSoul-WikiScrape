"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
if (!fs_1.default.existsSync('out')) {
    fs_1.default.mkdirSync('out');
}
if (!fs_1.default.existsSync('out/icons')) {
    fs_1.default.mkdirSync('out/icons');
}
if (!fs_1.default.existsSync('out/outfits')) {
    fs_1.default.mkdirSync('out/outfits');
}
// icons
const data = JSON.parse(fs_1.default.readFileSync('out/data.json', 'utf8'));
let c = 0;
for (let char in data) {
    axios_1.default.get(data[char].icon.split('?itok')[0], { responseType: 'stream' }).then(res => {
        res.data.pipe(fs_1.default.createWriteStream(`out/icons/${char}.png`));
    });
}
// outfits
for (let char in data) {
    let promises = [];
    data[char].outfit.forEach((url, i) => {
        promises.push(new Promise((resolve, reject) => {
            axios_1.default.get(url.split('?itok')[0], { responseType: 'stream' }).then(res => {
                if (!fs_1.default.existsSync(`out/outfits/${char}`)) {
                    fs_1.default.mkdirSync(`out/outfits/${char}`);
                }
                res.data.pipe(fs_1.default.createWriteStream(`out/outfits/${char}/${i}.png`));
                resolve;
            });
        }));
    });
    Promise.all(promises).then(null);
}
//# sourceMappingURL=download.js.map