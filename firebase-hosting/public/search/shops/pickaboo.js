const pickabooBaseUrl = `https://www.pickaboo.com/catalogsearch/result/index/?product_list_limit=80`

// check pagination pickaboo
const checkPaginationPickaboo = (doc) => {
    let links = []
    const node = doc.querySelector('span.toolbar-number')
    if (node) {
        const total = parseInt(node.textContent.replace(/\D*/g, ''))
        if (!isNaN(total)) {
            const pages = Math.ceil(total / 80)
            for (let i = 2; i <= pages; i++) {
                links.push(`${getPickabooUrl()}&p=${i}`)
            }
        }
    }
    console.log(links)
    return links
}


// parse pickaboo html doc
const parsePickaboo = (doc) => {
    const products = doc.querySelectorAll('li.product-item')

    products.forEach(p => {
        let name = ''
        let link = ''
        let price = ''
        let brand = ''
        let status = ''

        const a = p.querySelector('a.product-item-link')
        if (a) {
            name = a.textContent.trim()
            const href = a.getAttribute('href')
            if (href) link = href
        }

        const priceNode = p.querySelector('[data-price-type=finalPrice]')
        if (priceNode) {
            price = priceNode.getAttribute('data-price-amount')
            status = 'in stock'
        } else {
            status = 'out of stock'
        }

        const product = {
            shop: 'Pickaboo', name, link, price, brand, status
        }
        processResult(product)
    })
}

// generate pickaboo url
const getPickabooUrl = () => {
    return `${pickabooBaseUrl}&q=${encodedQuery}`
}



// parse html string for pickaboo
const parseTextPickaboo = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parsePickaboo(doc)
    if (!isSecondary) {
        urls = checkPaginationPickaboo(doc)
    }
    return urls
}
