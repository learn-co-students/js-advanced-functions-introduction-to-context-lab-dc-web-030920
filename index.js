// Your code here
function createEmployeeRecord(obj){
    return {
        firstName: obj[0],
        familyName: obj[1],
        title: obj[2],
        payPerHour: obj[3],
        timeInEvents:[],
        timeOutEvents: []
    }
}

function createEmployeeRecords(nestedArr){
    // nestedArr = array of arrays
    //returns an array of objects
    return nestedArr.map( arr => {
        return createEmployeeRecord(arr)
    })
    
}

function createTimeInEvent(employeeRecord, dateStamp){
    // employeeRecord == obj
    // dateStamp == "YYYY-MM-DD HHMM"
    // returns employee record
    const dateSplit = dateStamp.split(" ")
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateSplit[1]),
        date: dateSplit[0],
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    // employeeRecord == obj
    // dateStamp == "YYYY-MM-DD HHMM"
    // returns employee record
    const dateSplit = dateStamp.split(" ")
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateSplit[1]),
        date: dateSplit[0]
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    // Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
    // returns hours worked as an integer
    const timeIn = employeeRecord.timeInEvents.find(timeInObj => timeInObj.date == date)
    const timeOut = employeeRecord.timeOutEvents.find(timeOutObj => timeOutObj.date == date)
    const hoursWorked = timeOut.hour - timeIn.hour
    return hoursWorked/100
}

function wagesEarnedOnDate(employeeRecord, date){
    // multiplies hours worked by employee's rate per hour
    let hoursWorked = hoursWorkedOnDate(employeeRecord,date)
    return employeeRecord.payPerHour * hoursWorked
}

function allWagesFor(employeeRecord){
    //employeeRecord == array of objects(type, hour, date)
    let allWagesEarned = employeeRecord.timeInEvents.map(timeIn => wagesEarnedOnDate(employeeRecord, timeIn.date))
    return allWagesEarned.reduce(function(accumulator, currentValue){return accumulator + currentValue}, 0)
    

    // loop through all timein events
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee => { return employee.firstName === firstName})
     
}

function calculatePayroll(employeeRecords){
    let employeeWages = employeeRecords.map(employee => allWagesFor(employee))
    return employeeWages.reduce(function(accumulator, currentValue){return accumulator + currentValue}, 0)
}