// check pagination techland
const checkPaginationTechland = (doc) => {
    let links = []

    const pagination = doc.querySelector('ul.pagination')
    if (pagination) {
        const nodes = pagination.querySelectorAll('li a')
        if (nodes.length > 0) {
            nodes.forEach(n => {
                const link = n.getAttribute('href')
                if (link) links.push(link)
            })
        }

        // for (let i = 0; i <= nodes.length - 3; i++) {
        //     links.push(nodes[i].getAttribute('href'))
        // }

        links = [...new Set(links)]
    }
    return links
}


// parse techland html doc
const parseTechland = (doc) => {
    const products = doc.querySelectorAll('div.product-layout')

    products.forEach(product => {
        let name = ''
        let link = ''
        let description = ''
        let price = ''
        let status = ''

        const a = product.querySelector('.name a')
        if (a) {
            name = a.textContent.trim()
            const href = a.getAttribute('href')
            if (href) link = href
        }

        const descList = product.querySelectorAll('div.description li')
        let dArr = []
        descList.forEach(li => {
            dArr.push(li.textContent.trim())
        })
        description = dArr.join(' | ')

        const priceNewNode = product.querySelector('div.price span.price-new')
        if (priceNewNode) {
            price = priceNewNode.textContent.trim()
        } else {
            const priceNode = product.querySelector('div.price span.price-normal')
            if (priceNode) price = priceNode.textContent.trim()
        }

        const statusEle = product.querySelector('.product-label b')
        if (statusEle) {
            status = statusEle.textContent.trim()
        } else {
            status = 'in stock'
        }

        const laptop = {
            shop: 'techland', name, link, description, price, status
        }
        processResult(laptop)
    })
}


// generate techland url
const getTechlandUrl = (data) => {
    // https://www.techlandbd.com/shop-laptop-computer?sort=p.price&order=DESC&limit=100&fq=1&fmin=35000&fmax=65000
    let baseUrlTechland = 'https://www.techlandbd.com/shop-laptop-computer?fc=255&limit=100'

    baseUrlTechland += `&fmin=${data.minprice}&fmax=${data.maxprice}`
    data.availability === 'all' ? baseUrlTechland += '' : baseUrlTechland += '&fq=1'

    return baseUrlTechland
}


// parse html string for techland
const parseTextTechland = (text, isSecondary) => {
    let urls = []
    const doc = parser.parseFromString(text, 'text/html')
    parseTechland(doc)
    if (!isSecondary) {
        urls = checkPaginationTechland(doc)
    }
    return urls
}
