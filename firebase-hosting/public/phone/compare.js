// create table
const createCompareTable = () => {
    const compareItems = JSON.parse(sessionStorage.getItem('compareItems'))
    const table = createNode('table', ['blue-grey', 'darken-3', 'white-text', 'centered'])
    table.setAttribute('id', 'compare-table')

    const thead = createTableHead(compareItems)
    table.appendChild(thead)

    const tbody = createNode('tbody')

    const price = createRow(compareItems, 'price', 'price')
    tbody.appendChild(price)
    const shop = createRow(compareItems, 'shop', 'shop')
    tbody.appendChild(shop)

    const date = createRow(compareItems, 'date', 'date')
    tbody.appendChild(date)

    const chipset = createRow(compareItems, 'chipset', 'chipset')
    tbody.appendChild(chipset)

    const os = createRow(compareItems, 'OS', 'os')
    tbody.appendChild(os)

    const memory = createRow(compareItems, 'memory options', 'memory')
    tbody.appendChild(memory)
    const memoryslot = createRow(compareItems, 'memory slot', 'memoryslot')
    tbody.appendChild(memoryslot)
    const memoryspeed = createRow(compareItems, 'memory speed', 'memoryspeed')
    tbody.appendChild(memoryspeed)

    const height = createRow(compareItems, 'height', 'height')
    tbody.appendChild(height)
    const thiccness = createRow(compareItems, 'thickness', 'thiccness')
    tbody.appendChild(thiccness)
    const weight = createRow(compareItems, 'weight', 'weight')
    tbody.appendChild(weight)
    const body = createRow(compareItems, 'body', 'body')
    tbody.appendChild(body)

    const display = createRow(compareItems, 'display type', 'display')
    tbody.appendChild(display)
    const displaysize = createRow(compareItems, 'display size', 'displaysize')
    tbody.appendChild(displaysize)
    const displayres = createRow(compareItems, 'display res.', 'displayres')
    tbody.appendChild(displayres)
    const displayppi = createRow(compareItems, 'display density', 'displayppi')
    tbody.appendChild(displayppi)
    const displayprotecc = createRow(compareItems, 'display protection', 'displayprotecc')
    tbody.appendChild(displayprotecc)


    const rearcam = createRow(compareItems, 'rear camera', 'rearcam')
    tbody.appendChild(rearcam)
    const rearvideo = createRow(compareItems, 'rear video', 'rearvideo')
    tbody.appendChild(rearvideo)
    const rearvideostable = createRow(compareItems, 'video stabilization (rear)', 'rearvideostable')
    tbody.appendChild(rearvideostable)

    const frontcam = createRow(compareItems, 'front camera', 'frontcam')
    tbody.appendChild(frontcam)
    const frontvideo = createRow(compareItems, 'front video', 'frontvideo')
    tbody.appendChild(frontvideo)
    const frontvideostable = createRow(compareItems, 'video stabilization (front)', 'frontvideostable')
    tbody.appendChild(frontvideostable)

    const battery = createRow(compareItems, 'battery', 'battery')
    tbody.appendChild(battery)
    const charging = createRow(compareItems, 'charging speed', 'charging')
    tbody.appendChild(charging)

    const usb = createRow(compareItems, 'usb', 'usb')
    tbody.appendChild(usb)
    const hpjack = createRow(compareItems, 'headphone jack', 'hpjack')
    tbody.appendChild(hpjack)
    const fingerprint = createRow(compareItems, 'fingerprint', 'fingerprint')
    tbody.appendChild(fingerprint)
    const sensors = createRow(compareItems, 'sensors', 'sensors')
    tbody.appendChild(sensors)

    const sim = createRow(compareItems, 'SIM card', 'sim')
    tbody.appendChild(sim)
    const wlan = createRow(compareItems, 'wifi', 'wlan')
    tbody.appendChild(wlan)
    const bluetooth = createRow(compareItems, 'bluetooth', 'bluetooth')
    tbody.appendChild(bluetooth)


    table.appendChild(tbody)

    document.querySelector('.table-container').appendChild(table)
    // $(() => $('table').floatThead({
    //     position: 'absolute',
    // }))
}


// create td node
const createtd = (scope, text) => {
    const td = document.createElement('td')
    if (scope) {
        td.setAttribute('scope', scope)
        td.classList.add('cyan', 'darken-4')
    }
    if (text) td.textContent = text
    return td
}


// create tr node
const createtr = () => document.createElement('tr')


// create th node
const createth = (scope, text) => {
    const th = document.createElement('th')
    if (scope) th.setAttribute('scope', scope)
    if (text) th.textContent = text
    return th
}


// create thead node
const createTableHead = (items) => {
    const thead = createNode('thead', ['cyan', 'darken-4'])
    const headtr = createtr()

    const headtdEmpty = createtd()
    headtr.appendChild(headtdEmpty)

    items.forEach(item => {
        const node = createth('col', item['name'])
        headtr.appendChild(node)
    })

    thead.appendChild(headtr)
    return thead
}


// create table rows
const createRow = (items, header, key) => {
    const tr = createtr()

    const headertd = createtd('row', header)
    tr.appendChild(headertd)

    items.forEach(item => {
        const node = createtd(undefined, item[key])
        tr.appendChild(node)
    })

    return tr
}


// create table on load
document.addEventListener('DOMContentLoaded', createCompareTable)
