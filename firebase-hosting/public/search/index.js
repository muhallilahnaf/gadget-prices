document.addEventListener('DOMContentLoaded', () => {
    // side nav
    let elemsSidenav = document.querySelectorAll('.sidenav')
    let instancesSidenav = M.Sidenav.init(elemsSidenav)

    // select
    let elemsSelect = document.querySelectorAll('select')
    let instancesSelect = M.FormSelect.init(elemsSelect)

    // tooltip
    let elemsTooltip = document.querySelectorAll('.tooltipped')
    let instancesTooltip = M.Tooltip.init(elemsTooltip)

    // floating button
    let elemsFloatingBtn = document.querySelectorAll('.fixed-action-btn')
    let instancesFloatingBtn = M.FloatingActionButton.init(elemsFloatingBtn)

    // modal
    let elemsModal = document.querySelectorAll('.modal')
    let instancesModal = M.Modal.init(elemsModal)
})


// elements
const loader = document.getElementById('loader')

const search = document.getElementById('search')
const pickaboo = document.getElementById('pickaboo')
const robishop = document.getElementById('robishop')
const penguinbd = document.getElementById('penguinbd')
const trendytracker = document.getElementById('trendytracker')
const shopError = document.getElementById('shop-error')
const query = document.getElementById('query')
const buttonGet = document.getElementById('get')

const sortFilterCard = document.getElementById('sort-filter-card')
const sort = document.getElementById('sort')
const sortBy = document.getElementById('sort-by')
const sortByError = document.getElementById('sort-by-error')
const minPrice = document.getElementById('min-price')
const maxPrice = document.getElementById('max-price')
const buttonPriceFilter = document.getElementById('filter-price')
const buttonPriceFilterCancel = document.getElementById('filter-price-cancel')

const output = document.getElementById('output')

const allShops = {
    pickaboo, robishop, penguinbd, trendytracker
}

const sortValues = [
    'price-asc',
    'price-desc',
]


// global vars
const parser = new DOMParser()
const proxy = 'https://cors-matbot.herokuapp.com/'
let headers = new Headers({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.41",
})
let parsedResults = []
let filteredResults = []
let priceFilter = {}
let encodedQuery = ''
