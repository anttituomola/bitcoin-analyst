document.getElementById("submitBtn").addEventListener("click", handleSubmit)
const startDateEl = document.getElementById("startDateEl")
const endDateEl = document.getElementById("endDateEl")

function handleSubmit() {
    const startDate = new Date(startDateEl.value)
    const startDateTimestamp = Date.parse(startDate)/1000
    const endDate = new Date(endDateEl.value)
    const endDateTimestamp = Date.parse(endDate)/1000
    console.log(startDateTimestamp, endDateTimestamp)
    
    fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startDateTimestamp}&to=${endDateTimestamp}`)
        .then(res => res.json())
        .then(data => console.log(data))
}