document.getElementById("submitBtn").addEventListener("click", handleSubmit)
const startDateEl = document.getElementById("startDateEl")
const endDateEl = document.getElementById("endDateEl")
const salesPeakEl = document.getElementById("salesPeakEl")
const longestDownfallEl = document.getElementById("longestDownfallEl")

function handleSubmit() {
    const startDate = dayjs(startDateEl.value)
    const startDateTimestamp = dayjs(startDate) / 1000
    const endDate = dayjs(endDateEl.value)
    const endDateTimestamp = dayjs(endDate) / 1000 + 3600

    //fetch the data from Gecko API
    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startDateTimestamp}&to=${endDateTimestamp}`)
        .then(res => res.json())
        .then(data => { sortData(data) })
}

//SORT INITIAL DATA
function sortData(data) {
    const totalVolumes = data.total_volumes
    const prices = data.prices

    //convert UNIX timestamps to human readable times
    let midnightVolumeDatapoints = extractMidnightDatapoints(totalVolumes)
    let midnightValueDatapoints = extractMidnightDatapoints(prices)

    findSalesPeakDate(midnightVolumeDatapoints)
    longestDownfall(midnightValueDatapoints)

}

function extractMidnightDatapoints(dataPoints) {
    const dateArray = dataPoints.map((hour) => {
        const individualDates = {}
        individualDates.date = dayjs(hour[0]).format("DD")
        individualDates.hour = dayjs(hour[0]).format("HH")
        individualDates.min = dayjs(hour[0]).format("mm")
        individualDates.timestamp = hour[0]
        individualDates.value = hour[1]
        return individualDates
    })

    //group data by date
    const groupedByDate = dateArray.reduce((acc, value) => {
        if (!acc[value.date]) {
            acc[value.date] = []
        }

        acc[value.date].push(value)

        return acc
    }, {})

    //push first instances of each day to a new array
    const firstHourDatapoints = Object.values(groupedByDate).map(dataPointsForDay => dataPointsForDay[0]);

    return firstHourDatapoints
}

//FIND LONGEST DOWNFALL
/* function(array, target){
    set a left pointer to the first element of the array
    set a right pointer to the last element of the array
    loop through the array; check if left and right add to target
    sum is less than the target, increase left pointer
    sum is greater than the target, decrease right pointer
    once their sum equals the target, return their indices
  } */
function longestDownfall(data) {
    let A = 0
    let B = 0
    let currentMaxLength = 0
    while (B < data.length - 1) {
        if (data[B].value > data[B+1].value) {
            B++
            currentMaxLength = Math.max(currentMaxLength, B - A)
        } else {
            B++
            A = B
            currentMaxLength = Math.max(currentMaxLength, B - A)
        }
    }

    //render highest downfall to the app
    let postscript = ""
    if(currentMaxLength>1) { 
        postscript = "days in a row"
    } else {
        postscript = "day"
    }
    longestDownfallEl.innerHTML = `
    <h3>Longest downfall trend</h3>
    <h1>${currentMaxLength}</h1>
    <p>${postscript}</p>
    `
}

//FIND TRANSACTION PEAK DATE
function findSalesPeakDate(data) {
    const firstHourDatapoints = data
    //sort dates by value + grab the highest
    const sortedIntances = firstHourDatapoints.sort((a, b) => b.value - a.value)
    const highestVolumeDay = sortedIntances[0]

    //render the results to the app
    salesPeakEl.innerHTML = `
    <h3>Highest trading volume:</h3>
    <h1>${dayjs(highestVolumeDay.timestamp).format("DD.MM.YYYY")}</h1>
    <h3>Total trading volume:</h3>
    <p>${highestVolumeDay.value} euros</p>
    `
}


//TIME MACHINE
function timeMachine() {
    //https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
    console.log("hello from the time machine!")
}