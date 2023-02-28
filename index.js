/*
Build a timecard and payroll application where employees punch in when they arrive and punch out when they leave.

use military time

time stamps in string form "YYYY-MM-DD 2400"

employees never work across days
*/

function createEmployeeRecord(array) {
    let emptyArr =[];
    let emptyArr2 = [];
    let employee = {};
    
    employee.firstName= array[0];
    employee.familyName = array[1];
    employee.title = array[2];
    employee.payPerHour = array[3];
    employee.timeInEvents = emptyArr;
    employee.timeOutEvents = emptyArr2;

    return employee;
}

function createEmployeeRecords(arrayOfArrays) {
    let employeeRecords = [];
    arrayOfArrays.forEach(elem=>employeeRecords.push(createEmployeeRecord(elem)));
    
    return employeeRecords;
}

function createTimeInEvent(record, dateTime) {
    
    let newEvent ={};
    newEvent.type = "TimeIn";
    newEvent.date = dateTime.substring(0, 10);
    newEvent.hour = parseInt(dateTime.substring(11));
    
    
    record.timeInEvents.push(newEvent);
    return record;
    
}


function createTimeOutEvent(record, dateTime) {
    let newEvent = {};
    newEvent.type = "TimeOut";
    newEvent.date = dateTime.substring(0,10);
    newEvent.hour = parseInt(dateTime.substring(11));
    
    record.timeOutEvents.push(newEvent);
    return record;
}

function hoursWorkedOnDate(record, date){
    
    let timeInEvents= record.timeInEvents.find(elem => elem.date===date);
    let timeOutEvents = record.timeOutEvents.find(elem=> elem.date === date);
    return (timeOutEvents.hour - timeInEvents.hour)/100;

}


function wagesEarnedOnDate(record, date) {
    let hours = hoursWorkedOnDate(record,date);
    return parseFloat( record.payPerHour * hours);

}

function allWagesFor(record) {
    
    let mapIn =record.timeInEvents.map(elem => elem.date);
    
    let reduceHours = mapIn.reduce((acc, x)=> acc+ wagesEarnedOnDate(record, x), 0)
    console.log(reduceHours); 
    return reduceHours;
    
    
}


function calculatePayroll(arrayOfArrays) {
    let newArr = [];
    arrayOfArrays.forEach(elem=>{
        newArr.push(allWagesFor(elem));
    })
    function sumIt(total, num) {
        return total +num;
    }
    return newArr.reduce(sumIt);
}