const startDateEl = document.getElementById("startDateEl")
const endDateEl = document.getElementById("endDateEl")
document.getElementById("submitBtn").addEventListener("click", submit)

function submit() {
    console.log(startDateEl.value, endDateEl)
}