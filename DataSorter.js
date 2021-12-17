import timeMachine from "./timeMachine.js"
import findSalesPeakDate from "./findSalesPeakDate.js"
import longestDownfall from "./longestDownfall.js"

export default class DataSorter {
    //SORT INITIAL DATA
    sortData(data) {
        const totalVolumes = data.total_volumes
        const prices = data.prices

        //convert UNIX timestamps to human readable times
        let midnightVolumeDatapoints = this.extractMidnightDatapoints(totalVolumes)
        let midnightValueDatapoints = this.extractMidnightDatapoints(prices)

        findSalesPeakDate(midnightVolumeDatapoints)
        longestDownfall(midnightValueDatapoints)
        timeMachine(midnightValueDatapoints)

    }

    extractMidnightDatapoints(dataPoints) {
        const dateArray = dataPoints.map((hour) => {
            const individualDates = {}
            individualDates.date = dayjs(hour[0]).format("DD")
            individualDates.hour = dayjs(hour[0]).format("HH")
            individualDates.min = dayjs(hour[0]).format("mm")
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