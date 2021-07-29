// pipeline:
// define all
// internalmemory -> memory
// wlan normal
// rearcam apple fix
// add infinix, tecno phones to db


// create output
const createOutput = () => {

    let arr = filteredResults.length == 0 ? parsedResults : filteredResults

    const cols = arr.map((phone, i) => {

        const col = createNode('div', ['col', 's12', 'l6'])

        const card = createNode('div', ['card', 'blue-grey', 'darken-3', 'hoverable'])

        const cardContent = createNode('div', ['card-content', 'white-text'])
        const cardHeader = createNode('div', ['card-header'])

        if (phone['brand'] !== '') {
            const brand = createNode('span', ['cyan', 'darken-4'], `Brand: ${phone['brand']}`)
            cardHeader.appendChild(brand)
        }

        const shop = createNode('span', ['cyan', 'darken-4'], `Shop: ${phone['shop']}`)
        cardHeader.appendChild(shop)

        const compare = createNode('button', ['compare-button', 'right', 'tooltipped', 'btn-floating', 'btn-small', 'light-blue', 'darken-4'])
        const compareIcon = createNode('i', ['material-icons'], 'add')
        compare.appendChild(compareIcon)
        compare.setAttribute('data-position', 'top')
        compare.setAttribute('data-tooltip', 'add to compare')
        compare.setAttribute('data-compare', `${i}`)
        compare.addEventListener('click', () => {
            const icon = compare.querySelector('i')
            if (icon.textContent === 'add') {
                compareItemAdd(`${i}`, compare, icon)
                checkCompareFloating()
                return
            }
            compareItemRemove(`${i}`, compare, icon)
            checkCompareFloating()
        })
        cardHeader.appendChild(compare)

        const cardTitle = createNode('div', ['card-title'])

        const cardTitleLink = createNode('a', ['white-text'], phone['name'])
        cardTitleLink.setAttribute('href', phone['link'])
        cardTitleLink.setAttribute('target', '_blank')

        cardTitle.appendChild(cardTitleLink)

        const cardBody = createNode('div', ['card-body'])

        const compact = createNode('div', ['card-body-compact', 'row'])

        const compactCol = createNode('div', ['col', 's12'])

        if (phone['chipset'] !== '') {
            const compactChipset = createNode('p', ['compact-chipset'], phone['chipset'])
            compactCol.appendChild(compactChipset)
        }
        if (phone['os'] !== '') {
            const compactOs = createNode('p', ['compact-os'], phone['os'])
            compactCol.appendChild(compactOs)
        }
        if (phone['internalmemory'] !== '') {
            const compactMemory = createNode('p', ['compact-memory'], phone['internalmemory'])
            compactCol.appendChild(compactMemory)
        }
        if (phone['display'] !== '') {
            let compactDisplayText = phone['display']
            compactDisplayText += phone['displaysize'] !== '' ? ` ${phone['displaysize']}"` : ''
            compactDisplayText += phone['displayres'] !== '' ? ` ${phone['displayres']}p` : ''
            const compactDisplay = createNode('p', ['compact-display'], compactDisplayText)
            compactCol.appendChild(compactDisplay)
        }
        if (phone['rearcam'] !== '') {
            const compactRearCam = createNode('p', ['compact-rearcam'], phone['rearcam'])
            compactCol.appendChild(compactRearCam)
        }
        if (phone['frontcam'] !== '') {
            const compactFrontCam = createNode('p', ['compact-frontcam'], phone['frontcam'])
            compactCol.appendChild(compactFrontCam)
        }
        if (phone['battery'] !== '') {
            const compactBattery = createNode('p', ['compact-battery'], `${phone['battery']} mAh`)
            compactCol.appendChild(compactBattery)
        }

        compact.appendChild(compactCol)
        cardBody.appendChild(compact)

        const full = createNode('div', ['card-body-full', 'hide'])

        if (phone['date'] !== '') {
            const dateIconClsList = ['fas', 'fa-calendar', 'fa-2x']
            const dateMainList = [
                {
                    class: 'date',
                    content: `Released: ${phone['date']}`,
                }
            ]
            const dateContent = createContentNode('date', dateIconClsList, dateMainList, i)
            full.appendChild(dateContent)
            full.appendChild(createNode('div', ['divider']))
        }

        if (phone['chipset'] !== '') {
            const chipsetIconClsList = ['fas', 'fa-microchip', 'fa-2x']
            const chipsetMainList = [
                {
                    class: 'chipset',
                    content: phone['chipset'],
                    button: '(see details)',
                    details: [
                        {
                            value: phone['antutuv8'],
                            class: ['antutu'],
                            content: `Antutu score: ${phone['antutuv8']}`
                        },
                        {
                            value: phone['geekbench5.1'],
                            class: ['geekbench'],
                            content: `Geekbench score: ${phone['geekbench5.1']}`
                        }
                    ]
                }
            ]
            const chipsetContent = createContentNode('chipset', chipsetIconClsList, chipsetMainList, i)
            full.appendChild(chipsetContent)
            full.appendChild(createNode('div', ['divider']))
        }

        if (phone['os'] !== '') {
            const osIconClsList = ['fab', 'fa-android', 'fa-2x']
            const osMainList = [
                {
                    class: 'os',
                    content: phone['os'],
                }
            ]
            const osContent = createContentNode('os', osIconClsList, osMainList, i)
            full.appendChild(osContent)
            full.appendChild(createNode('div', ['divider']))
        }

        if (phone['memory'] !== '') {
            const memoryIconClsList = ['fas', 'fa-memory', 'fa-2x']
            const memoryMainList = [
                {
                    class: 'memory',
                    content: phone['memory'],
                },
                {
                    class: 'memory-speed',
                    content: phone['memoryspeed'],
                }
            ]
            const memoryContent = createContentNode('memory', memoryIconClsList, memoryMainList, i)
            full.appendChild(memoryContent)
            full.appendChild(createNode('div', ['divider']))
        }

        if (phone['display'] !== '') {
            const displayIconClsList = ['fas', 'fa-mobile-alt', 'fa-2x']
            let displayText = phone['display']
            displayText += phone['displaysize'] !== '' ? ` ${phone['displaysize']}"` : ''
            displayText += phone['displayres'] !== '' ? ` ${phone['displayres']}p` : ''
            let displayDetailsText = `${phone['displayppi']} PPI`
            displayDetailsText += phone['displayprotecc'] !== '' ? ` ${phone['displayprotecc']}` : ''
            const displayMainList = [
                {
                    class: 'display',
                    content: displayText,
                },
                {
                    class: 'display-details',
                    content: displayDetailsText,
                }
            ]
            const displayContent = createContentNode('display', displayIconClsList, displayMainList, i)
            full.appendChild(displayContent)
            full.appendChild(createNode('div', ['divider']))
        }

        if (phone['rearcam'] !== '') {
            const cameraIconClsList = ['fas', 'fa-camera', 'fa-2x']
            const cameraMainList = [
                {
                    class: 'rearcam',
                    content: phone['rearcam'],
                    button: '(see details)',
                    details: [
                        {
                            value: phone['rearvideo'],
                            class: ['rearvideo'],
                            content: `video: ${phone['rearvideo']}`
                        },
                        {
                            value: phone['rearvideostable'],
                            class: ['rearvideostable'],
                            content: `stabilization: ${phone['rearvideostable']}`
                        }
                    ]
                },
                {
                    class: 'frontcam',
                    content: phone['frontcam'],
                    button: '(see details)',
                    details: [
                        {
                            value: phone['frontvideo'],
                            class: ['frontvideo'],
                            content: `video: ${phone['frontvideo']}`
                        },
                        {
                            value: phone['frontvideostable'],
                            class: ['frontvideostable'],
                            content: `stabilization: ${phone['frontvideostable']}`
                        }
                    ]
                }
            ]
            const cameraContent = createContentNode('camera', cameraIconClsList, cameraMainList, i)
            full.appendChild(cameraContent)
            full.appendChild(createNode('div', ['divider']))
        }

        if (phone['battery'] !== '') {
            const batteryIconClsList = ['fas', 'fa-battery-full', 'fa-2x']
            const batteryMainList = [
                {
                    class: 'battery',
                    content: `${phone['battery']} mAh`,
                },
                {
                    class: 'battery-charging',
                    content: `${phone['charging']} charging`,
                }
            ]
            const batteryContent = createContentNode('battery', batteryIconClsList, batteryMainList, i)
            full.appendChild(batteryContent)
            full.appendChild(createNode('div', ['divider']))
        }

        if (phone['sim'] !== '') {
            const connectivityIconClsList = ['fas', 'fa-network-wired', 'fa-2x']
            const connectivityMainList = [
                {
                    class: 'sim',
                    content: `SIM: ${phone['sim']}`,
                },
                {
                    class: 'connectivity',
                    content: '',
                    button: '(see more connectivity)',
                    details: [
                        {
                            value: phone['wlan'],
                            class: ['wlan'],
                            content: `WiFi: ${phone['wlan']}`
                        },
                        {
                            value: phone['bluetooth'],
                            class: ['bluetooth'],
                            content: `BlueTooth: ${phone['bluetooth']}`
                        }
                    ]
                }
            ]
            const connectivityContent = createContentNode('connectivity', connectivityIconClsList, connectivityMainList, i)
            full.appendChild(connectivityContent)
            full.appendChild(createNode('div', ['divider']))
        }

        if (phone['usb'] !== '') {
            const sensorIconClsList = ['fas', 'fa-fingerprint', 'fa-2x']
            const sensorMainList = [
                {
                    class: 'fingerprint',
                    content: `fingerprint: ${phone['fingerprint']}`,
                },
                {
                    class: 'usb',
                    content: `USB: ${phone['usb']}`,
                },
                {
                    class: 'hpjack',
                    content: `headphone jack: ${phone['hpjack']}`,
                },
                {
                    class: 'sensor-port',
                    content: '',
                    button: '(see more sensors)',
                    details: [
                        {
                            value: phone['sensors'],
                            class: ['sensors'],
                            content: `sensors: ${phone['sensors']}`
                        },
                    ]
                }
            ]
            const sensorContent = createContentNode('sensor-port', sensorIconClsList, sensorMainList, i)
            full.appendChild(sensorContent)
            full.appendChild(createNode('div', ['divider']))
        }

        if (phone['height'] !== '') {
            const bodyIconClsList = ['fas', 'fa-mobile', 'fa-2x']
            const bodyMainList = [
                {
                    class: 'body',
                    content: phone['body'],
                },
                {
                    class: 'height',
                    content: `height: ${phone['height']}mm`,
                },
                {
                    class: 'thiccness',
                    content: `thickness: ${phone['thiccness']}mm`,
                },
                {
                    class: 'weight',
                    content: `weight: ${phone['weight']}g`,
                }
            ]
            const bodyContent = createContentNode('body', bodyIconClsList, bodyMainList, i)
            full.appendChild(bodyContent)
        }

        cardBody.appendChild(full)

        cardContent.appendChild(cardHeader)
        cardContent.appendChild(cardTitle)
        cardContent.appendChild(cardBody)

        const cardAction = createNode('div', ['card-action'])

        if (phone['price'] !== '') {
            const price = createNode('a', ['cyan', 'black-text', 'price'], phone['price'])
            price.setAttribute('href', phone['link'])
            price.setAttribute('target', '_blank')
            cardAction.appendChild(price)
        }

        // const status = createNode('span', ['white-text', 'status'], phone['status'])
        // cardAction.appendChild(status)

        card.appendChild(cardContent)
        card.appendChild(cardAction)

        col.appendChild(card)

        return col
    })

    for (let i = 0; i < cols.length; i += 2) {
        const first = cols[i]
        const second = cols[i + 1]

        const row = createNode('div', ['row'])
        row.appendChild(first)
        if (second) row.appendChild(second)

        output.appendChild(row)
    }
}


// create element with class and textContent
const createNode = (tag, classes, text) => {
    const element = document.createElement(tag)
    if (classes) element.classList.add(...classes)
    if (text) element.textContent = text
    return element
}


// create content node
// content ('cls')
// -icon ([clslist])
// --main [{cls, content, btn, [details}cls, value, content}]}]
const createContentNode = (contentCls, iconClsList, mainList, i) => {
    const content = createNode('div', [`${contentCls}-content`, 'row'])

    const iconDiv = createNode('div', ['col', 's1'])
    const icon = createNode('i', iconClsList)

    iconDiv.appendChild(icon)
    content.appendChild(iconDiv)

    const contentDiv = createNode('div', ['col', 's10', 'offset-s1'])

    mainList.forEach(item => {
        const main = createNode('p', [item['class']])
        const text = document.createTextNode(`${item['content']} `)
        main.appendChild(text)
        if (item['button']) {
            const detailButton = createNode('span', [`${item['class']}-button`, 'detail-button'], item['button'])
            detailButton.setAttribute(`data-${item['class']}-button`, `${i}`)
            main.appendChild(detailButton)
        }
        contentDiv.appendChild(main)

        if (item['details']) {
            const details = createNode('ul', [`${item['class']}-details`])
            details.setAttribute(`data-${item['class']}-details`, `${i}`)

            item['details'].forEach(detail => {
                if (detail['value'] !== '') {
                    const value = createNode('li', detail['class'], detail['content'])
                    details.appendChild(value)
                }
            })
            contentDiv.appendChild(details)
        }
    })
    content.appendChild(contentDiv)
    return content
}


// remove output
const removeOutput = () => {
    while (output.firstChild) {
        output.firstChild.remove()
    }
}

