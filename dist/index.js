"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const baseUrl = 'https://mahjongsoul.club/content/';
const content = '%E9%9B%80%E5%A3%AB-0';
const queryEn = '?language=en';
const queryJp = '?language=ja';
let female = {};
axios_1.default.get(baseUrl + content + queryEn).then(res => {
    let $ = cheerio_1.default.load(res.data);
    $('#quicktabs-tabpage-qtcharacterslist-1').find('.views-table tbody tr').each((i, el) => {
        let name = $(el).children('.views-field-title').text().trim();
        female[name] = {
            'jp': '',
            'icon': $(el).children('.views-field-field-id').find('img').attr('src').replace('48x48', 'large'),
            'age': $(el).children('.views-field-field-age').text().trim(),
            'bday': $(el).children('.views-field-field-birthdate').text().trim(),
            'height': $(el).children('.views-field-field-height').text().trim(),
            'date': $(el).children('.views-field-field-releasedate').text().trim(),
            'color': $(el).children('.views-field-field-colorbody').text().trim(),
            'outfit': []
        };
        axios_1.default.get(baseUrl + name + queryJp).then(res => {
            let $$ = cheerio_1.default.load(res.data);
            female[name].jp = $$('#page-title').text().trim();
            $$('#block-views-slick-x-block-24').find('img').each((i, el) => {
                female[name].outfit.push($$(el).data('src').replace('h300', 'juicebox_small'));
            });
            fs_1.default.writeFileSync('data.json', JSON.stringify(female, null, 4));
        });
    });
});
//# sourceMappingURL=index.js.map