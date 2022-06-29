// input validation
const validation = () => {
    shopError.textContent = ''

    if (minPrice.value === '' || /\D+/gi.test(minPrice.value)) {
        minPrice.classList.add('invalid')
        minPrice.classList.remove('valid')
        return false
    }
    minPrice.classList.add('valid')
    minPrice.classList.remove('invalid')

    if (maxPrice.value === '' || /\D+/gi.test(maxPrice.value)) {
        maxPrice.classList.add('invalid')
        maxPrice.classList.remove('valid')
        return false
    }
    maxPrice.classList.add('valid')
    maxPrice.classList.remove('invalid')

    // if (!startech.checked && !ryans.checked && !techland.checked) {
    if (!startech.checked && !ryans.checked) {
        shopError.textContent = 'select at least 1 shop'
        return false
    }

    let shops = []
    for (const [key, value] of Object.entries(allShops)) {
        if (value.checked) shops.push(key)
    }

    return {
        minprice: parseInt(minPrice.value),
        maxprice: parseInt(maxPrice.value),
        shops: shops,
        availability: all.checked ? 'all' : 'in-stock',
    }
}


// fetch end
const fetchEnd = () => {
    sort.style.display = 'block'
    createOutput()
    cpuButtonsAdd()
    descriptionButtonsAdd()
    stopLoading()
    output.scrollIntoView({ behavior: "smooth" })
}


// add cpu see more listener
const cpuButtonsAdd = () => {
    const cpuButtons = document.querySelectorAll('.cpu-button')
    cpuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cpuid = button.getAttribute('data-cpu-button')
            const details = document.querySelector(`[data-cpu-details="${cpuid}"]`)
            if (details.style.display == 'block') {
                details.style.display = 'none'
                button.textContent = 'see details'
                return
            }
            details.style.display = 'block'
            button.textContent = 'hide details'
        })
    })
}


// add see description listener
const descriptionButtonsAdd = () => {
    const descriptionButtons = document.querySelectorAll('.description-button')
    descriptionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const descid = button.getAttribute('data-description-button')
            const details = document.querySelector(`[data-description="${descid}"]`)
            if (details.style.display == 'block') {
                details.style.display = 'none'
                button.textContent = 'see description'
                return
            }
            details.style.display = 'block'
            button.textContent = 'hide description'
        })
    })
}


// reset global vars
const resetGlobals = () => {
    ryansStartUrl = ''
    parsedResults = []
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
    const checked = sortValidate()
    if (checked) {
        removeOutput()
        sortData(checked)
        createOutput()
        cpuButtonsAdd()
        descriptionButtonsAdd()
        output.scrollIntoView({ behavior: "smooth" })
    }
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
