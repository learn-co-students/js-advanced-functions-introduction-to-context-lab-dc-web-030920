// Your code here

function createEmployeeRecord(employeeArray){
    const employeeObj = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents:[]
    }
    return employeeObj
}

function createEmployeeRecords(nestedArray){
    return nestedArray.map(employee => createEmployeeRecord(employee)
    );
}


function createTimeInEvent(employeeObj, timeIn){
    const timeInArray = timeIn.split(" ")
    const timeInObj = {
        type: "TimeIn",
        hour: parseInt(timeInArray[1]),
        date: timeInArray[0]
    }
    employeeObj.timeInEvents.push(timeInObj)
    return employeeObj
}

function createTimeOutEvent(employeeObj, timeOut){
    const timeOutarray = timeOut.split(' ')
    const timeOutObj = {
        type: "TimeOut",
        hour: parseInt(timeOutarray[1]),
        date: timeOutarray[0]
    }
    employeeObj.timeOutEvents.push(timeOutObj)
    return employeeObj
}

function hoursWorkedOnDate(employeeObj, date){
    const timeIn = employeeObj.timeInEvents.find(dateInstance => dateInstance.date === date)
    const timeOut = employeeObj.timeOutEvents.find(dateInstance => dateInstance.date === date)
    return (parseInt(timeOut.hour) - parseInt(timeIn.hour))/100
}


function wagesEarnedOnDate(employeeObj, date){
    return (hoursWorkedOnDate(employeeObj, date)*parseInt(employeeObj.payPerHour))
}


function allWagesFor(employeeObj){
    let total = 0 
    employeeObj.timeInEvents.forEach(timeInObj => {
        total +=  wagesEarnedOnDate(employeeObj, timeInObj.date)
    })
    return total
}

function findEmployeeByFirstName(arrayOfRecords, firstName) {
    return arrayOfRecords.find(employeeObj => employeeObj.firstName === firstName)
}


function calculatePayroll(arrayOfRecords){
   return arrayOfRecords.reduce((sum, employeeObj) => {
        return sum += allWagesFor(employeeObj)
    }, 0)
}