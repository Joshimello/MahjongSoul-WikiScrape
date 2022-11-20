import axios from 'axios'
import fs from 'fs'

if (!fs.existsSync('out')){
    fs.mkdirSync('out')
}

if (!fs.existsSync('out/icons')){
    fs.mkdirSync('out/icons')
}

if (!fs.existsSync('out/outfits')){
    fs.mkdirSync('out/outfits')
}

// icons
const data = JSON.parse(fs.readFileSync('out/data.json', 'utf8'))
let c = 0
for (let char in data){
	axios.get(data[char].icon.split('?itok')[0], {responseType: 'stream'}).then(res => {
		res.data.pipe(fs.createWriteStream(`out/icons/${char}.png`))
	})
}

// outfits
for (let char in data){
	let promises = []
	data[char].outfit.forEach((url, i) => {
		promises.push(new Promise((resolve, reject) => {
			axios.get(url.split('?itok')[0], {responseType: 'stream'}).then(res => {
				if (!fs.existsSync(`out/outfits/${char}`)){
					fs.mkdirSync(`out/outfits/${char}`)
				}
				res.data.pipe(fs.createWriteStream(`out/outfits/${char}/${i}.png`))
				resolve
			})
		}))
	})
	Promise.all(promises).then(null)
}