// filter data
const filterData = (a) => {
    if (a === 'price') {
        parsedResults.forEach(product => {
            const price = parseInt(product['price'].replace(/\D/gi, ''))
            if (price >= priceFilter['min'] && price <= priceFilter['max']) {
                filteredResults.push(product)
            }
        })
    }
}