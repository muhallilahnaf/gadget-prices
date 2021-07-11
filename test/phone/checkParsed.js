const fs = require('fs')

const phonesStr = fs.readFileSync('./phones.json', 'utf8')
const phones = JSON.parse(phonesStr)
console.log(phones.length)

let newlist = []

for (let i = 0; i < phones.length; i++) {
    let phone = phones[i]

    // if (!phone['name']) phone['name'] = ''
    // if (!phone['date']) phone['date'] = ''
    // if (!phone['height']) phone['height'] = ''
    // if (!phone['thiccness']) phone['thiccness'] = ''
    // if (!phone['weight']) phone['weight'] = ''
    // if (!phone['sim']) phone['sim'] = ''
    // if (!phone['body']) phone['body'] = ''
    // if (!phone['display']) phone['display'] = ''
    // if (!phone['displaysize']) phone['displaysize'] = ''
    // if (!phone['displayres']) phone['displayres'] = ''
    // if (!phone['displayppi']) phone['displayppi'] = ''
    // if (!phone['displayprotecc']) phone['displayprotecc'] = ''
    // if (!phone['os']) phone['os'] = ''
    // if (!phone['chipset']) phone['chipset'] = ''
    // if (!phone['memoryslot']) phone['memoryslot'] = ''
    // if (!phone['memory']) phone['memory'] = ''
    // if (!phone['memoryspeed']) phone['memoryspeed'] = ''
    // if (!phone['rearcam']) phone['rearcam'] = ''
    // if (!phone['rearvideo']) phone['rearvideo'] = ''
    // if (!phone['rearvideostable']) phone['rearvideostable'] = ''
    // if (!phone['frontcam']) phone['frontcam'] = ''
    // if (!phone['frontvideo']) phone['frontvideo'] = ''
    // if (!phone['frontvideostable']) phone['frontvideostable'] = ''
    // if (!phone['charging']) phone['charging'] = ''
    // if (!phone['hpjack']) phone['hpjack'] = ''
    // if (!phone['wlan']) phone['wlan'] = ''
    // if (!phone['bluetooth']) phone['bluetooth'] = ''
    // if (!phone['usb']) phone['usb'] = ''
    // if (!phone['sensors']) phone['sensors'] = ''
    // if (!phone['fingerprint']) phone['fingerprint'] = ''
    // if (!phone['battery']) phone['battery'] = ''
    // if (!phone['antutuv8']) phone['antutuv8'] = ''
    // if (!phone['geekbench5.1']) phone['geekbench5.1'] = ''
    // if (!phone['rawname']) phone['rawname'] = ''
    // if (!phone['geekbench']) phone['geekbench'] = ''
    // if (!phone['chipsetdetails']) phone['chipsetdetails'] = ''
    // if (!phone['link']) phone['link'] = ''
    const brand = phone['name'].split(' ')[0].toLowerCase()
    if (!newlist.includes(brand)) newlist.push(brand)
    // console.log(phone['name'])
}

console.log(newlist)
// fs.writeFileSync('new1.json', JSON.stringify(newlist))