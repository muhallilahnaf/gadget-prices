// input validation
const validation = () => {
    shopError.textContent = ''

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
        shops: shops,
    }
}


// all button eventlistener
all.addEventListener('change', () => {
    if (all.checked) {
        for (const [key, value] of Object.entries(allShops)) {
            value.checked = true
            value.setAttribute('disabled', 'true')
        }
        return
    }
    for (const [key, value] of Object.entries(allShops)) {
        value.checked = false
        value.removeAttribute('disabled')
    }
})


// fetch end
const fetchEnd = () => {
    sort.style.display = 'block'
    createOutput()
    detailButtonsAdd()
    stopLoading()
    output.scrollIntoView({ behavior: "smooth" })
}


// reset global vars
const resetGlobals = () => {
    parsedResults = []
    salextraLinks = []
    sort.style.display = 'none'
    removeOutput()
}

// search form event listener
search.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = validation()
    if (formData) {
        resetGlobals()
        startLoading()
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
        detailButtonsAdd()
        output.scrollIntoView({ behavior: "smooth" })
    }
})


// view toggle
viewSwitch.addEventListener('change', () => {
    const compact = document.querySelectorAll('.card-body-compact')
    const full = document.querySelectorAll('.card-body-full')

    compact.forEach(node => node.classList.toggle('hide'))
    full.forEach(node => node.classList.toggle('hide'))
})


// add see more listener
const detailButtonsAdd = () => {
    detailButtonsCls.forEach(item => {
        const buttons = document.querySelectorAll(`.${item['class']}-button`)
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute(`data-${item['class']}-button`)
                const details = document.querySelector(`[data-${item['class']}-details="${id}"]`)
                if (details.style.display == 'block') {
                    details.style.display = 'none'
                    button.textContent = item['label']
                    return
                }
                details.style.display = 'block'
                button.textContent = item['label'].replace(/see more|see/g, 'hide')
            })
        })
    })
}


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
