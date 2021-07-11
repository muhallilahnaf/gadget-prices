// check pagination ryans
const checkPaginationRyans = (doc) => {
    let links = []

    const pagination = doc.querySelectorAll('.pages ol > li')
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
    const products = doc.querySelectorAll('#produt-container .row > li')

    products.forEach(product => {
        let name = ''
        let link = ''
        let description = ''
        let price = ''
        let status = ''

        const a = product.querySelector('a.product-title-grid')
        if (a) {
            name = a.textContent.trim()
            const href = a.getAttribute('href')
            if (href) link = href
        }

        const priceNode = product.querySelector('span.price')
        if (priceNode) price = priceNode.textContent.trim()

        const statusEle = product.querySelector('.product-new-label p')
        if (statusEle) {
            status = statusEle.textContent.trim()
        } else {
            status = 'in stock'
        }

        const laptop = {
            shop: 'ryans', name, link, description, price, status
        }
        processResult(laptop)
    })
}


// generate ryans url
const getRyansUrl = (data) => {
    // https://www.ryanscomputers.com/category/laptop-all-laptop?page=1&limit=108&query=35000-p%2345000%7C
    let baseUrlRyans = 'https://www.ryanscomputers.com/category/laptop-all-laptop?page=1&limit=108'

    baseUrlRyans += `&query=${data.minprice}-p%23${data.maxprice}%7C`

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
