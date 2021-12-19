import timeMachine from "./timeMachine.js"
import findSalesPeakDate from "./findSalesPeakDate.js"
import longestDownfall from "./longestDownfall.js"

export default class DataSorter {
    //SORT INITIAL DATA
    sortData(data, amountOfDays) {
        const totalVolumes = data.total_volumes
        const prices = data.prices

        if (amountOfDays >= 90) {
            let volumeDataPoints = this.sortDataByDate(data.total_volumes)
            let valueDataPoints = this.sortDataByDate(data.prices)

            findSalesPeakDate(volumeDataPoints)
            longestDownfall(valueDataPoints)
            timeMachine(valueDataPoints)
        } else {
            let midnightVolumeDatapoints = this.sortDataByDate(totalVolumes)
            let midnightValueDatapoints = this.sortDataByDate(prices)

            findSalesPeakDate(midnightVolumeDatapoints)
            longestDownfall(midnightValueDatapoints)
            timeMachine(midnightValueDatapoints)
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

        //group data by date
        const groupedByDate = dateArray.reduce((acc, value) => {
            if (!acc[value.date]) {
                acc[value.date] = []
            }

            acc[value.date].push(value)

            return acc
        }, {})

        //push first instances of each day to a new array
        const firstHourDatapoints = Object.values(groupedByDate).map(dataPointsForDay => dataPointsForDay[0]);
        return firstHourDatapoints
    }
}