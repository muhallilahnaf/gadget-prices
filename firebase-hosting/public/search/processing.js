// process parsedResults
const processResult = (product) => {
    // price
    let parsedPrice
    let price = product['price']

    parsedPrice = price.replace(/[^\.\d]+/g, '')
    if (parsedPrice !== '') {
        price = `BDT ${Number.parseInt(parsedPrice).toLocaleString('en-IN')}`
    }

    // PUSH DATA
    parsedResults.push({
        ...product,
        price
    })
}
