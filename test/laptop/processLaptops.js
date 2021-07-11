const fs = require('fs')


const processCPU = () => {

    const laptopsStr = fs.readFileSync('./laptops.json', 'utf8')
    const cpulaptopsStr = fs.readFileSync('./cpulaptopprocess.json', 'utf8')

    const laptops = JSON.parse(laptopsStr)
    const cpusData = JSON.parse(cpulaptopsStr)

    const cpus = cpusData['data']

    let processedData = []

    const start = Date.now()

    laptops.forEach(laptop => {
        const name = laptop['name']
        const desc = laptop['description']

        const processedName = name.replace(/[\s\-]*/gm, '').toLowerCase()
        const processedDesc = desc.replace(/[\s\-]*/gm, '').toLowerCase()

        const laptopDetail = processedName + processedDesc

        const included = cpus.some(cpu => {
            const cpuRawName = cpu['rawname']

            if (laptopDetail.includes(cpuRawName)) {
                processedData.push({
                    name: name,
                    description: desc,
                    cpu: cpu['name'],
                    passmark: cpu['passmark']
                })
                return true
            }
        })

        if (!included) {
            processedData.push({
                name: name,
                description: desc,
            })
        }
    })

    const end = Date.now()

    console.log(laptops.length)
    console.log(processedData.length)

    console.log(end - start)

    const jsonStr = JSON.stringify(processedData)

    fs.writeFileSync('./processedCPUlaptops.json', jsonStr, 'utf8')

    // from 2015; remove AMD APU SOC @ 1.23GHz 123MHz Intel Core Atom Pentium Celeron
}

const processRAM = () => {

    const laptopsStr = fs.readFileSync('./laptops.json', 'utf8')
    const laptops = JSON.parse(laptopsStr)

    let processedData = []

    const start = Date.now()

    laptops.forEach(laptop => {
        const name = laptop['name']
        const desc = laptop['description']

        let ramText = ''

        if (desc !== '') {

            desc.split('|').forEach(part => {

                if (part.includes('RAM') || part.includes('DDR4') || part.includes('SODIMM')) {

                    if (part.includes('+')) {
                        // has HDD info too
                        const ramIndex = part.indexOf('RAM') || part.indexOf('DDR4') || part.indexOf('SODIMM')
                        const plusIndex = part.indexOf('+')

                        if (ramIndex < plusIndex) {
                            ramText = part.slice(0, plusIndex).trim()
                        } else {
                            ramText = part.slice(plusIndex + 1).trim()
                        }
                    } else {
                        ramText = part.trim()
                    }
                }
            })
        } else {
            const processedName = name.replace(/[\s\-]*/gm, '').toLowerCase()
            // const match = /(\d{1,2}gb).*ram/.exec(processedName) 
            // TODO: ryzen58gbram -> 58GB RAM (should be 8GB)
            const match = /(\d{1,2}gb)(?:ddr4)?ram/.exec(processedName)
            if (match) {
                ramText = match[1].toUpperCase()
                ramText += processedName.includes('ddr4') ? ' DDR4' : ''

                // ramText += processedName.includes('ddr4') ? ' DDR4' : ''
                // ramText += processedName.includes('sodimm') ? ' SODIMM' : ''
                // ramText += processedName.includes('udimm') ? ' UDIMM' : ''
                // ramText += processedName.includes('nonecc') ? ' non-ECC' : ''

                ramText += ' RAM'
            }
        }
        processedData.push({
            name: name,
            description: desc,
            RAM: ramText
        })
    })

    const end = Date.now()

    console.log(end - start)

    const jsonStr = JSON.stringify(processedData)

    fs.writeFileSync('./processedRAMlaptops.json', jsonStr, 'utf8')
}

const processStorage = () => {

    const laptopsStr = fs.readFileSync('./laptops.json', 'utf8')
    const laptops = JSON.parse(laptopsStr)

    let processedData = []

    const start = Date.now()

    laptops.forEach(laptop => {
        const name = laptop['name']
        const desc = laptop['description']

        let storageText = ''

        if (desc !== '') {

            desc.split('|').forEach(part => {

                if (part.includes('HDD') || part.includes('SSD')) {

                    if (part.includes('+')) {
                        // has HDD info too
                        const storageIndex = part.indexOf('HDD') || part.indexOf('SSD')
                        const plusIndex = part.indexOf('+')

                        if (storageIndex < plusIndex) {
                            storageText = part.slice(0, plusIndex).trim()
                        } else {
                            storageText = part.slice(plusIndex + 1).trim()
                        }
                    } else {
                        storageText = part.trim()
                    }
                }
            })
        } else {
            const processedName = name.replace(/[\s\-]*/gm, '').toLowerCase()
            // const match = /(\d{1,3}(?:gb|tb)).*?(hdd|ssd)/.exec(processedName)
            const match = /(\d{1,3}(?:gb|tb))(hdd|ssd)/.exec(processedName)
            if (match) {
                storageText = match[1].toUpperCase()

                // storageText += processedName.includes('pcie') ? ' PCIe' : ''
                // storageText += processedName.includes('nvme') ? ' NVMe' : ''
                // storageText += processedName.includes('2.5"') ? ' 2.5 inch' : ''
                // storageText += processedName.includes('2.5inch') ? ' 2.5 inch' : ''
                // storageText += processedName.includes('m.2') ? ' M.2' : ''
                // storageText += processedName.includes('sata') ? ' SATA' : ''

                storageText += ` ${match[2].toUpperCase()}`
            }
        }

        processedData.push({
            name: name,
            description: desc,
            storage: storageText
        })
    })

    const end = Date.now()

    console.log(end - start)

    const jsonStr = JSON.stringify(processedData)

    fs.writeFileSync('./processedstoragelaptops.json', jsonStr, 'utf8')
}

const processDisplay = () => {

    const laptopsStr = fs.readFileSync('./laptops.json', 'utf8')
    const laptops = JSON.parse(laptopsStr)

    let processedData = []

    let displaySizes = [
        10.1,
        11.6,
        12.3,
        12.4,
        13.3,
        13.4,
        13.5,
        13.9,
        15.6,
        16.1,
        17.3,
        13,
        14,
        15,
        16,
        17
    ]

    const start = Date.now()

    laptops.forEach(laptop => {
        const name = laptop['name']
        const desc = laptop['description']

        let displayText = ''

        if (desc !== '') {

            desc.split('|').forEach(part => {

                if (part.includes('Display') || part.includes('HD') || part.includes('inches')) {

                    if (part.includes('+')) {
                        // has HDD info too
                        const displayIndex = part.indexOf('Display') || part.indexOf('HD') || part.indexOf('inches')
                        const plusIndex = part.indexOf('+')

                        if (displayIndex < plusIndex) {
                            displayText = part.slice(0, plusIndex).trim()
                        } else {
                            displayText = part.slice(plusIndex + 1).trim()
                        }
                    } else {
                        displayText = part.trim()
                    }
                }
            })
        } else {
            const processedName = name.replace(/[\s\-]*/gm, '').toLowerCase()

            if (processedName.includes('fhd') || processedName.includes('fullhd')) {
                displayText += ' FHD'
            }
            if (processedName.includes('ips')) {
                displayText += ' IPS'
            }
            if (processedName.includes('oled')) {
                displayText += ' OLED'
            }

            displaySizes.some(size => {
                if (Number.isInteger(size)) {
                    if (processedName.includes(`${size}inch`) || processedName.includes(`${size}\"`) ||
                        processedName.includes(`${size}.0inch`) || processedName.includes(`${size}.0\"`)) {
                        displayText += ` ${size} inches`
                        return true
                    }
                }
                if (processedName.includes(`${size}inch`) || processedName.includes(`${size}\"`)) {
                    displayText += ` ${size} inches`
                    return true
                }
            })

            displayText = displayText.trim()
        }
        processedData.push({
            name: name,
            description: desc,
            display: displayText
        })
    })

    const end = Date.now()

    console.log(end - start)

    const jsonStr = JSON.stringify(processedData)

    fs.writeFileSync('./processeddisplaylaptops.json', jsonStr, 'utf8')
}

const processBrand = () => {
    const laptopsStr = fs.readFileSync('./laptops.json', 'utf8')
    const laptops = JSON.parse(laptopsStr)

    let processedData = []

    let brands = [
        'Razer',
        'HP',
        'Asus',
        'Apple',
        'Microsoft',
        'Dell',
        'MSI',
        'Lenovo',
        'Acer',
        'Gigabyte',
        'iLife',
        'Chuwi',
        'Nexstgo',
        'Avita',
        'MI',
        'Huawei',
        'Walton',
    ]

    const start = Date.now()

    laptops.forEach(laptop => {
        const name = laptop['name']

        let brand = ''

        const nameBrand = name.split(' ')[0].toLowerCase()

        brands.some(b => {
            if (nameBrand.includes(b.toLowerCase())) {
                brand = b
                return true
            }
        })
        processedData.push({
            name: name,
            brand: brand
        })
    })

    const end = Date.now()

    console.log(end - start)

    const jsonStr = JSON.stringify(processedData)

    fs.writeFileSync('./processedbrandlaptops.json', jsonStr, 'utf8')
}


const processOld = () => {
    const laptopsStr = fs.readFileSync('./laptops.json', 'utf8')
    const cpulaptopsStr = fs.readFileSync('./cpulaptopprocess.json', 'utf8')

    const laptops = JSON.parse(laptopsStr)
    const cpusData = JSON.parse(cpulaptopsStr)

    const cpus = cpusData['data']

    let displaySizes = [
        10.1,
        11.6,
        12.3,
        12.4,
        13.3,
        13.4,
        13.5,
        13.9,
        15.6,
        16.1,
        17.3,
        13,
        14,
        15,
        16,
        17
    ]

    let brands = [
        'Razer',
        'HP',
        'Asus',
        'Apple',
        'Microsoft',
        'Dell',
        'MSI',
        'Lenovo',
        'Acer',
        'Gigabyte',
        'iLife',
        'Chuwi',
        'Nexstgo',
        'Avita',
        'MI',
        'Huawei',
        'Walton',
    ]

    let processedData = []

    const start = Date.now()

    laptops.forEach(laptop => {
        const name = laptop['name']
        const desc = laptop['description']

        let laptopcpu = ''
        let date = ''
        let tdp = ''
        let base = ''
        let turbo = ''
        let core = ''
        let thread = ''
        let passmark = ''

        let ramText = ''
        let storageText = ''
        let displayText = ''
        let brand = ''

        const processedName = name.replace(/[\s\-]*/gm, '').toLowerCase()
        const processedDesc = desc.replace(/[\s\-]*/gm, '').toLowerCase()

        // CPU
        const laptopDetail = processedName + processedDesc
        const included = cpus.some(cpu => {
            const cpuRawName = cpu['rawname']
            if (laptopDetail.includes(cpuRawName)) {
                laptopcpu = cpu['name']
                date = cpu['date']
                tdp = cpu['tdp']
                base = cpu['base']
                turbo = cpu['turbo']
                core = cpu['core']
                thread = cpu['thread']
                passmark = cpu['passmark']
                return true
            }
        })

        // RAM, STORAGE, DISPLAY 
        if (desc !== '') {
            desc.split('|').forEach(part => {
                // RAM
                if (part.includes('RAM') || part.includes('DDR4') || part.includes('SODIMM')) {
                    if (part.includes('+')) {
                        // has HDD info too
                        const ramIndex = part.indexOf('RAM') || part.indexOf('DDR4') || part.indexOf('SODIMM')
                        const ramPlusIndex = part.indexOf('+')
                        if (ramIndex < ramPlusIndex) {
                            ramText = part.slice(0, ramPlusIndex).trim()
                        } else {
                            ramText = part.slice(ramPlusIndex + 1).trim()
                        }
                    } else {
                        ramText = part.trim()
                    }
                }
                // STORAGE
                if (part.includes('HDD') || part.includes('SSD')) {
                    if (part.includes('+')) {
                        // has HDD info too
                        const storageIndex = part.indexOf('HDD') || part.indexOf('SSD')
                        const storagePlusIndex = part.indexOf('+')
                        if (storageIndex < storagePlusIndex) {
                            storageText = part.slice(0, storagePlusIndex).trim()
                        } else {
                            storageText = part.slice(storagePlusIndex + 1).trim()
                        }
                    } else {
                        storageText = part.trim()
                    }
                }
                // DISPLAY
                if (part.includes('Display') || part.includes('HD') || part.includes('inches')) {
                    if (part.includes('+')) {
                        console.log('display plus', part)
                    } else {
                        displayText = part.trim()
                    }
                }
            })
        } else {
            // RAM
            const ramMatch = /(\d{1,2}gb)(?:ddr4)?ram/.exec(processedName)
            if (ramMatch) {
                ramText = ramMatch[1].toUpperCase()
                ramText += processedName.includes('ddr4') ? ' DDR4' : ''
                ramText += ' RAM'
            }
            // STORAGE
            const storageMatch = /(\d{1,3}(?:gb|tb))(hdd|ssd)/.exec(processedName)
            if (storageMatch) {
                storageText = storageMatch[1].toUpperCase()
                storageText += ` ${storageMatch[2].toUpperCase()}`
            }
            // DISPLAY
            if (processedName.includes('fhd') || processedName.includes('fullhd')) {
                displayText += ' FHD'
            }
            if (processedName.includes('ips')) {
                displayText += ' IPS'
            }
            if (processedName.includes('oled')) {
                displayText += ' OLED'
            }
            displaySizes.some(size => {
                if (Number.isInteger(size)) {
                    if (processedName.includes(`${size}inch`) || processedName.includes(`${size}\"`) ||
                        processedName.includes(`${size}.0inch`) || processedName.includes(`${size}.0\"`)) {
                        displayText += ` ${size} inches`
                        return true
                    }
                }
                if (processedName.includes(`${size}inch`) || processedName.includes(`${size}\"`)) {
                    displayText += ` ${size} inches`
                    return true
                }
            })
            displayText = displayText.trim()
        }

        // BRAND
        const nameBrand = name.split(' ')[0].toLowerCase()
        brands.some(b => {
            if (nameBrand.includes(b.toLowerCase())) {
                brand = b
                return true
            }
        })

        // PUSH DATA
        processedData.push({
            shop: laptop['shop'],
            brand: brand,
            name: name,
            link: laptop['link'],
            description: desc,
            price: laptop['price'],
            status: laptop['status'],
            cpu: laptopcpu,
            cpudate: date,
            cputdp: tdp,
            cpubase: base,
            cputurbo: turbo,
            cpucore: core,
            cputhread: thread,
            cpupassmark: passmark,
            ram: ramText,
            storage: storageText,
            display: displayText,
        })
    })

    const end = Date.now()

    console.log(laptops.length)
    console.log(processedData.length)

    console.log(end - start)

    const jsonStr = JSON.stringify(processedData)

    fs.writeFileSync('./processedlaptops.json', jsonStr, 'utf8')

}

const checkProcess = () => {
    const laptopsStr = fs.readFileSync('./processedlaptops.json', 'utf8')
    const brandlaptopsStr = fs.readFileSync('./processedbrandlaptops.json', 'utf8')
    const cpulaptopsStr = fs.readFileSync('./processedcpulaptops.json', 'utf8')
    const displaylaptopsStr = fs.readFileSync('./processeddisplaylaptops.json', 'utf8')
    const ramlaptopsStr = fs.readFileSync('./processedramlaptops.json', 'utf8')
    const storagelaptopsStr = fs.readFileSync('./processedstoragelaptops.json', 'utf8')

    const laptops = JSON.parse(laptopsStr)
    const brands = JSON.parse(brandlaptopsStr)
    const cpus = JSON.parse(cpulaptopsStr)
    const displays = JSON.parse(displaylaptopsStr)
    const rams = JSON.parse(ramlaptopsStr)
    const storages = JSON.parse(storagelaptopsStr)

    // console.log(laptops.length)
    // console.log(brands.length)
    // console.log(cpus.length)
    // console.log(displays.length)
    // console.log(rams.length)
    // console.log(storages.length)

    laptops.forEach((laptop, i) => {
        if (laptop["brand"] !== brands[i]['brand']) {
            console.log('BRAND', laptop['name'])
            console.log(laptop["brand"])
            console.log(brands[i]['brand'])
        }
        if (laptop["cpu"] !== cpus[i]['cpu']) {
            console.log('CPU', laptop['name'])
            console.log(laptop["cpu"])
            console.log(cpus[i]['cpu'])
        }
        if (laptop["ram"] !== rams[i]['RAM']) {
            console.log('RAM', laptop['name'])
            console.log(laptop["ram"])
            console.log(rams[i]['RAM'])
        }
        if (laptop["storage"] !== storages[i]['storage']) {
            console.log('STORAGE', laptop['name'])
            console.log(laptop["storage"])
            console.log(storages[i]['storage'])
        }
        if (laptop["display"] !== displays[i]['display']) {
            console.log('DISPLAY', laptop['name'])
            console.log(laptop["display"])
            console.log(displays[i]['display'])
        }
    })

}

const processNew = () => {
    const laptopsStr = fs.readFileSync('./shoplaptops.json', 'utf8')
    const cpulaptopsStr = fs.readFileSync('./passmark/passmarklaptopprocess.json', 'utf8')

    const laptops = JSON.parse(laptopsStr)
    const cpusData = JSON.parse(cpulaptopsStr)

    const cpus = cpusData['data']

    let displaySizes = [
        10.1,
        11.6,
        12.3,
        12.4,
        13.3,
        13.4,
        13.5,
        13.9,
        15.6,
        16.1,
        17.3,
        13,
        14,
        15,
        16,
        17
    ]

    let brands = [
        'Razer',
        'HP',
        'Asus',
        'Apple',
        'Microsoft',
        'Dell',
        'MSI',
        'Lenovo',
        'Acer',
        'Gigabyte',
        'iLife',
        'Chuwi',
        'Nexstgo',
        'Avita',
        'MI',
        'Huawei',
        'Walton',
    ]

    let processedData = []

    const start = Date.now()

    laptops.forEach(laptop => {
        const name = laptop['name']
        const desc = laptop['description']

        let laptopcpu = ''
        let date = ''
        let tdp = ''
        let base = ''
        let turbo = ''
        let core = ''
        let thread = ''
        let passmark = ''

        let ramText = ''
        let storageText = ''
        let displayText = ''
        let graphicsText = ''
        let brand = ''

        const processedName = name.replace(/[\s\-]*/gm, '').toLowerCase()
        const processedDesc = desc.replace(/[\s\-]*/gm, '').toLowerCase()

        // CPU
        const laptopDetail = processedName + processedDesc
        const included = cpus.some(cpu => {
            const cpuRawName = cpu['rawname']
            if (laptopDetail.includes(cpuRawName)) {
                laptopcpu = cpu['name']
                date = cpu['date']
                tdp = cpu['tdp']
                base = cpu['base']
                turbo = cpu['turbo']
                core = cpu['core']
                thread = cpu['thread']
                passmark = cpu['passmark']
                return true
            }
        })

        // RAM, STORAGE, DISPLAY, GRAPHICS 
        if (desc !== '') {
            desc.split('|').forEach(part => {
                // RAM and STORAGE
                if (ramText === '' || storageText === '') {
                    if (part.includes('+')) {
                        const plussplit = part.split('+')
                        plussplit.forEach(pluspart => {
                            if (pluspart.includes('RAM') || pluspart.includes('DDR4') || pluspart.includes('SODIMM')) {
                                ramText += ` ${pluspart.trim()}`
                            }
                            if (pluspart.includes('HDD') || pluspart.includes('SSD')) {
                                storageText += ` ${pluspart.trim()}`
                            }
                        })
                        ramText = ramText.trim()
                        storageText = storageText.trim()
                    } else {
                        if (part.includes('RAM') || part.includes('DDR4') || part.includes('SODIMM')) {
                            ramText = part.trim()
                        }
                        if (part.includes('HDD') || part.includes('SSD')) {
                            storageText = part.trim()
                        }
                    }
                }
                // DISPLAY
                const displayPart = part.toLowerCase()
                if (displayText === '' && (displayPart.includes('display') || displayPart.includes('fhd') ||
                    displayPart.includes('inches') || displayPart.includes('ips') || displayPart.includes('oled'))) {
                    displayText = part.trim()
                }
                // GRAPHICS
                const graphicsPart = part.toLowerCase()
                if (graphicsText === '' && (graphicsPart.includes('graphics') || graphicsPart.includes('nvidia') ||
                    graphicsPart.includes('geforce') || graphicsPart.includes('radeon'))) {
                    graphicsText = part.trim()
                }
            })
        } else {
            // RAM
            const ramMatch = /(\d{1,2}gb)(?:ddr4)?ram/.exec(processedName)
            if (ramMatch) {
                ramText = ramMatch[1].toUpperCase()
                ramText += processedName.includes('ddr4') ? ' DDR4' : ''
                ramText += ' RAM'
            }
            // STORAGE
            const storageMatch = /(\d{1,3}(?:gb|tb))(hdd|ssd)/.exec(processedName)
            if (storageMatch) {
                storageText = storageMatch[1].toUpperCase()
                storageText += ` ${storageMatch[2].toUpperCase()}`
            }
            // DISPLAY
            if (processedName.includes('fhd') || processedName.includes('fullhd')) {
                displayText = 'FHD'
            }
            if (processedName.includes('ips')) {
                displayText += ' IPS'
            }
            if (processedName.includes('oled')) {
                displayText += ' OLED'
            }
            displaySizes.some(size => {
                if (Number.isInteger(size)) {
                    if (processedName.includes(`${size}inch`) || processedName.includes(`${size}\"`) ||
                        processedName.includes(`${size}.0inch`) || processedName.includes(`${size}.0\"`)) {
                        displayText += ` ${size} inches`
                        return true
                    }
                }
                if (processedName.includes(`${size}inch`) || processedName.includes(`${size}\"`)) {
                    displayText += ` ${size} inches`
                    return true
                }
            })
            displayText = displayText.trim()
            // GRAPHICS
            if (processedName.includes('nvidia') || processedName.includes('geforce')) {
                graphicsText = 'Nvidia GPU'
            }
            if (processedName.includes('radeon')) {
                graphicsText = 'AMD Radeon GPU'
            }
            if (processedName.includes('uhdgraphics')) {
                graphicsText = 'Intel UHD Graphics'
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

        // PUSH DATA
        processedData.push({
            shop: laptop['shop'],
            brand: brand,
            name: name,
            link: laptop['link'],
            description: desc,
            price: laptop['price'],
            status: laptop['status'],
            cpu: laptopcpu,
            cpudate: date,
            cputdp: tdp,
            cpubase: base,
            cputurbo: turbo,
            cpucore: core,
            cputhread: thread,
            cpupassmark: passmark,
            ram: ramText,
            storage: storageText,
            display: displayText,
            gpu: graphicsText,
        })
    })

    const end = Date.now()

    console.log(laptops.length)
    console.log(processedData.length)

    console.log(end - start)

    const jsonStr = JSON.stringify(processedData)

    fs.writeFileSync('./processednewnewlaptops.json', jsonStr, 'utf8')

}

processNew()