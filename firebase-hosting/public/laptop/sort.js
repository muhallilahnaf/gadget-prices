//  check sort input
const sortValidate = () => {
    sortByError.textContent = ''
    sortDirectionError.textContent = ''

    let checkedValue
    let direction
    sortValues.some(val => {
        if (sortBy.value === val) {
            checkedValue = val
            if (sortDirection.value === 'desc' || sortDirection.value === 'asc') {
                direction = sortDirection.value
                return true
            }
        }
    })
    if (checkedValue) {
        if (direction) {
            return {checkedValue, direction}
        }
        sortDirectionError.textContent = 'select one'
        return false
    }
    sortByError.textContent = 'select one'
    return false
}


// sort data
const sortData = (checked) => {
    const checkedValue = checked['checkedValue']
    if (checkedValue.includes('price')) sortDataPrice(checked['direction'])
    if (checkedValue.includes('cpupassmark')) sortDataCpupassmark(checked['direction'])
    if (checkedValue.includes('cpucore')) sortDataCpucore(checked['direction'])
    if (checkedValue.includes('cpudate')) sortDataCpudate(checked['direction'])
    if (checkedValue.includes('ram')) sortDataRam(checked['direction'])
    if (checkedValue.includes('storage')) sortDataStorage(checked['direction'])
    if (checkedValue.includes('display')) sortDataDisplay(checked['direction'])
}


// sort by price
const sortDataPrice = (direction) => {
    parsedResults = parsedResults.sort((a,b) => {
        const priceStrA = a['price'].replace(/\D+/g, '')
        const priceStrB = b['price'].replace(/\D+/g, '')
        if (priceStrA === '' && priceStrB === '') return 0
        if (priceStrA === '') return 1
        if (priceStrB === '') return -1
        if (direction === 'asc') return Number.parseInt(priceStrA) - Number.parseInt(priceStrB)
        return Number.parseInt(priceStrB) - Number.parseInt(priceStrA)
    })
}


// sort by cpupassmark
const sortDataCpupassmark = (direction) => {
    parsedResults = parsedResults.sort((a,b) => {
        const cpupassmarkA = a['cpupassmark']
        const cpupassmarkB = b['cpupassmark']
        if (cpupassmarkA === '' && cpupassmarkB === '') return 0
        if (cpupassmarkA === '') return 1
        if (cpupassmarkB === '') return -1
        if (direction === 'asc') return cpupassmarkA - cpupassmarkB
        return cpupassmarkB - cpupassmarkA
    })
}


// sort by cpucore
const sortDataCpucore = (direction) => {
    parsedResults = parsedResults.sort((a,b) => {
        const cpucoreA = a['cpucore']
        const cpucoreB = b['cpucore']
        if (cpucoreA === '' && cpucoreB === '') return 0
        if (cpucoreA === '') return 1
        if (cpucoreB === '') return -1
        if (direction === 'asc') return cpucoreA - cpucoreB
        return cpucoreB - cpucoreA
    })
}


// sort by cpudate
const sortDataCpudate = (direction) => {
    parsedResults = parsedResults.sort((a,b) => {
        const cpudateStrA = a['cpudate']
        const cpudateStrB = b['cpudate']
        if (cpudateStrA === '' && cpudateStrB === '') return 0
        if (cpudateStrA === '') return 1
        if (cpudateStrB === '') return -1
        if (direction === 'asc') return Date.parse(cpudateStrA) - Date.parse(cpudateStrB)
        return Date.parse(cpudateStrB) - Date.parse(cpudateStrA)
    })
}


// sort by ram
const sortDataRam = (direction) => {
    parsedResults = parsedResults.sort((a,b) => {
        const ramA = /(\d{1,2})GB/g.exec(a['ram'])
        const ramB = /(\d{1,2})GB/g.exec(b['ram'])
        if (!ramA && !ramB) return 0
        if (!ramA) return 1
        if (!ramB) return -1
        if (direction === 'asc') return Number.parseInt(ramA[1]) - Number.parseInt(ramB[1])
        return Number.parseInt(ramB[1]) - Number.parseInt(ramA[1])
    })
}


// sort by display size
const sortDataDisplay = (direction) => {
    parsedResults = parsedResults.sort((a,b) => {
        const displayA = /([\d\.]+)(?: inch(?:es)?)?/g.exec(a['display'])
        const displayB = /([\d\.]+)(?: inch(?:es)?)?/g.exec(b['display'])
        if (!displayA && !displayB) return 0
        if (!displayA) return 1
        if (!displayB) return -1
        if (direction === 'asc') return Number.parseFloat(displayA[1]) - Number.parseFloat(displayB[1])
        return Number.parseFloat(displayB[1]) - Number.parseFloat(displayA[1])
    })
}


// sort by storage capacity
const sortDataStorage = (direction) => {
    parsedResults = parsedResults.sort((a,b) => {
        const storageA = [...a['storage'].matchAll(/\d+ ?(?:TB|GB)/gm)]
        const storageB = [...b['storage'].matchAll(/\d+ ?(?:TB|GB)/gm)]
        if (storageA.length === 0 && storageB.length === 0) return 0
        if (storageA.length === 0) return 1
        if (storageB.length === 0) return -1
        const totalStorageA = getTotalStorage(storageA)
        const totalStorageB = getTotalStorage(storageB)
        if (direction === 'asc') return totalStorageA - totalStorageB
        return totalStorageB - totalStorageA
    })
}


// get total storage in GB
const getTotalStorage = (storageMatchArr) => {
    let totalStorage = 0
    storageMatchArr.forEach(match => {
        const matchStr = match[0]
        if (matchStr.includes('GB')) {
            totalStorage += Number.parseInt(matchStr.replace(/\D+/g, ''))
            return
        }
        if (matchStr.includes('TB')) {
            totalStorage += Number.parseInt(matchStr.replace(/\D+/g, '')) * 1024
        }
    })
    return totalStorage
}
