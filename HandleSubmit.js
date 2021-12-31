import DataSorter from "./helpers/DataSorter.js"

export default class HandleSubmit {
    constructor() {
        this.handleSubmit = this.handleSubmit.bind(this)
        this.enter = this.enter.bind(this)
    }

    // Listen for ENTER key on input fields
    enter(event) {
        if (event.key === "Enter") {
            this.handleSubmit()
        }
    }

    // TODO: this method is waaaay too long, make it shorter
    handleSubmit() {
        const startDateEl = document.getElementById("startDateEl")
        const endDateEl = document.getElementById("endDateEl")
        const dataSorter = new DataSorter()
        const secondsToMilliseconds = 1000

        // Make sure end date is not in future or...
        if (dayjs(endDateEl.value) > dayjs().add(2, "hour")) {
            alert("That's future, you fool! Will adjust to current realm.")
            endDateEl.value = dayjs().add(1, "hour").format("YYYY-MM-DD")
        }

        // ...too far in the past (before 28.04.2013)
        if (dayjs(startDateEl.value) < dayjs("2013-04-28")) {
            alert("That's too far in Bitcoin history, setting the date to earliet possible date.")
            startDateEl.value = dayjs("2013-04-28").format("YYYY-MM-DD")
        }

        // Get and format data from inputs for the API call
        const startDate = dayjs.utc(startDateEl.value)
        const startDateTimestamp = dayjs.utc(startDate) / secondsToMilliseconds
        const endDate = dayjs.utc(endDateEl.value).add(1, "hour")
        const endDateTimestamp = dayjs.utc(endDate) / secondsToMilliseconds

        // Fetch the data from Gecko API
        fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startDateTimestamp}&to=${endDateTimestamp}`)
            .then(res => {
                if (res.ok) {
                    return res.json()
                        .then(data => dataSorter.sortData(data))
                }
                throw new Error("Hmm... there's something fishy going on here.")
            })
    }

    // Dark theme
    themeChanger() {
        document.body.classList.toggle("dark-theme")
    }
}
