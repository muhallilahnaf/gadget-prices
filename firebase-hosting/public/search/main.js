// input validation
const validation = () => {
    shopError.textContent = ''

    if (query.value === '') {
        query.classList.add('invalid')
        query.classList.remove('valid')
        return false
    }
    query.classList.add('valid')
    query.classList.remove('invalid')

    let checked = false
    for (const [key, value] of Object.entries(allShops)) {
        if (value.checked) {
            checked = true
            break
        }
    }
    if (!checked) {
        shopError.textContent = 'select at least 1 shop'
        return false
    }

    let shops = []
    for (const [key, value] of Object.entries(allShops)) {
        if (value.checked) shops.push(key)
    }

    return {
        query: query.value.replace(/\s/g, '+'),
        shops: shops,
    }
}


// price input validity
const validPrice = (m, v) => {
    if (v === 'valid') {
        m.classList.add('valid')
        m.classList.remove('invalid')
        return
    }
    m.classList.add('invalid')
    m.classList.remove('valid')
}


// fetch end
const fetchEnd = () => {
    sortFilterCard.style.display = 'block'
    createOutput()
    stopLoading()
    output.scrollIntoView({ behavior: "smooth", block: "nearest" })
}


// reset global vars
const resetGlobals = () => {
    parsedResults = []
    filteredResults = []
    priceFilter = {}
    encodedQuery = ''
    sortFilterCard.style.display = 'none'
    removeOutput()
}

// search form event listener
search.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = validation()
    if (formData) {
        resetGlobals()
        startLoading()
        encodedQuery = formData.query
        primaryFetch(formData)
    }
})


// sort form event listener
sort.addEventListener('submit', (e) => {
    e.preventDefault()
    const checkedValue = sortValidate()
    if (checkedValue) {
        removeOutput()
        sortData(checkedValue)
        createOutput()
        output.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
})


// filter price event listener
buttonPriceFilter.addEventListener('click', () => {
    if (minPrice.value === '' && maxPrice.value !== '') {
        validPrice(minPrice, 'invalid')
        return false
    }
    validPrice(minPrice, 'valid')

    if (minPrice.value !== '' && maxPrice.value === '') {
        validPrice(maxPrice, 'invalid')
        return false
    }
    validPrice(maxPrice, 'valid')

    if (/\D+/gi.test(minPrice.value)) {
        validPrice(minPrice, 'invalid')
        return false
    }
    validPrice(minPrice, 'valid')

    if (/\D+/gi.test(maxPrice.value)) {
        validPrice(maxPrice, 'invalid')
        return false
    }
    validPrice(maxPrice, 'valid')

    if (minPrice.value !== '' && maxPrice.value !== '') {
        priceFilter['min'] = parseInt(minPrice.value)
        priceFilter['max'] = parseInt(maxPrice.value)
        removeOutput()
        filteredResults = []
        filterData('price')
        createOutput()
        output.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
})


// filter price cancel event listener
buttonPriceFilterCancel.addEventListener('click', () => {
    minPrice.value = ''
    maxPrice.value = ''
    removeOutput()
    filteredResults = []
    priceFilter = {}
    createOutput()
    output.scrollIntoView({ behavior: "smooth", block: "nearest" })
})


// loading start
const startLoading = () => {
    buttonGet.setAttribute('disabled', 'true')
    loader.classList.toggle('active')
}


// loading end
const stopLoading = () => {
    buttonGet.removeAttribute('disabled')
    loader.classList.toggle('active')
}
