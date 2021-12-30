import DataSorter from "./components/DataSorter.js"

export default class HandleSubmit {
    constructor() {
        this.handleSubmit = this.handleSubmit.bind(this)
        this.enter = this.enter.bind(this)
    }
    //listen for ENTER key on input fields
    enter(e) {
        if (e.key === "Enter") {
            this.handleSubmit()
        }
    }
    
    handleSubmit() {
        const startDateEl = document.getElementById("startDateEl")
        const endDateEl = document.getElementById("endDateEl")
        let dataSorter = new DataSorter()

        //make sure end date is not in future or...
        if (dayjs(endDateEl.value) > dayjs().add(2, "hour")) {
            alert("That's future, you fool! Will adjust to current realm.")
            endDateEl.value = dayjs().add(1, "hour").format("YYYY-MM-DD")
        }
        // ...too far in the past (before 28.04.2013)
        if (dayjs(startDateEl.value) < dayjs("2013-04-28")) {
            alert("That's too far in Bitcoin history, setting the date to earliet possible date.")
            startDateEl.value = dayjs("2013-04-28").format("YYYY-MM-DD")
        }

        //get and format data from inputs for the API call
        const startDate = dayjs.utc(startDateEl.value)
        const startDateTimestamp = dayjs.utc(startDate) / 1000
        const endDate = dayjs.utc(endDateEl.value).add(1, "hour")
        const endDateTimestamp = dayjs.utc(endDate) / 1000
        
        //add class to results fields
        const results = document.getElementsByClassName("outputBox-none")
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
        .then(data => { dataSorter.sortData(data)})
    }
    
}