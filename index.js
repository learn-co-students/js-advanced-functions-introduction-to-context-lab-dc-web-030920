// Your code here
// function createEmployeeRecord(row) {
//     const obj = {
//         firstName: row[0],
//         familyName: row[1],
//         title: row[2],
//         payPerHour: row[3],
//         timeInEvents: [],
//         timeOutEvents: []
//     }
//     return obj
// }

let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(aoa) {
    return aoa.map(row => {
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    // console.log(date, hour)
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return employeeRecord
}

// createTimeInEvent(createEmployeeRecord, "2015-02-28 1700")

let createTimeOutEvent = function(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(" ")
    // console.log(date, hour)
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return employeeRecord
}

let hoursWorkedOnDate = function(employeeRecord, dateTime) {
    // find the employee record where the dateTime matches the time of the employeercords work date/time.
    // divde between the time in and time out.
    const timeIn = employeeRecord.timeInEvents.find(function(event) {
        return event.date === dateTime
    })
    const timeOut = employeeRecord.timeOutEvents.find(function(event) {
        return event.date === dateTime
    })

    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(employeeRecord, dateTime) {
    // using hoursWorkedOnDate, multiply the hours by the records payRate to dtermine amount owed.
    // Amount should be returned as a number

    const hours = hoursWorkedOnDate(employeeRecord, dateTime)
    return hours * employeeRecord.payPerHour
}

let allWagesFor = function(employee) {
    // Find employees dates of work
    // return the accumulated values of the dates worked by the employee
    const dates = employee.timeInEvents.map((event) => {
        return event.date
    })

    const owedMoney = dates.reduce((ledger, date) => {
        return ledger + wagesEarnedOnDate(employee, date)
    }, 0)

    return owedMoney
}

let calculatePayroll = function(employeesArray) {
    // calculate the aggregates of all the dates wages and adds them together
    return employeesArray.reduce(function(ledger, employee){
        return ledger + allWagesFor(employee)
    }, 0)}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find((employee) => {
        return employee.firstName === firstName
    })
}