//  check sort input
const sortValidate = () => {
    sortByError.textContent = ''

    let checkedValue
    sortValues.some(val => {
        if (sortBy.value === val) {
            checkedValue = val
            return true
        }
    })
    if (checkedValue) return checkedValue
    sortByError.textContent = 'select one'
    return false
}


// sort data
const sortData = (checkedValue) => {
    if (checkedValue.includes('price')) sortDataPrice(checkedValue)
}


// sort by price
const sortDataPrice = (checkedValue) => {
    parsedResults = parsedResults.sort((a, b) => {
        const priceStrA = a['price'].replace(/\D+/g, '')
        const priceStrB = b['price'].replace(/\D+/g, '')
        if (priceStrA === '' && priceStrB === '') return 0
        if (priceStrA === '') return 1
        if (priceStrB === '') return -1
        if (checkedValue.includes('asc')) return Number.parseInt(priceStrA) - Number.parseInt(priceStrB)
        return Number.parseInt(priceStrB) - Number.parseInt(priceStrA)
    })
}
