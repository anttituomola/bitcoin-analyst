/* eslint-disable no-undef */
document.getElementById("submitBtn").addEventListener("click", handleSubmit)
const startDateEl = document.getElementById("startDateEl")
const endDateEl = document.getElementById("endDateEl")

import DataSorter from "./components/DataSorter.js"
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
    //make sure end date is not in future or too far in the past (28.04.2013)
    if (dayjs(endDateEl.value) > dayjs().add(2, "hour")) {
        alert("That's future, you fool! Will adjust to current realm.")
        endDateEl.value = dayjs().add(1, "hour").format("YYYY-MM-DD")
    }

    if (dayjs(startDateEl.value) < dayjs("2013-04-28")) {
        alert("That's too far in Bitcoin history, setting the date to earliet possible date.")
        startDateEl.value = dayjs("2013-04-28").format("YYYY-MM-DD")
    }
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
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                Object.values(results).forEach(el => el.classList.add("outputBox-hide"))
                throw new Error("Hmm... there's something fishy going on here.")
            }
        })
        .then(data => { dataSorter.sortData(data, amountOfDays)})
}

//TODO
//also check the end date: is it valid?
//Harmonise the two sliding-window algoriths
//Change all functions to class (methods), and separate the rendering parts as individual methods: this also adds testability.
//raw data option: show the full data
//Add tests!: https://titanwolf.org/Network/Articles/Article?AID=5bb2e66a-ddb9-4e6e-ba02-a2aa686bc6c6
//switch from innerHTML to textContent for safety reasons?
//Make sure no results under 2 days is returned: it seems the data granularity stays the same even with single day searches?
//Add support for multiple coins?
//validate data!: https://coinmarketcap.com/currencies/bitcoin/historical-data/
//remove eslint and pacgage.json before release
//update live demo

//DONE
//Handle searches over 90 days: done
//Switch to UTC time: done
//Listen for enter on both input fields: done
//If no profits, tell that on Time Machine: done
//mobile optimization: done
//Styling: done
//animations: done
//return an error if there's no data available: done
//Edit readme: add steps to run (clone, open in browser)
//Linting!: done