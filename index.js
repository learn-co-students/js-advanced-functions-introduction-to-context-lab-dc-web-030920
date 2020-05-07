// Your code here
function createEmployeeRecord(arr){
    
    var obj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj

}

function createEmployeeRecords(arr){
    return arr.map(createEmployeeRecord)
}

function createTimeInEvent(record, timestamp){

    var obj = {
        type: "TimeIn",
        date: timestamp.split(" ")[0],
        hour: parseInt(timestamp.split(" ")[1])
    }
    let time = [...record.timeInEvents, obj]
    record.timeInEvents = time
    return record

}

function createTimeOutEvent(record, timestamp){

    var obj = {
        type: "TimeOut",
        date: timestamp.split(" ")[0],
        hour: parseInt(timestamp.split(" ")[1])
    }
    let time = [...record.timeOutEvents, obj]
    record.timeOutEvents = time
    return record

}

function hoursWorkedOnDate(record, date){
    let timeIn = record.timeInEvents.find((time) => {
        return time.date === date
    })

    let timeOut = record.timeOutEvents.find((time) => {
        return time.date === date
    })

    return (timeOut.hour - timeIn.hour) / 100
    
}

function wagesEarnedOnDate(record, date){

    let hours = hoursWorkedOnDate(record, date)

    return hours * record.payPerHour

}


function allWagesFor(record){
    let wages = 0
    record.timeInEvents.forEach(event => {
        wages += wagesEarnedOnDate(record, event.date)
    })
    return wages
}
 
function calculatePayroll(arr){
    let pay = 0
    arr.forEach(employee => {
        pay += allWagesFor(employee)
    })
    return pay
}

function findEmployeeByFirstName(arr,name){

    return arr.find(employee => employee.firstName === name)
}

