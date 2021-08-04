// get array of fetch promises
const getFetchs = (urls) => {
    return urls.map(url => fetch(proxy + url, {
        headers: headers,
        referrer: ''
    }))
}


// process responses
const processResponses = (responses, isSecondary) => {
    let urls = []
    let resDict = {
        'robishop.com.bd': [],
        'www.pickaboo.com': [],
        'www.searchanise.com': [], // penguinbd
        'api.trendy-tracker.com' : []
    }
    let promiseArrArr = []
    let arrPosTracker = {}

    responses.forEach(response => {
        if (response.status === 200) {
            for (const [key, value] of Object.entries(resDict)) {
                if (response.url.includes(key)) resDict[key].push(response.text())
            }
        } else {
            console.log(response.status, response.statusText)
        }
    })

    for (const [key, value] of Object.entries(resDict)) {
        if (value.length > 0) {
            promiseArrArr.push(value)
            arrPosTracker[key] = promiseArrArr.length - 1
        }
    }

    const biggerPromise = Promise.all(promiseArrArr.map(arr => Promise.all(arr)))

    biggerPromise.then(resultArrArr => {

        for (const [key, value] of Object.entries(arrPosTracker)) {
            if (key === 'robishop.com.bd') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextRobishop(text, isSecondary)) //json
                })
            }
            if (key === 'www.pickaboo.com') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextPickaboo(text, isSecondary))
                })
            }
            if (key === 'www.searchanise.com') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextPenguinbd(text, isSecondary)) //json
                })
            }
            if (key === 'api.trendy-tracker.com') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextTrendytracker(text, isSecondary)) //json
                })
            }
        }

        if (!isSecondary && urls.length > 0) {
            secondaryFetch(urls)
        } else {
            fetchEnd()
        }
    }).catch(e => console.log(e))
}


// secondary fetch
const secondaryFetch = (urls) => {
    let secondaryPromises = getFetchs(urls)
    Promise.all(secondaryPromises).then(responses => {
        processResponses(responses, true)
    }).catch(e => console.log(e))
}


// primary fetch
const primaryFetch = (data) => {
    let urls = []
    data.shops.forEach(shop => {
        switch (shop) {
            case 'robishop':
                urls.push(getRobishopUrl())
                break
            case 'pickaboo':
                urls.push(getPickabooUrl())
                break
            case 'penguinbd':
                urls.push(getPenguinbdUrl())
                break
            case 'trendytracker':
                urls.push(getTrendytrackerUrl())
                break
                    default:
                break
        }
    })
    let primaryPromises = getFetchs(urls)
    Promise.all(primaryPromises).then(responses => {
        processResponses(responses, false)
    }).catch(e => console.log(e))
}
