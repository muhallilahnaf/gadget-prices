const vivoBaseUrl = 'https://vivo.pickaboo.com/products.html?product_list_limit=80'

// check pagination vivo
const checkPaginationVivo = (doc) => {
    let links = []
    // 1 page gives 80 phones, so no need to check pagination for now
    return links
}


// parse vivo html doc
const parseVivo = (doc) => {
    const products = doc.querySelectorAll('li.product-item')

    products.forEach(product => {
        let name = ''
        let link = ''
        let price = ''

        const a = product.querySelector('a.product-item-link')
        if (a) {
            name = a.textContent.trim()
            const href = a.getAttribute('href')
            if (href) link = href
        }

        const priceNode = product.querySelector('[data-price-type=finalPrice]')
        if (priceNode) price = priceNode.getAttribute('data-price-amount')

        const phone = {
            shop: 'vivo', name, link, price
        }
        processResult(phone)
    })
}


// parse html string for vivo
const parseTextVivo = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parseVivo(doc)
    if (!isSecondary) {
        urls = checkPaginationVivo(doc)
    }
    return urls
}
