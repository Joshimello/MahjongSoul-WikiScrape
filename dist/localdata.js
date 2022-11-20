"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let data = JSON.parse(fs_1.default.readFileSync('out/data.json', 'utf8'));
for (let char in data) {
    data[char].icon = `icons/${char}.png`;
    data[char].outfit.forEach((entry, i) => {
        data[char].outfit[i] = `outfits/${char}/${i}.png`;
    });
}
fs_1.default.writeFileSync('out/localdata.json', JSON.stringify(data, null, 4));
//# sourceMappingURL=localdata.js.map