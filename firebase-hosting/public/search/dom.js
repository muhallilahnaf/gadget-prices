
// create output
const createOutput = () => {

    let arr = filteredResults.length == 0 ? parsedResults : filteredResults

    const cols = arr.map((product, i) => {

        const col = createNode('div', ['col', 's12', 'l6'])

        const card = createNode('div', ['card', 'blue-grey', 'darken-3', 'hoverable'])

        const cardContent = createNode('div', ['card-content', 'white-text'])
        const cardHeader = createNode('div', ['card-header'])

        if (product['brand'] !== '') {
            const brand = createNode('span', ['cyan', 'darken-4'], `Brand: ${product['brand']}`)
            cardHeader.appendChild(brand)
        }

        const shop = createNode('span', ['cyan', 'darken-3'], `Shop: ${product['shop']}`)
        cardHeader.appendChild(shop)

        const cardTitle = createNode('div', ['card-title'])

        const cardTitleLink = createNode('a', ['white-text'], product['name'])
        cardTitleLink.setAttribute('href', product['link'])
        cardTitleLink.setAttribute('target', '_blank')
        cardTitle.appendChild(cardTitleLink)

        const cardBody = createNode('div', ['card-body'])

        cardContent.appendChild(cardHeader)
        cardContent.appendChild(cardTitle)
        cardContent.appendChild(cardBody)

        const cardAction = createNode('div', ['card-action'])

        if (product['price'] !== '') {
            const price = createNode('a', ['cyan', 'black-text', 'price'], product['price'])
            price.setAttribute('href', product['link'])
            price.setAttribute('target', '_blank')
            cardAction.appendChild(price)
        }

        if (product['status'] !== '') {
            const status = createNode('span', ['white-text', 'status'], product['status'])
            cardAction.appendChild(status)
        }

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


// remove output
const removeOutput = () => {
    while (output.firstChild) {
        output.firstChild.remove()
    }
}

