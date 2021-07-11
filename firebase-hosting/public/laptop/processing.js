// process parsedResults
const processResult = (laptop) => {

    const name = laptop['name']
    const desc = laptop['description']

    let cpuname = ''
    let cpudate = ''
    let cputdp = ''
    let cpubase = ''
    let cputurbo = ''
    let cpucore = ''
    let cputhread = ''
    let cpupassmark = ''

    let ram = ''
    let storage = ''
    let display = ''
    let graphics = ''
    let brand = ''

    if (name !== '') {
        const processedName = name.replace(/[\s\-]*/gm, '').toLowerCase()
        const processedDesc = desc.replace(/[\s\-]*/gm, '').toLowerCase()

        // CPU
        const laptopDetail = processedName + processedDesc
        const included = passmarkcpus.some(cpu => {
            if (laptopDetail.includes(cpu['rawname'])) {
                cpuname = cpu['name']
                cpudate = cpu['date']
                cputdp = cpu['tdp']
                cpubase = cpu['base']
                cputurbo = cpu['turbo']
                cpucore = cpu['core']
                cputhread = cpu['thread']
                cpupassmark = cpu['passmark']
                return true
            }
        })

        // RAM, STORAGE, DISPLAY, GRAPHICS 
        if (desc !== '') {
            desc.split('|').forEach(part => {
                const lowerPart = part.toLowerCase()
                // RAM and STORAGE
                if (ram === '' || storage === '') {
                    if (lowerPart.includes('+')) {
                        const plussplit = part.split('+')
                        const lowerplussplit = lowerPart.split('+')
                        lowerplussplit.forEach((pluspart, i) => {
                            if (pluspart.includes('ram') || pluspart.includes('ddr4') || pluspart.includes('sodimm')) {
                                ram += ` ${plussplit[i].trim()}`
                            }
                            if (pluspart.includes('hdd') || pluspart.includes('ssd') || pluspart.includes('sata') || pluspart.includes('rpm')) {
                                storage += ` ${plussplit[i].trim()}`
                            }
                        })
                        ram = ram.trim()
                        storage = storage.trim()
                    } else {
                        if (lowerPart.includes('ram') || lowerPart.includes('ddr4') || lowerPart.includes('sodimm')) {
                            ram = part.trim()
                        }
                        if (lowerPart.includes('hdd') || lowerPart.includes('ssd') || lowerPart.includes('sata') || lowerPart.includes('rpm')) {
                            storage = part.trim()
                        }
                    }
                }
                // DISPLAY
                if (display === '' && (lowerPart.includes('display') || lowerPart.includes('fhd') ||
                    lowerPart.includes('inches') || lowerPart.includes('ips') || lowerPart.includes('oled'))) {
                    display = part.trim()
                }
                // GRAPHICS
                if (graphics === '' && (lowerPart.includes('graphics') || lowerPart.includes('nvidia') ||
                    lowerPart.includes('geforce') || lowerPart.includes('radeon'))) {
                    graphics = part.trim()
                }
            })
        } else {
            // RAM
            const ramMatch = /(\d{1,2}gb)(?:ddr4)?ram/.exec(processedName)
            if (ramMatch) {
                ram = ramMatch[1].toUpperCase()
                ram += processedName.includes('ddr4') ? ' DDR4' : ''
                ram += ' RAM'
            }
            // STORAGE
            const storageMatch = /(\d{1,3}(?:gb|tb))(hdd|ssd)/.exec(processedName)
            if (storageMatch) {
                storage = storageMatch[1].toUpperCase()
                storage += ` ${storageMatch[2].toUpperCase()}`
            }
            // DISPLAY
            if (processedName.includes('fhd') || processedName.includes('fullhd')) {
                display = 'FHD'
            }
            if (processedName.includes('ips')) {
                display += ' IPS'
            }
            if (processedName.includes('oled')) {
                display += ' OLED'
            }
            displaySizes.some(size => {
                if (Number.isInteger(size)) {
                    if (processedName.includes(`${size}inch`) || processedName.includes(`${size}\"`) ||
                        processedName.includes(`${size}.0inch`) || processedName.includes(`${size}.0\"`)) {
                        display += ` ${size}\"`
                        return true
                    }
                }
                if (processedName.includes(`${size}inch`) || processedName.includes(`${size}\"`)) {
                    display += ` ${size}\"`
                    return true
                }
            })
            display = display.trim()
            // GRAPHICS
            if (processedName.includes('nvidia') || processedName.includes('geforce')) {
                graphics = 'Nvidia GPU'
            }
            if (processedName.includes('radeon')) {
                graphics = 'AMD Radeon GPU'
            }
            if (processedName.includes('uhdgraphics')) {
                graphics = 'Intel UHD Graphics'
            }
        }
        // BRAND
        const nameBrand = name.split(' ')[0].toLowerCase()
        brands.some(b => {
            if (nameBrand.includes(b.toLowerCase())) {
                brand = b
                return true
            }
        })
    }

    // PRICE
    let price = laptop['price']
    const parsedPrice = price.replace(/[^\.\d]+/g, '')
    if (parsedPrice !== '') {
        price = `BDT ${Number.parseInt(parsedPrice).toLocaleString('en-IN')}`
    }

    // PUSH DATA
    parsedResults.push({
        shop: laptop['shop'],
        brand,
        name,
        link: laptop['link'],
        description: desc,
        price,
        status: laptop['status'],
        cpu: cpuname,
        cpudate: cpudate,
        cputdp,
        cpubase,
        cputurbo,
        cpucore,
        cputhread,
        cpupassmark,
        ram,
        storage,
        display,
        gpu: graphics,
    })
}
