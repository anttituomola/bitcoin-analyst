
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
        .then(data => { findSalesPeakDate(data) })

}

function findSalesPeakDate(data) {
    const totalVolumes = data.total_volumes
    console.log(totalVolumes)
    
    //convert UNIX timestamps to human readable times
    const dateArray = totalVolumes.map((hour) => {
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

    //sort dates by value
    const sortedIntances = firstHourDatapoints.sort((a,b) => b.value - a.value)
    const highestVolumeDay = sortedIntances[0]

    salesPeakEl.innerHTML= `
    <h3>Highest trading volume:</h3>
    <h1>${dayjs(highestVolumeDay.timestamp).format("DD.MM.YYYY")}</h1>
    <h3>Total trading volume:</h3>
    <p>${highestVolumeDay.value} euros</p>
    `
}
