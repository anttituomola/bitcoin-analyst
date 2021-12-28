import HandleSubmit from "./HandleSubmit.js"
const handler = new HandleSubmit

//set initial values to input fields
document.getElementById("startDateEl").value = dayjs().add(-7, "day").format("YYYY-MM-DD")
document.getElementById("endDateEl").value = dayjs().format("YYYY-MM-DD")

//listen for inputs
document.getElementById("submitBtn").addEventListener("click", handler.handleSubmit)
document.getElementById("startDateEl").addEventListener("keypress", handler.enter)
document.getElementById("endDateEl").addEventListener("keypress", handler.enter)


//QUESTIONS
//Why do I need static in front of class methods?

//TODO
//Add tests!: https://titanwolf.org/Network/Articles/Article?AID=5bb2e66a-ddb9-4e6e-ba02-a2aa686bc6c6
//raw data option: show the full data
//Make sure no results under 2 days is returned: it seems the data granularity stays the same even with single day searches?
//validate data!: https://coinmarketcap.com/currencies/bitcoin/historical-data/
//remove eslint and pacgage.json before release
//update live demo

//DONE
//Handle searches over 90 days: done
//Switch to UTC time: done
//Listen for enter on both input fields: done
//If no profits, tell that on Time Machine: done
//mobile optimization: done
//Styling: done
//animations: done
//return an error if there's no data available: done
//Edit readme: add steps to run (clone, open in browser)
//Linting!: done
//also check the end date: is it valid? DONE
//Harmonise the two sliding-window algoriths
//switch from innerHTML to textContent for safety reasons?: not in this project
//Change all functions to class (methods), and separate the rendering parts as individual methods: this also improves testability.: DONE