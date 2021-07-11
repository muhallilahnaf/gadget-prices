const fs = require('fs')

const phonesStr = fs.readFileSync('./gadgetpricesphonenew.json', 'utf8')
const phones = JSON.parse(phonesStr)
console.log(phones.length)

const geekStr = fs.readFileSync('./geekandroid.json', 'utf8')
const geekObj = JSON.parse(geekStr)[0]

const nanoStr = fs.readFileSync('./nanoreview.json', 'utf8')
const nanoList = JSON.parse(nanoStr)

let newlist = []

for (let i = 0; i < phones.length; i++) {
    let phone = phones[i]

    for (const [key, value] of Object.entries(geekObj)) {
        const geekraw = key.replace(/\s/g, '').replace(/\./g, '').replace(/'/g, '').replace(/-/g, '').toLowerCase()
        if (geekraw === phone['rawname']) {
            phone['geekbench'] = value
            break
        }
    }
    // if (!phone['geekbench']) console.log('geekbench', phone['name'])
    if (phone['chipset']) {
        const chipraw = phone['chipset'].replace(/\s/g, '').toLowerCase()
        nanoList.some(nano => {
            const nanoraw = nano['name'].replace(/\s/g, '').toLowerCase()
            if (chipraw.includes(nanoraw)) {
                phone['chipsetdetails'] = nano
                return true
            }
        })
    }
    if (!phone['chipsetdetails']) console.log('chipsetdetails', phone['name'])
    newlist.push(phone)
}

console.log(newlist.length)
fs.writeFileSync('new1.json', JSON.stringify(newlist))