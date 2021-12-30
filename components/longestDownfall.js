//FIND LONGEST DOWNFALL
const longestDownfallEl = document.getElementById("longestDownfallEl")

export default class LongestDownfall {
    constructor() {
        this.render = this.render.bind(this)
    }
     static longestDownfall(data) {
        /* let min = 0
        let max = 1
        let currentMaxLength = 0
        while (max < data.length) {
            if (data[min].value > data[max].value) {
                currentMaxLength = Math.max(currentMaxLength, max - min)
            } else {
                min = max
            }
            max++
        } */

        let minIndex = 0
        let maxIndex = 1
        let maxDownfallLength = 0
        let currentDownfallLength = 0
        let difference = 0
        while (maxIndex < data.length) {
            difference = data[maxIndex].value - data[minIndex].value
            if (difference > 0) {
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

    static render(maxDownfallLength) {
        //render highest downfall to the app
        let postscript = ""
        if (maxDownfallLength > 1) {
            postscript = "days in a row"
        } else {
            postscript = "day"
        }
    
        //Not the safest way to do this, but the simplest as I'm not using frameworks
        longestDownfallEl.innerHTML = `
        <h3>Longest downfall trend</h3>
        <h1>${maxDownfallLength}</h1>
        <p>${postscript}</p>
        `
    }
}