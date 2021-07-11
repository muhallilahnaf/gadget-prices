// create output
const createOutput = () => {

    const cols = parsedResults.map((laptop, i) => {

        const col = document.createElement('div')
        col.classList.add('col', 's12', 'l6')

        const card = document.createElement('div')
        card.classList.add('card', 'blue-grey', 'darken-3', 'hoverable')

        const cardContent = document.createElement('div')
        cardContent.classList.add('card-content', 'white-text')

        const cardHeader = document.createElement('div')
        cardHeader.classList.add('card-header')

        const brand = document.createElement('span')
        brand.classList.add('cyan', 'darken-4')
        brand.textContent = `Brand: ${laptop['brand']}`

        const shop = document.createElement('span')
        shop.classList.add('cyan', 'darken-4')
        shop.textContent = `Shop: ${laptop['shop']}`

        cardHeader.appendChild(brand)
        cardHeader.appendChild(shop)

        const cardTitle = document.createElement('div')
        cardTitle.classList.add('card-title')

        const cardTitleLink = document.createElement('a')
        cardTitleLink.classList.add('white-text')
        cardTitleLink.setAttribute('href', laptop['link'])
        cardTitleLink.setAttribute('target', '_blank')
        cardTitleLink.textContent = laptop['name']

        cardTitle.appendChild(cardTitleLink)

        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

        if (laptop['cpu'] !== '') {
            const cpuContent = document.createElement('p')
            cpuContent.classList.add('cpu-content')

            const cpu = document.createElement('p')
            cpu.classList.add('cpu')

            const cpuIcon = document.createElement('i')
            cpuIcon.classList.add('fas', 'fa-microchip')
            cpu.appendChild(cpuIcon)

            const cpuText = document.createTextNode(`${laptop['cpu']}  `)
            cpu.appendChild(cpuText)

            const cpuButton = document.createElement('span')
            cpuButton.classList.add('cpu-button')
            cpuButton.setAttribute('data-cpu-button', `${i + 1}`)
            cpuButton.textContent = '(see details)'

            cpu.appendChild(cpuButton)

            const cpuDetails = document.createElement('ul')
            cpuDetails.classList.add('cpu-details')
            cpuDetails.setAttribute('data-cpu-details', `${i + 1}`)

            if (laptop['cpucore'] !== '' && laptop['cputhread'] !== '') {
                const cpucore = document.createElement('li')
                cpucore.textContent = `cores/threads: ${laptop['cpucore']}/${laptop['cputhread']}`
                cpuDetails.appendChild(cpucore)
            }

            if (laptop['cpupassmark'] !== '') {
                const cpupassmark = document.createElement('li')
                cpupassmark.textContent = `Passmark score: ${laptop['cpupassmark']}`
                cpuDetails.appendChild(cpupassmark)
            }

            if (laptop['cpubase'] !== '' && laptop['cputurbo'] !== '') {
                const cpuclock = document.createElement('li')
                cpuclock.textContent = `clock: ${laptop['cpubase']} MHz (base), ${laptop['cputurbo']} MHz (turbo)`
                cpuDetails.appendChild(cpuclock)
            }

            if (laptop['cpudate'] !== '') {
                const cpudate = document.createElement('li')
                cpudate.textContent = `CPU released: ${laptop['cpudate']}`
                cpuDetails.appendChild(cpudate)
            }

            if (laptop['cputdp'] !== '') {
                const cputdp = document.createElement('li')
                cputdp.textContent = `TDP: ${laptop['cputdp']}`
                cpuDetails.appendChild(cputdp)
            }

            cpuContent.appendChild(cpu)
            cpuContent.appendChild(cpuDetails)

            cardBody.appendChild(cpuContent)
        }

        if (laptop['ram'] !== '') {
            const ram = document.createElement('p')
            ram.classList.add('ram')

            const ramIcon = document.createElement('i')
            ramIcon.classList.add('fas', 'fa-memory')
            ram.appendChild(ramIcon)

            const ramText = document.createTextNode(laptop['ram'])
            ram.appendChild(ramText)

            cardBody.appendChild(ram)
        }

        if (laptop['storage'] !== '') {
            const storage = document.createElement('p')
            storage.classList.add('storage')

            const storageIcon = document.createElement('i')
            storageIcon.classList.add('fas', 'fa-hdd')
            storage.appendChild(storageIcon)

            const storageText = document.createTextNode(laptop['storage'])
            storage.appendChild(storageText)

            cardBody.appendChild(storage)
        }

        if (laptop['display'] !== '') {
            const display = document.createElement('p')
            display.classList.add('display')

            const displayIcon = document.createElement('i')
            displayIcon.classList.add('fas', 'fa-laptop')
            display.appendChild(displayIcon)

            const displayText = document.createTextNode(laptop['display'])
            display.appendChild(displayText)

            cardBody.appendChild(display)
        }

        if (laptop['gpu'] !== '') {
            const gpu = document.createElement('p')
            gpu.classList.add('gpu')

            const gpuIcon = document.createElement('i')
            gpuIcon.classList.add('fas', 'fa-video')
            gpu.appendChild(gpuIcon)

            const gpuText = document.createTextNode(laptop['gpu'])
            gpu.appendChild(gpuText)

            cardBody.appendChild(gpu)
        }

        if (laptop['description'] !== '') {
            const description = document.createElement('p')
            description.classList.add('description')

            const descButton = document.createElement('span')
            descButton.classList.add('description-button')
            descButton.setAttribute('data-description-button', `${i + 1}`)
            descButton.textContent = 'see description'

            const descDetails = document.createElement('p')
            descDetails.classList.add('description-details')
            descDetails.setAttribute('data-description', `${i + 1}`)
            descDetails.textContent = laptop['description']

            description.appendChild(descButton)
            description.appendChild(descDetails)

            cardBody.appendChild(description)
        }

        cardContent.appendChild(cardHeader)
        cardContent.appendChild(cardTitle)
        cardContent.appendChild(cardBody)

        const cardAction = document.createElement('div')
        cardAction.classList.add('card-action')

        const price = document.createElement('a')
        price.classList.add('cyan', 'black-text', 'price')
        price.setAttribute('href', laptop['link'])
        price.setAttribute('target', '_blank')
        price.textContent = laptop['price']

        const status = document.createElement('span')
        status.classList.add('white-text', 'status')
        status.textContent = laptop['status']

        cardAction.appendChild(price)
        cardAction.appendChild(status)

        card.appendChild(cardContent)
        card.appendChild(cardAction)

        col.appendChild(card)

        return col
    })

    for (let i = 0; i < cols.length; i += 2) {
        const first = cols[i]
        const second = cols[i + 1]

        const row = document.createElement('div')
        row.classList.add('row')
        row.appendChild(first)
        if (second) row.appendChild(second)

        output.appendChild(row)
    }
}


// remove output
const removeOutput = () => {
    while (output.firstChild) {
        output.firstChild.remove()
    }
}
