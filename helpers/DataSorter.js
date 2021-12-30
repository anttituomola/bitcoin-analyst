import FindSalesPeakDate from "./FindSalesPeakDate.js"
import LongestDownfall from "./LongestDownfall.js"
import TimeMachine from "./TimeMachine.js"

export default class DataSorter {
    // SORT INITIAL DATA
    sortData(data) {
        const {total_volumes: totalVolumes, prices} = data

        const volumeDataPoints = this.groupDataByDate(totalVolumes)
        const valueDataPoints = this.groupDataByDate(prices)

        FindSalesPeakDate.findSalesPeakDate(volumeDataPoints)
        LongestDownfall.longestDownfall(valueDataPoints)
        TimeMachine.biggegstProfitsFinder(valueDataPoints)
    }

    groupDataByDate(dataPoints) {
        const INDEX_OF_FIRST_ELEMENT = 0
        const INDEX_OF_SECOND_ELEMENT = 1

        const dateArray = dataPoints.map((hour) => {
            const individualDates = {}

            individualDates.date = dayjs.utc(hour[INDEX_OF_FIRST_ELEMENT]).format("DD.MM.YYYY")
            individualDates.hour = dayjs.utc(hour[INDEX_OF_FIRST_ELEMENT]).format("HH")
            individualDates.min = dayjs.utc(hour[INDEX_OF_FIRST_ELEMENT]).format("mm")
            individualDates.timestamp = hour[INDEX_OF_FIRST_ELEMENT]
            individualDates.value = hour[INDEX_OF_SECOND_ELEMENT]

            return individualDates
        })


        // Group data by date (soon we can replace this with dateArray.groupBy(({ date }) => date);)
        const groupedByDate = dateArray.reduce((acc, value) => {
            if (!acc[value.date]) {
                acc[value.date] = []
            }

            acc[value.date].push(value)

            return acc
        }, {})


        // Push first instances of each day to a new array (this is for hourly data, ie. less than 90 days)
        const results = document.getElementsByClassName("outputBox")
        const firstDataPointOfTheDay = Object.values(groupedByDate).map(dataPointsForDay => dataPointsForDay[0]);

        // Check if there's data available
        if (firstDataPointOfTheDay.length > 0) {
            console.log(firstDataPointOfTheDay)
            Object.values(results).forEach(el => el.classList.remove("outputBox-none"))

            return firstDataPointOfTheDay
        }
        Object.values(results).forEach(el => el.classList.add("outputBox-none"))
        alert("check your dates")
        throw new Error("There might be something unbitcoiny with your dates")
    }
}
