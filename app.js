
document.getElementById("submitBtn").addEventListener("click", handleSubmit)
const startDateEl = document.getElementById("startDateEl")
const endDateEl = document.getElementById("endDateEl")
const salesPeakEl = document.getElementById("salesPeakEl")

function handleSubmit() {
    const startDate = dayjs(startDateEl.value)
    const startDateTimestamp = dayjs(startDate) / 1000
    const endDate = dayjs(endDateEl.value)
    const endDateTimestamp = dayjs(endDate) / 1000 + 3600

    //fetch the data from Gecko API
    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startDateTimestamp}&to=${endDateTimestamp}`)
        .then(res => res.json())
        .then(data => { findSalesPeakDate(data), longestDownfall(data) })

}

//FIND LONGEST DOWNFALL
function longestDownfall(data) {
    console.log(data)
}

//FIND TRANSACTION PEAK DATE
function findSalesPeakDate(data) {
    console.log(data)
    const totalVolumes = data.total_volumes
    const dateArray = []
    
    //convert UNIX timestamps to human readable times
    totalVolumes.map((hour) => {
        const individualDates = {}
        individualDates.date = dayjs(hour[0]).format("DD")
        individualDates.hour = dayjs(hour[0]).format("HH")
        individualDates.min = dayjs(hour[0]).format("mm")
        individualDates.timestamp = hour[0]
        individualDates.value = hour[1]
        dateArray.push(individualDates)
    })   
    //group data by date
    let groupedByDate = dateArray.reduce((acc, value) => {
        if (!acc[value.date]) {
            acc[value.date] = []
        }

        acc[value.date].push(value)

        return acc
    }, {})

    //push first instances of each day to a new array
    let firstInstances = []
    for (let day in groupedByDate) {
        firstInstances.push(groupedByDate[day][0])
    }

    //sort dates by value
    let sortedIntances = firstInstances.sort((a,b) => b.value - a.value)
    const highestVolumeDay = sortedIntances[0]

    //render the results to the app
    salesPeakEl.innerHTML= `
    <h3>Highest trading volume:</h3>
    <h1>${dayjs(highestVolumeDay.timestamp).format("DD.MM.YYYY")}</h1>
    <h3>Total trading volume:</h3>
    <p>${highestVolumeDay.value} euros</p>
    `
}
