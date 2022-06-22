// check pagination ryans
const checkPaginationRyans = (doc) => {
    let links = []

    const pagination = doc.querySelectorAll('.pagination li')
    if (pagination) {
        const len = pagination.length - 2

        for (let i = 2; i <= len; i++) {
            links.push(ryansStartUrl.replace(/page=1/, `page=${i}`))
        }
    }
    return links
}


// parse ryans html doc
const parseRyans = (doc) => {
    const products = doc.querySelectorAll('.product-home-card.product-category-card .category-single-product')

    products.forEach(product => {
        let name = ''
        let link = ''
        let description = ''
        let price = ''
        let status = ''

        const a = product.querySelector('p.card-text a[title]')
        if (a) {
            const dataTitle = a.getAttribute('data-bs-original-title')
            if (dataTitle) {
                name = dataTitle.trim()
            } else {
                name = a.textContent.trim()
            }
            const href = a.getAttribute('href')
            if (href) link = href
        }

        const descList = product.querySelectorAll('.short-desc-attr li')
        let dArr = []
        descList.forEach(li => {
            dArr.push(li.textContent.trim())
        })
        description = dArr.join(' | ')

        const priceNode = product.querySelector('p.pr-text')
        if (priceNode) {
            let priceChild = priceNode.firstChild
            let prices = []

            while (priceChild) {
                if (priceChild.nodeType == 3) prices.push(priceChild.data)
                priceChild = priceChild.nextSibling
            }

            price = prices.join('').trim()
        }

        status = 'in stock'

        const laptop = {
            shop: 'ryans', name, link, description, price, status
        }
        processResult(laptop)
    })
}


// generate ryans url
const getRyansUrl = (data) => {
    // https://www.ryanscomputers.com/category/laptop-all-laptop?limit=100&pf=45000&pt=50000
    let baseUrlRyans = 'https://www.ryanscomputers.com/category/laptop-all-laptop?page=1&limit=100'

    baseUrlRyans += `&pf=${data.minprice}&pt=${data.maxprice}`

    return baseUrlRyans
}


// parse html string for ryans
const parseTextRyans = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parseRyans(doc)
    if (!isSecondary) {
        urls = checkPaginationRyans(doc)
    }
    return urls
}
