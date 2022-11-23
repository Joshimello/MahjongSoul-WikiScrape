# MahjongSoul-WikiScrape
Data & Outfit scraper for the [Mahjong Soul Wiki](https://mahjongsoul.club/characters/list).  
Wanted to do something with TypeScript so i made this :>  
[Little gallery](https://joshimello.github.io/MahjongSoul-WikiScrape/) just for fun

## Usage
Using local images:  
Copy [localdata.json](https://github.com/Joshimello/MahjongSoul-WikiScrape/blob/main/out/localdata.json) and local files, icons and outfits folder, to where ever you need.

```javascript
const localdata = JSON.parse(fs.readFileSync('localdata.json', 'utf8'))
console.log(localdata['AnjuSuzumiya'].outfit)
// ["outfits/AnjuSuzumiya/0.png", ...]
```

Using remote images:  
Just copy the [data.json](https://github.com/Joshimello/MahjongSoul-WikiScrape/blob/main/out/data.json) file to your project and use it however you want.

Example usage:
```javascript
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'))
console.log(data['AnjuSuzumiya'].jp)
// 涼宮杏樹
```

## Dependencies
**Backend**
- [axios](https://github.com/axios/axios): Request html from wiki site.
- [cheerio](https://github.com/cheeriojs/cheerio): Parse html.

## To-Do
- male info(?)
- ~~scrape images.~~

## Contribute
Always welcomed to improve anything or add suggestions!  
Of course reading this already makes me happy enough uwu~
