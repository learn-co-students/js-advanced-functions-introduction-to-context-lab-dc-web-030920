
let createEmployeeRecord = function(array){
   
    return {
     firstName : array[0],
     familyName : array[1], 
     title : array[2], 
     payPerHour : array[3], 
     timeInEvents : [], 
     timeOutEvents : []
     }

}
let createEmployeeRecords = function(nestedArray){
    return nestedArray.map( array => createEmployeeRecord(array))
}

let createTimeInEvent = function(employeeRecord, dateStamp){

    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    }
    employeeRecord.timeInEvents.push(timeInObj)
    return employeeRecord
}

let createTimeOutEvent = function(employeeRecord, dateStamp){

    let timeOutObj = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    }
    employeeRecord.timeOutEvents.push(timeOutObj)
    return employeeRecord
}

let hoursWorkedOnDate = function(employee, date){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === date
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}