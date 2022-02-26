// Your code here
const createEmployeeRecord = (recArray) => {
    return {
        firstName:recArray[0],
        familyName:recArray[1],
        title:recArray[2],
        payPerHour:recArray[3],
        timeInEvents:[],
        timeOutEvents:[]

    }
}

const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map(rec => createEmployeeRecord(rec))
}

function createTimeInEvent(emplys, dateStamp){
    let obj = {
        type: "TimeIn", 
        hour: parseInt(dateStamp.slice(-4)), 
        date: dateStamp.slice(0, 10)
    }
    emplys.timeInEvents.push(obj)
   
    return emplys
}

function createTimeOutEvent(emplys, dateStamp){
    let obj = {
        type: "TimeOut", 
        hour: parseInt(dateStamp.slice(-4)), 
        date: dateStamp.slice(0, 10)
    }
    emplys.timeOutEvents.push(obj)
    return emplys
}

function hoursWorkedOnDate(emplys, dateStamps){
    for (let i=0; i<emplys.timeInEvents.length; i++){
        let hours = emplys.timeOutEvents[i].hour - emplys.timeInEvents[i].hour
        let workedHours = (hours/100)
        return workedHours
    }
}
function wagesEarnedOnDate(emplys, date){
    for (let i=0; i<emplys.timeInEvents.length; i++){
        if(emplys.timeInEvents[i].date === date){
            if(emplys.timeOutEvents[i].date === date){
        let wages =(((emplys.timeOutEvents[i].hour - emplys.timeInEvents[i].hour)/100) * emplys.payPerHour)
        return wages}
    }}}

    function allWagesFor(eRecordObj){
        let allPay = [];
        let allDates = [];
    
        for (let i = 0; i < eRecordObj.timeInEvents.length; i++){
            allDates.push(eRecordObj.timeInEvents[i].date)
        }
    
        allDates.forEach(date => {
            allPay.push(wagesEarnedOnDate(eRecordObj, date))
        });
        let totalPay = allPay.reduce(( previousValue, currentValue ) => previousValue + currentValue)
    
        return totalPay
    }

    
function calculatePayroll(arrOfERecordObj){
    let payroll = [];

    arrOfERecordObj.forEach(employee => {
        payroll.push(allWagesFor(employee)) 
    });

    return payroll.reduce((previousValue, currentValue) => previousValue + currentValue)
}