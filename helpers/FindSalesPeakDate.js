

// FIND TRANSACTION PEAK DATE
export default class FindSalesPeakDate {
    constructor() {
        this.render = this.render.bind(this)
    }

    static findSalesPeakDate(data) {
        const firstHourDatapoints = data
        // Sort dates by value + grab the highest
        const sortedIntances = firstHourDatapoints.sort((firstDate, secondDate) => secondDate.value - firstDate.value)
        const [highestVolumeDay] = sortedIntances

        this.render(highestVolumeDay)
    }

    // Render the results to the app
    static render(highestVolumeDay) {
        const salesPeakEl = document.getElementById("salesPeakEl")

        salesPeakEl.innerHTML = `
            <h3>Highest trading volume:</h3>
            <h1>${dayjs.utc(highestVolumeDay.timestamp).format("DD.MM.YYYY")}</h1>
            <p>On that day:</p>
            <p>${Math.round(highestVolumeDay.value)} €</p>
            `
    }
}

