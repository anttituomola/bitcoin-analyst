/* eslint-disable no-undef */
import TimeMachine from "./TimeMachine.js"
import FindSalesPeakDate from "./FindSalesPeakDate.js"
import LongestDownfall from "./LongestDownfall.js"

export default class DataSorter {
    //SORT INITIAL DATA
    sortData(data, amountOfDays) {
        const totalVolumes = data.total_volumes
        const prices = data.prices

        if (amountOfDays >= 90) {
            let volumeDataPoints = this.sortDataByDate(data.total_volumes)
            let valueDataPoints = this.sortDataByDate(data.prices)

            FindSalesPeakDate.findSalesPeakDate(volumeDataPoints)
            LongestDownfall.longestDownfall(valueDataPoints)
            TimeMachine.biggegstProfitsFinder(valueDataPoints)
        } else {
            let midnightVolumeDatapoints = this.sortDataByDate(totalVolumes)
            let midnightValueDatapoints = this.sortDataByDate(prices)

            FindSalesPeakDate.findSalesPeakDate(midnightVolumeDatapoints)
            LongestDownfall.longestDownfall(midnightValueDatapoints)
            TimeMachine.biggegstProfitsFinder(midnightValueDatapoints)
        }
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

        //push first instances of each day to a new array
        const results = document.getElementsByClassName("outputBox")
        const firstHourDatapoints = Object.values(groupedByDate).map(dataPointsForDay => dataPointsForDay[0]);
        if(firstHourDatapoints.length > 0) {
            console.log(firstHourDatapoints)
            Object.values(results).forEach(el => el.classList.remove("outputBox-none"))
            return firstHourDatapoints
        } else {
            Object.values(results).forEach(el => el.classList.add("outputBox-none"))
            alert("check your dates")
            throw new Error("There might be something unbitcoiny with your dates")
        }
    }
}