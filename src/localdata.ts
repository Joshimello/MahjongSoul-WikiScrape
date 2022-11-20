import fs from 'fs'

let data = JSON.parse(fs.readFileSync('out/data.json', 'utf8'))

for (let char in data){
	data[char].icon = `icons/${char}.png`
	data[char].outfit.forEach((entry, i) => {
		data[char].outfit[i] = `outfits/${char}/${i}.png`
	})
}

fs.writeFileSync('out/localdata.json', JSON.stringify(data, null, 4))