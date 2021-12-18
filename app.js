document.getElementById("submitBtn").addEventListener("click", handleSubmit)
const startDateEl = document.getElementById("startDateEl")
const endDateEl = document.getElementById("endDateEl")
import DataSorter from "./DataSorter.js"
let dataSorter = new DataSorter()

function handleSubmit() {
    const startDate = dayjs(startDateEl.value)
    const startDateTimestamp = dayjs(startDate) / 1000
    const endDate = dayjs(endDateEl.value)
    const endDateTimestamp = dayjs(endDate) / 1000 + 3600

    //fetch the data from Gecko API
    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startDateTimestamp}&to=${endDateTimestamp}`)
        .then(res => res.json())
        .then(data => { dataSorter.sortData(data) })
}

//TODO
//Switch to UTC tim
//Styling
//Handle searches over 90 days
//Make sure no results under 2 days is returned
//Add support for multiple coins?