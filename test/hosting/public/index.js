// elements
const buttonGet = document.getElementById('get')

const loadingScreen = document.getElementById('loading-screen')
const loadingScreenText = document.querySelector('#loading-screen p')

const tableDiv = document.getElementById('table')

const minPrice = document.getElementById('min-price')
const maxPrice = document.getElementById('max-price')
const startech = document.getElementById('startech')
const ryans = document.getElementById('ryans')
const techland = document.getElementById('techland')
const all = document.getElementById('all')
const inStock = document.getElementById('in-stock')
const priceError = document.getElementById('price-error')
const shopError = document.getElementById('shop-error')

const sortTableContainer = document.getElementById('sort-table-container')


// global vars
const parser = new DOMParser()
let intervalId
const proxy = 'https://cors-matbot.herokuapp.com/'
let headers = new Headers({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 Edg/91.0.864.41",
})
let totalLinks = []
let parsedResults = []
let ryansStartUrl

const tableHeaders = [
    'shop',
    'brand',
    'name',
    'price',
    'status',
    'CPU',
    'RAM',
    'storage',
    'display',
    'GPU',
    'description'
]

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
