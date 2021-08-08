// check pagination trendytracker
const checkPaginationTrendytracker = (text) => {
    let links = []
    // fetched through ajax
    return links
}


// parse trendytracker html doc
const parseTrendytracker = (data) => {
    const products = data['data']['items']
    if (products) {
        products.forEach(p => {
            let name = ''
            let link = ''
            let price = ''
            let brand = ''
            let status = ''

            if (p['name']) {
                name = p['name']
            }

            if (p['link']) {
                link = p['link']
            }

            if (p['salePrice'] && `${p['salePrice']}` != '0') {
                price = `${p['salePrice']}`
            } else if (p['price']) {
                price = `${p['price']}`
            }

            if (p['soldOut']) {
                status = `${p['soldOut']}` === 'true' ? 'out of stock' : 'in stock'
            }


            const product = {
                shop: 'trendytracker', name, link, price, brand, status
            }
            processResult(product)
        })
    }
}


// generate trendytracker url
const getTrendytrackerUrl = () => {
    return `https://api.trendy-tracker.com/v1/products/search?page=1&take=100&sort=&sortType=&q=${encodedQuery}&featured=&hot=&bestSell=&dailyDeal=&soldOut=&discounted=`
}


// parse html string for trendytracker
const parseTextTrendytracker = (text, isSecondary) => {
    let urls = []

    parseTrendytracker(JSON.parse(text))
    if (!isSecondary) {
        urls = checkPaginationTrendytracker(text)
    }
    return urls
}
