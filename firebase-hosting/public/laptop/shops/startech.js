// check pagination startech
const checkPaginationStartech = (doc) => {
    let links = []

    const pagination = doc.querySelector('ul.pagination')
    if (pagination) {
        const nodes = pagination.querySelectorAll('li a')
        if (nodes.length > 0) {
            nodes.forEach(n => {
                const link = n.getAttribute('href')
                if (link) links.push(link)
            })
            links = [...new Set(links)]
        }
    }
    return links
}


// parse startech html doc
const parseStartech = (doc) => {
    const products = doc.querySelectorAll('.p-item-inner')

    products.forEach(product => {
        let name = ''
        let link = ''
        let description = ''
        let price = ''
        let status = ''

        const a = product.querySelector('h4.p-item-name a')
        if (a) {
            name = a.textContent.trim()
            const href = a.getAttribute('href')
            if (href) link = href
        }

        const descList = product.querySelectorAll('div.short-description li')
        let dArr = []
        descList.forEach(li => {
            dArr.push(li.textContent.trim())
        })
        description = dArr.join(' | ')

        const priceNode = product.querySelector('div.p-item-price span')
        if (priceNode) price = priceNode.textContent.trim()

        const statusEle = product.querySelector('.actions .st-btn')
        if (statusEle) {
            if (statusEle.classList.contains('stock-status')) {
                status = statusEle.textContent.trim()
            } else {
                status = 'in stock'
            }
        }

        const laptop = {
            shop: 'startech', name, link, description, price, status
        }
        processResult(laptop)
    })
}


// generate startech url
const getStartechUrl = (data) => {
    // https://www.startech.com.bd/laptop-notebook/laptop?filter_status=7&filter_price=35000-65000&sort=p.price&order=ASC&limit=90
    let baseUrlStartech = 'https://www.startech.com.bd/laptop-notebook/laptop?limit=90'

    baseUrlStartech += `&filter_price=${data.minprice}-${data.maxprice}`
    data.availability === 'all' ? baseUrlStartech += '' : baseUrlStartech += '&filter_status=7'

    return baseUrlStartech
}


// parse html string for startech
const parseTextStartech = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parseStartech(doc)
    if (!isSecondary) {
        urls = checkPaginationStartech(doc)
    }
    return urls
}
