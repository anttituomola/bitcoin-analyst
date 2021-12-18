const salesPeakEl = document.getElementById("salesPeakEl")

//FIND TRANSACTION PEAK DATE
export default function findSalesPeakDate(data) {
    const firstHourDatapoints = data
    //sort dates by value + grab the highest
    const sortedIntances = firstHourDatapoints.sort((a, b) => b.value - a.value)
    const highestVolumeDay = sortedIntances[0]

    //render the results to the app
    salesPeakEl.innerHTML = `
    <h3>Highest trading volume:</h3>
    <h1>${dayjs(highestVolumeDay.timestamp).format("DD.MM.YYYY")}</h1>
    <h3>Total trading volume:</h3>
    <p>${Math.round(highestVolumeDay.value)} €</p>
    `
}