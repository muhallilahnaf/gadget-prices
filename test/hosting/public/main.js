// input validation
const validation = () => {
    priceError.textContent = ''
    shopError.textContent = ''
    const tmpMin = parseInt(minPrice.value)
    const tmpMax = parseInt(maxPrice.value)

    if (isNaN(tmpMin)) {
        priceError.textContent = 'minimum price required and should be a number'
        return false
    }
    if (isNaN(tmpMax)) {
        priceError.textContent = 'maximum price required and should be a number'
        return false
    }
    if (!startech.checked && !ryans.checked && !techland.checked) {
        shopError.textContent = 'select at least 1 shop'
        return false
    }

    const shops = []
    if (startech.checked) shops.push('startech')
    if (ryans.checked) shops.push('ryans')
    if (techland.checked) shops.push('techland')

    return {
        minprice: tmpMin,
        maxprice: tmpMax,
        shops: shops,
        availability: all.checked ? 'all' : 'in-stock',
    }
}


// get array of fetch promises
const getFetchs = (urls) => {
    console.log(urls)
    return urls.map(url => fetch(proxy + url, {
        headers: headers,
        referrer: ''
    }))
}


// process responses
const processResponses = (responses, isSecondary) => {
    let urls = []
    let resDict = {
        startech: [],
        ryans: [],
        techland: []
    }
    let promiseArrArr = []
    let arrPosTracker = {}

    responses.forEach(response => {
        if (response.status === 200) {
            for (const [key, value] of Object.entries(resDict)) {
                if (response.url.includes(key)) resDict[key].push(response.text())
            }
        } else {
            console.log(status, response.statusText)
        }
    })

    for (const [key, value] of Object.entries(resDict)) {
        if (value.length > 0) {
            promiseArrArr.push(value)
            arrPosTracker[key] = promiseArrArr.length - 1
        }
    }

    const biggerPromise = Promise.all(promiseArrArr.map(arr => Promise.all(arr)))

    biggerPromise.then(resultArrArr => {

        for (const [key, value] of Object.entries(arrPosTracker)) {
            if (key === 'startech') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextStartech(text, isSecondary))
                })
            }
            if (key === 'ryans') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextRyans(text, isSecondary))
                })
            }
            if (key === 'techland') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextTechland(text, isSecondary))
                })
            }
        }

        if (!isSecondary && urls.length > 0) {
            secondaryFetch(urls)
        } else {
            console.log(parsedResults)
            fetchEnd()
        }
    }).catch(e => console.log(e))
}


// create table
const createTable = () => {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tbody = document.createElement('tbody')

    const thr = document.createElement('tr')
    tableHeaders.forEach(header => {
        const th = document.createElement('th')
        th.setAttribute('scope', 'col')
        th.textContent = header
        thr.appendChild(th)
    })
    thead.appendChild(thr)

    parsedResults.forEach(laptop => {
        const tr = document.createElement('tr')

        const shop = document.createElement('td')
        const a = document.createElement('a')
        a.textContent = laptop['shop']
        a.setAttribute('href', laptop['link'])
        shop.appendChild(a)

        const brand = document.createElement('td')
        brand.textContent = laptop['brand']

        const name = document.createElement('td')
        name.textContent = laptop['name']

        const price = document.createElement('td')
        price.textContent = laptop['price']

        const status = document.createElement('td')
        status.textContent = laptop['status']

        const cpu = document.createElement('td')

        const cpuname = document.createElement('p')
        cpuname.textContent = laptop['cpu']
        const cpudate = document.createElement('p')
        cpudate.textContent = `date: ${laptop['cpudate']}`
        const cputdp = document.createElement('p')
        cputdp.textContent = `TDP: ${laptop['cputdp']}`
        const cpubase = document.createElement('p')
        cpubase.textContent = `base clock: ${laptop['cpubase']}`
        const cputurbo = document.createElement('p')
        cputurbo.textContent = `turbo clock: ${laptop['cputurbo']}`
        const cpucore = document.createElement('p')
        cpucore.textContent = `cores: ${laptop['cpucore']}`
        const cputhread = document.createElement('p')
        cputhread.textContent = `threads: ${laptop['cputhread']}`
        const cpupassmark = document.createElement('p')
        cpupassmark.textContent = `passmark score: ${laptop['cpupassmark']}`

        cpu.appendChild(cpuname)
        cpu.appendChild(cpudate)
        cpu.appendChild(cputdp)
        cpu.appendChild(cpubase)
        cpu.appendChild(cputurbo)
        cpu.appendChild(cpucore)
        cpu.appendChild(cputhread)
        cpu.appendChild(cpupassmark)

        const ram = document.createElement('td')
        ram.textContent = laptop['ram']

        const storage = document.createElement('td')
        storage.textContent = laptop['storage']

        const display = document.createElement('td')
        display.textContent = laptop['display']

        const gpu = document.createElement('td')
        gpu.textContent = laptop['gpu']

        const description = document.createElement('td')
        description.textContent = laptop['description']

        tr.appendChild(shop)
        tr.appendChild(brand)
        tr.appendChild(name)
        tr.appendChild(price)
        tr.appendChild(status)
        tr.appendChild(cpu)
        tr.appendChild(ram)
        tr.appendChild(storage)
        tr.appendChild(display)
        tr.appendChild(gpu)
        tr.appendChild(description)

        tbody.appendChild(tr)
    })
    table.appendChild(thead)
    table.appendChild(tbody)
    tableDiv.appendChild(table)
}


// fetch end
const fetchEnd = () => {
    sortTableContainer.style.visibility = 'visible'
    createTable()
    stopLoading()
}


// secondary fetch
const secondaryFetch = (urls) => {
    let secondaryPromises = getFetchs(urls)
    Promise.all(secondaryPromises).then(responses => {
        processResponses(responses, true)
    }).catch(e => console.log(e))
}


// primary fetch
const primaryFetch = (data) => {
    let urls = []
    data.shops.forEach(shop => {
        switch (shop) {
            case 'startech':
                urls.push(getStartechUrl(data))
                break
            case 'ryans':
                ryansStartUrl = getRyansUrl(data)
                urls.push(ryansStartUrl)
                break
            case 'techland':
                urls.push(getTechlandUrl(data))
                break
            default:
                break
        }
    })

    let primaryPromises = getFetchs(urls)
    Promise.all(primaryPromises).then(responses => {
        processResponses(responses, false)
    }).catch(e => console.log(e))
}


// remove table
const removeTable = () => {
    while (tableDiv.firstChild) {
        tableDiv.firstChild.remove()
    }
}


// reset global vars
const resetGlobals = () => {
    intervalId = null
    ryansStartUrl = ''
    parsedResults = []
    sortTableContainer.style.visibility = 'hidden'
    removeTable()
}


// `GET` click
buttonGet.addEventListener('click', async () => {
    const formData = validation()
    if (formData) {
        resetGlobals()
        startLoading()
        primaryFetch(formData)
    }
})


// loading screen start
const startLoading = () => {
    buttonGet.setAttribute('disabled', 'true')
    document.body.style.opacity = 0.5
    loadingScreen.style.visibility = 'visible'
    let l = 0
    intervalId = setInterval(() => {
        l === 3 ? l = 0 : l++
        loadingScreenText.textContent = `loading${'.'.repeat(l)}`
    }, 500);
}


// loading screen end
const stopLoading = () => {
    buttonGet.removeAttribute('disabled')
    document.body.style.opacity = 1
    loadingScreen.style.visibility = 'hidden'
    clearInterval(intervalId)
}


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

    // PUSH DATA
    parsedResults.push({
        shop: laptop['shop'],
        brand,
        name,
        link: laptop['link'],
        description: desc,
        price: laptop['price'],
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
