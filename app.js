import HandleSubmit from "./HandleSubmit.js"
const handler = new HandleSubmit()

// Set initial values to input fields
document.getElementById("startDateEl").value = dayjs().add(-7, "day").format("YYYY-MM-DD")
document.getElementById("endDateEl").value = dayjs().format("YYYY-MM-DD")

// Listen for inputs
document.getElementById("submitBtn").addEventListener("click", handler.handleSubmit)
document.getElementById("startDateEl").addEventListener("keypress", handler.enter)
document.getElementById("endDateEl").addEventListener("keypress", handler.enter)
document.getElementById("themeChangerImg").addEventListener("click", handler.themeChanger)
