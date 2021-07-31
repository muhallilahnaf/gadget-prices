// get array of fetch promises
const getFetchs = (urls) => {
    // console.log(urls)
    return urls.map(url => fetch(proxy + url, {
        headers: headers,
        referrer: ''
    }))
}


// process responses
const processResponses = (responses, isSecondary) => {
    let urls = []
    let resDict = {
        'www.daraz.com.bd': [],
        'www.pickaboo.com': [],
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
            if (key === 'www.daraz.com.bd') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextDaraz(text, isSecondary))
                })
            }
            if (key === 'www.pickaboo.com') {
                resultArrArr[value].forEach(text => {
                    urls = urls.concat(parseTextPickaboo(text, isSecondary))
                })
            }
        }

        if (!isSecondary && urls.length > 0) {
            secondaryFetch(urls)
        } else {
            console.log(parsedResults)
            fetchEnd()
        }
    }).catch(e => console.log(e))
}


// secondary fetch
const secondaryFetch = (urls) => {
    console.log('secondary');
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
            case 'daraz':
                urls.push(getDarazUrl())
                break
            case 'pickaboo':
                urls.push(getPickabooUrl())
                break
            default:
                break
        }
    })
    console.log(urls)
    let primaryPromises = getFetchs(urls)
    Promise.all(primaryPromises).then(responses => {
        processResponses(responses, false)
    }).catch(e => console.log(e))
}
