export default function timeMachine(data) {
    const timeMachineEl = document.getElementById("timeMachineEl")
    console.log(data)

    //sort data by date
    const sortedIntances = data.sort((a, b) => a.timestamp - b.timestamp)

    //Find the biggest difference in values within the timeframe
    let min = 0
    let max = 1
    let difference = 0
    let profits = 0
    while (max < sortedIntances.length) {
        difference = sortedIntances[max].value - sortedIntances[min].value
        if (difference > profits) { profits = difference }
        if (difference < 0) { min = max }
        max++
    }

    //render the results to the app
    if (profits) {
        timeMachineEl.innerHTML = `
            <h3>Time Machine setup</h3>
            <h1>Buy on ${dayjs.utc(data[min].timestamp).format("DD.MM.YYYY")}</h1>
            <h1>Sell on ${dayjs.utc(data[max - 1].timestamp).format("DD.MM.YYYY")}</h1>
            <p>Profits: ${Math.round(profits)} €</p>
            `
    } else {
        timeMachineEl.innerHTML = `
            <h3>Time Machine setup</h3>
            <p>Profits: Cancel the trip, no profits to be made for these dates.</p>
            `
    }

}

