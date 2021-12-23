//FIND LONGEST DOWNFALL
const longestDownfallEl = document.getElementById("longestDownfallEl")

export default function longestDownfall(data) {
    let A = 0
    let B = 0
    let currentMaxLength = 0
    while (B < data.length - 1) {
        if (data[B].value > data[B + 1].value) {
            B++
            currentMaxLength = Math.max(currentMaxLength, B - A)
        } else {
            B++
            A = B
        }
    }

    //render highest downfall to the app
    let postscript = ""
    if (currentMaxLength > 1) {
        postscript = "days in a row"
    } else {
        postscript = "day"
    }

    //Not the safest way to do this, but the simplest as I'm not suppose to use frameworks
    longestDownfallEl.innerHTML = `
    <h3>Longest downfall trend</h3>
    <h1>${currentMaxLength}</h1>
    <p>${postscript}</p>
    `
}