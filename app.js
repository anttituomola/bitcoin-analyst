document.getElementById("submitBtn").addEventListener("click", handleSubmit)
const startDateEl = document.getElementById("startDateEl")
const endDateEl = document.getElementById("endDateEl")

import DataSorter from "./DataSorter.js"
let dataSorter = new DataSorter()

//set initial values to input fields
startDateEl.value = dayjs().add(-7, "day").format("YYYY-MM-DD")
endDateEl.value = dayjs().format("YYYY-MM-DD")


//listen for enter on input fields
startDateEl.addEventListener("keypress", enter)
endDateEl.addEventListener("keypress", enter)

function enter(e) {
    if (e.key === "Enter") {
        handleSubmit()
    }
}

function handleSubmit() {
    const startDate = dayjs.utc(startDateEl.value)
    const startDateTimestamp = dayjs.utc(startDate) / 1000
    const endDate = dayjs.utc(endDateEl.value).add(1, "hour")
    const endDateTimestamp = dayjs.utc(endDate) / 1000
    const amountOfDays = endDate.diff(startDate, "day")

    //add class to results fields
    const results = document.getElementsByClassName("outputBox-hide")
    Object.values(results).forEach(el => el.classList.add("outputBox"))

    //fetch the data from Gecko API
    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startDateTimestamp}&to=${endDateTimestamp}`)
        .then(res => res.json())
        .then(data => { dataSorter.sortData(data, amountOfDays) })
}

//TODO
//Styling
//Make sure no results under 2 days is returned: it seems the data granularity stays the same even with single day searches?
//Add support for multiple coins?
//validate data!

//DONE
//Handle searches over 90 days: done
//Switch to UTC time: done
//Listen for enter on both input fields: done
//If no profits, tell that on Time Machine: done