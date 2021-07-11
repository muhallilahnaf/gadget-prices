document.addEventListener('DOMContentLoaded', () => {
    // side nav
    let elemsSidenav = document.querySelectorAll('.sidenav')
    let instancesSidenav = M.Sidenav.init(elemsSidenav)

    // select
    let elemsSelect = document.querySelectorAll('select')
    let instancesSelect = M.FormSelect.init(elemsSelect)
})


// elements
const loader = document.getElementById('loader')

const search = document.getElementById('search')
const minPrice = document.getElementById('min-price')
const maxPrice = document.getElementById('max-price')
const startech = document.getElementById('startech')
const ryans = document.getElementById('ryans')
const techland = document.getElementById('techland')
const shopError = document.getElementById('shop-error')
const all = document.getElementById('all')
const inStock = document.getElementById('in-stock')
const buttonGet = document.getElementById('get')

const sort = document.getElementById('sort')
const sortBy = document.getElementById('sort-by')
const sortDirection = document.getElementById('sort-direction')
const sortByError = document.getElementById('sort-by-error')
const sortDirectionError = document.getElementById('sort-direction-error')

const output = document.getElementById('output')

const allShops = {
    startech, ryans, techland
}

const sortValues = [
    'price',
    'cpupassmark',
    'cpucore',
    'cpudate',
    'ram',
    'storage',
    'display'
]

// global vars
const parser = new DOMParser()
const proxy = 'https://cors-matbot.herokuapp.com/'
let headers = new Headers({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.41",
})
let parsedResults = []
let ryansStartUrl


const displaySizes = [
    10.1,
    11.6,
    12.3,
    12.4,
    13.3,
    13.4,
    13.5,
    13.9,
    15.6,
    16.1,
    17.3,
    13,
    14,
    15,
    16,
    17
]

const brands = [
    'Razer',
    'HP',
    'Asus',
    'Apple',
    'Microsoft',
    'Dell',
    'MSI',
    'Lenovo',
    'Acer',
    'Gigabyte',
    'iLife',
    'Chuwi',
    'Nexstgo',
    'Avita',
    'MI',
    'Huawei',
    'Walton',
]

