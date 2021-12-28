//FIND LONGEST DOWNFALL
const longestDownfallEl = document.getElementById("longestDownfallEl")

export default class LongestDownfall {
    constructor() {
        this.render = this.render.bind(this)
    }
     static longestDownfall(data) {
        let min = 0
        let max = 0
        let currentMaxLength = 0
        while (max < data.length - 1) {
            if (data[max].value > data[max + 1].value) {
                currentMaxLength = Math.max(currentMaxLength, max - min)
            } else {
                min = max
            }
            max++
        }
        this.render(currentMaxLength)
    }

    static render(currentMaxLength) {
        //render highest downfall to the app
        let postscript = ""
        if (this.currentMaxLength > 1) {
            postscript = "days in a row"
        } else {
            postscript = "day"
        }
    
        //Not the safest way to do this, but the simplest as I'm not using frameworks
        longestDownfallEl.innerHTML = `
        <h3>Longest downfall trend</h3>
        <h1>${currentMaxLength}</h1>
        <p>${postscript}</p>
        `
    }
}