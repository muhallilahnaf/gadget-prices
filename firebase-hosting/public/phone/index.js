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
const fdl = document.getElementById('fdl')
const oppo = document.getElementById('oppo')
const realme = document.getElementById('realme')
const robishop = document.getElementById('robishop')
const transcom = document.getElementById('transcom')
const vivo = document.getElementById('vivo')
const mi = document.getElementById('mi')
const excel = document.getElementById('excel')
const salextra = document.getElementById('salextra')
const all = document.getElementById('all')
const shopError = document.getElementById('shop-error')
const buttonGet = document.getElementById('get')

const sort = document.getElementById('sort')
const sortBy = document.getElementById('sort-by')
const sortByError = document.getElementById('sort-by-error')
const viewSwitch = document.getElementById('view-switch')

const output = document.getElementById('output')

const allShops = {
    fdl, oppo, realme, robishop, transcom, vivo, mi, excel, salextra
}

const sortValues = [
    'price-asc',
    'price-desc',
]

const detailButtonsCls = [
    { class: 'chipset', label: '(see details)' },
    { class: 'rearcam', label: '(see details)' },
    { class: 'frontcam', label: '(see details)' },
    { class: 'connectivity', label: '(see more connectivity)' },
    { class: 'sensor-port', label: '(see more sensors)' },
]


// global vars
const parser = new DOMParser()
const proxy = 'https://cors-matbot.herokuapp.com/'
let headers = new Headers({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.41",
})
let parsedResults = []
let salextraLinks = []


const brands = [
    'Apple',
    'Samsung',
    'Oppo',
    'realme',
    'Vivo',
    'Xiaomi',
    'Nokia',
    'Lenovo',
    'Sony',
    'Motorola',
    // 'iQOO',
    'OnePlus',
    // 'Poco',
    // 'Redmi',
    // 'Mi',
    'Huawei',
    // 'Walton',
]
