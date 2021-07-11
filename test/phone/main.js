const fs = require('fs')

const linksStr = fs.readFileSync('./gadgetpriceslink.txt', 'utf8')
const links = linksStr.split('\n')
console.log(links.length)

const phonesStr = fs.readFileSync('./gadgetpricesphone.json', 'utf8')
const phones = JSON.parse(phonesStr)
console.log(phones.length)

let newlist = []

for (let i = 0; i < links.length; i++) {
    const link = links[i]
    const phone = phones[i]

    const part = link.match(/\.com\/.+-/gi)[0]
    const partfresh = part.replace(/_/g, '').replace('.com/', '').replace('-', '')

    const phonefresh = phone['name'].replace(/\s/g, '').replace(/\./g, '').replace(/'/g, '').replace(/-/g, '').toLowerCase()
    if (partfresh !== phonefresh) {
        console.log(i, phonefresh, partfresh)
        break
    }
    const d = phone['date'].match(/\d{4}/)
    if (d) {
        if (Number.parseInt(d[0]) >= 2018) {
            let newphone = { ...phone, 'link': link.trim(), 'rawname': phonefresh }
            newlist.push(newphone)
        }
    } else {
        console.log(i, phone['name'])
    }
}

console.log(newlist.length)
// fs.writeFileSync('gadgetpricesphonenew.json', JSON.stringify(newlist))