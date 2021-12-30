// FIND LONGEST DOWNFALL
const longestDownfallEl = document.getElementById("longestDownfallEl")

export default class LongestDownfall {
    constructor() {
        this.render = this.render.bind(this)
    }

    static longestDownfall(data) {
        let minIndex = 0
        let maxIndex = 1
        let maxDownfallLength = 0
        let currentDownfallLength = 0
        let difference = 0

        while (maxIndex < data.length) {
            // Compare current date to the next one
            difference = data[maxIndex].value - data[minIndex].value
            if (difference < 0) {
                maxIndex++
                minIndex++
                currentDownfallLength++
            } else {
                minIndex = maxIndex
                maxIndex++
                currentDownfallLength = 0
            }
            maxDownfallLength = Math.max(maxDownfallLength, currentDownfallLength)
        }

        this.render(maxDownfallLength)
    }

    // Render longest downfall to the app
    static render(maxDownfallLength) {
        let postscript = ""

        if (maxDownfallLength > 1) {
            postscript = "days in a row"
        } else {
            postscript = "day"
        }

        // Not the safest way to do this, but the simplest as I'm not using frameworks
        longestDownfallEl.innerHTML = `
        <h3>Longest downfall trend</h3>
        <h1>${maxDownfallLength}</h1>
        <p>${postscript}</p>
        `
    }
}
