document.getElementById("submitBtn").addEventListener("click", handleSubmit)
const startDateEl = document.getElementById("startDateEl")
const endDateEl = document.getElementById("endDateEl")
import DataSorter from "./DataSorter.js"
let dataSorter = new DataSorter()

function handleSubmit() {
    const startDate = dayjs.utc(startDateEl.value)
    const startDateTimestamp = dayjs.utc(startDate) / 1000
    const endDate = dayjs.utc(endDateEl.value).add(1, "hour")
    const endDateTimestamp = dayjs.utc(endDate) / 1000

    //fetch the data from Gecko API
    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startDateTimestamp}&to=${endDateTimestamp}`)
        .then(res => res.json())
        .then(data => { dataSorter.sortData(data) })
}

//TODO
//Switch to UTC time: done
//Styling
//Handle searches over 90 days
//Make sure no results under 2 days is returned
//Add support for multiple coins?
//If no profits, tell that on Time Machine