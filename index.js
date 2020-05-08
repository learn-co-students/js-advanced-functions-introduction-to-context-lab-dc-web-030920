// Your code here
function createEmployeeRecord(recordElements){
   return {
        firstName: recordElements[0],
        familyName: recordElements[1],
        title: recordElements[2],
        payPerHour: recordElements[3],
        timeInEvents:  [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays){
    const employeeObjects = []
    arrayOfArrays.forEach(employee => {
        const employeeObj = createEmployeeRecord(employee)
        employeeObjects.push(employeeObj)
    })
    return employeeObjects

}

function createTimeInEvent(employeeRecord, timeStamp){
    let dateArray = timeStamp.split(" ")

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateArray[1]),
        date: dateArray[0]
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeStamp){
    let dateArray = timeStamp.split(" ")

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateArray[1]),
        date: dateArray[0]
    })
    return employeeRecord

}

function hoursWorkedOnDate(employeeRecord, timeStamp){
    let start = employeeRecord.timeInEvents.find((e) => {
        return e.date === timeStamp
    })

    let end = employeeRecord.timeOutEvents.find((e) => {
        return e.date === timeStamp
    })

    return (end.hour - start.hour) / 100

}

function wagesEarnedOnDate(employeeRecord, timeStamp){

    let hours = hoursWorkedOnDate(employeeRecord, timeStamp)
    return (hours * employeeRecord.payPerHour)
}

function allWagesFor(employeeRecord){
    let eligibleDates = employeeRecord.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employeeRecord, d)
    }, 0)

    return payable
}

function calculatePayroll(arrayOfRecords){

   return arrayOfRecords.reduce(function(memo,record) {
        return memo + allWagesFor(record)
    }, 0)

}

function findEmployeeByFirstName(srcArray, firstName){

   return srcArray.find ((employee) => {
        return employee.firstName === firstName
    })

}