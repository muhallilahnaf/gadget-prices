// process parsedResults
const processResult = (phone) => {

    // specs
    let phoneRawname = phone['name'].replace(/\./g, '').replace(/'/g, '').replace(/-/g, '').replace(/\*/g, '')
    phoneRawname = phoneRawname.replace(/\(.*GB.*\)|\(.*\+.*\)|\(.*\/.*\)/g, '')
    phoneRawname = phoneRawname.replace(/\d+[G]?[B]?\+\d+[G]?[B]?/g, '')
    phoneRawname = phoneRawname.replace(/\d+[G]?[B]?\/\d+[G]?[B]?.*/g, '')
    phoneRawname = phoneRawname.replace(/\d+GB.*/g, '')
    phoneRawname = phoneRawname.replace(/\|.*/g, '')
    phoneRawname = phoneRawname.replace(/\s/g, '').toLowerCase()

    // name
    if (phoneRawname.includes('galaxy') && !phoneRawname.includes('samsung')) {
        phone['name'] = phone['name'].replace(/galaxy/gi, 'Samsung Galaxy')
        phoneRawname = phoneRawname.replace(/galaxy/gi, 'samsunggalaxy')
    }
    if (phoneRawname.includes('samsung') && !phoneRawname.includes('galaxy')) {
        phone['name'] = phone['name'].replace(/samsung/gi, 'Samsung Galaxy')
        phoneRawname = phoneRawname.replace(/samsung/gi, 'samsunggalaxy')
    }
    if (phoneRawname.includes('motorola') && !phoneRawname.includes('motorolamoto')) {
        phone['name'] = phone['name'].replace(/motorola/gi, 'Motorola Moto')
        phoneRawname = phoneRawname.replace(/motorola/gi, 'motorolamoto')
    }
    if (phoneRawname.includes('iphone') && !phoneRawname.includes('apple')) {
        phone['name'] = `Apple ${phone['name']}`
        phoneRawname = `apple${phoneRawname}`
    }
    if (phoneRawname.includes('poco') && !phoneRawname.includes('xiaomi')) {
        phone['name'] = `Xiaomi ${phone['name']}`
        phoneRawname = `xiaomi${phoneRawname}`
    }
    if (phoneRawname.includes('redmi') && !phoneRawname.includes('xiaomi')) {
        phone['name'] = `Xiaomi ${phone['name']}`
        phoneRawname = `xiaomi${phoneRawname}`
    }
    if (phone['name'].includes('Mi') && !phoneRawname.includes('xiaomi')) {
        phone['name'] = `Xiaomi ${phone['name']}`
        phoneRawname = `xiaomi${phoneRawname}`
    }


    let match = {
        name: '',
        date: '',
        height: '',
        thiccness: '',
        weight: '',
        sim: '',
        body: '',
        display: '',
        displaysize: '',
        displayres: '',
        displayppi: '',
        displayprotecc: '',
        os: '',
        chipset: '',
        memoryslot: '',
        memory: '',
        memoryspeed: '',
        rearcam: '',
        rearvideo: '',
        rearvideostable: '',
        frontcam: '',
        frontvideo: '',
        frontvideostable: '',
        charging: '',
        hpjack: '',
        wlan: '',
        bluetooth: '',
        usb: '',
        sensors: '',
        fingerprint: '',
        battery: '',
        antutuv8: '',
        'geekbench5.1': '',
        rawname: '',
        geekbench: '',
        chipsetdetails: '',
        link: '',
        brand: ''
    }

    phones.some(p => {
        if (p['rawname'].replace(/\(.+\)/g, '') === phoneRawname) {
            match = {
                ...match,
                ...p
            }
            return true
        }
    })

    // price
    let parsedPrice
    let price = phone['price']
    if (phone['shop'] === 'realme' || phone['shop'] === 'fdl') {
        parsedPrice = price.replace(/\D+/g, '')
        // } else if (phone['shop'] === 'galaxyshop' && ) {

    } else {
        parsedPrice = price.replace(/[^\.\d]+/g, '')
    }
    if (parsedPrice !== '') {
        price = `BDT ${Number.parseInt(parsedPrice).toLocaleString('en-IN')}`
    }

    // brand
    if (match['name'] !== '') {
        const brand = match['name'].split(' ')[0].toLowerCase()
        brands.some(b => {
            if (brand === b.toLowerCase()) {
                match['brand'] = b
                return true
            }
        })
    }

    // PUSH DATA
    parsedResults.push({
        ...match,
        shop: phone['shop'],
        name: phone['name'],
        link: phone['link'],
        price,
    })
}
