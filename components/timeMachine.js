export default class TimeMachine {
    constructor() {
        this.render = this.render.bind(this)
    }
    static biggegstProfitsFinder(data) {
        //sort data by date
        const sortedIntances = data.sort((a, b) => a.timestamp - b.timestamp)

        //Find the biggest difference in values within the timeframe
        let min = 0
        let max = 1
        let buyDateIndex
        let sellDateIndex
        let difference = 0
        let profits = 0
        while (max < sortedIntances.length) {
            difference = sortedIntances[max].value - sortedIntances[min].value
            if (difference > profits) {
                profits = difference
                buyDateIndex = min
                sellDateIndex = max
            }
            if (difference < 0) {
                min = max
            }
            max++
        }
        this.render(data, buyDateIndex, sellDateIndex, profits)
    }

    //render the results to the app
    static render(data, buyDateIndex, sellDateIndex, profits) {
        const timeMachineEl = document.getElementById("timeMachineEl")

        if (profits) {
            //Not the safest way to do this, but the simplest as I'm not using frameworks
            timeMachineEl.innerHTML = `
                    <h3>Time Machine setup</h3>
                    <h1>Buy on ${dayjs.utc(data[buyDateIndex].timestamp).format("DD.MM.YYYY")}</h1>
                    <h1>Sell on ${dayjs.utc(data[sellDateIndex - 1].timestamp).format("DD.MM.YYYY")}</h1>
                    <p>Profits: ${Math.round(profits)} €</p>
                    `
        } else {
            //Not the safest way to do this, but the simplest as I'm not using frameworks
            timeMachineEl.innerHTML = `
                    <h3>Time Machine setup</h3>
                    <p>Profits: Cancel the trip, no profits to be made for these dates.</p>
                    `
        }

    }

}


