import TimeMachine from "./TimeMachine.js"
import FindSalesPeakDate from "./FindSalesPeakDate.js"
import LongestDownfall from "./LongestDownfall.js"

export default class DataSorter {
    //SORT INITIAL DATA
    sortData(data) {
        const totalVolumes = data.total_volumes
        const prices = data.prices

        let volumeDataPoints = this.sortDataByDate(totalVolumes)
        let valueDataPoints = this.sortDataByDate(prices)
        
        FindSalesPeakDate.findSalesPeakDate(volumeDataPoints)
        LongestDownfall.longestDownfall(valueDataPoints)
        TimeMachine.biggegstProfitsFinder(valueDataPoints)
    }

    sortDataByDate(dataPoints) {
        const dateArray = dataPoints.map((hour) => {
            const individualDates = {}
            individualDates.date = dayjs.utc(hour[0]).format("DD.MM.YYYY")
            individualDates.hour = dayjs.utc(hour[0]).format("HH")
            individualDates.min = dayjs.utc(hour[0]).format("mm")
            individualDates.timestamp = hour[0]
            individualDates.value = hour[1]
            return individualDates
        })

        //group data by date (soon we can replace this with dateArray.groupBy(({ date }) => date);)
        const groupedByDate = dateArray.reduce((acc, value) => {
            if (!acc[value.date]) {
                acc[value.date] = []
            }

            acc[value.date].push(value)

            return acc
        }, {})

        //push first instances of each day to a new array (this is for hourly data, ie. less than 90 days)
        const results = document.getElementsByClassName("outputBox")
        const firstDataPointOfTheDay = Object.values(groupedByDate).map(dataPointsForDay => dataPointsForDay[0]);
        //check if there's data available
        if (firstDataPointOfTheDay.length > 0) {
            console.log(firstDataPointOfTheDay)
            Object.values(results).forEach(el => el.classList.remove("outputBox-none"))
            return firstDataPointOfTheDay
        } else {
            Object.values(results).forEach(el => el.classList.add("outputBox-none"))
            alert("check your dates")
            throw new Error("There might be something unbitcoiny with your dates")
        }
    }
}