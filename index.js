// Your code here
function createEmployeeRecord(employeeDetails) {
  const employeeObj = {};
  for (let i = 0; i < employeeDetails.length; i++) {
    switch (i) {
      case 0:
        employeeObj.firstName = employeeDetails[i];
        break;
      case 1:
        employeeObj.familyName = employeeDetails[i];
        break;
      case 2:
        employeeObj.title = employeeDetails[i];
        break;
      case 3:
        employeeObj.payPerHour = employeeDetails[i];
        employeeObj.timeInEvents = [];
        employeeObj.timeOutEvents = [];
        break;
    }
  }
  return employeeObj;
}

function createEmployeeRecords(arrOfArrays) {
  const arrOfObjects = arrOfArrays.map((arr) => createEmployeeRecord(arr));
  return arrOfObjects;
}

function createTimeInEvent(employeeObj, dateStamp) {
  const dateStampArr = dateStamp.split(" ");
  const time = parseInt(dateStampArr[1].toString());
  const dateString = dateStampArr[0].toString();
  employeeObj.timeInEvents.push({
    type: "TimeIn",
    hour: time,
    date: dateString,
  });
  return employeeObj;
}

function createTimeOutEvent(employeeObj, dateStamp) {
  const dateStampArr = dateStamp.split(" ");
  const time = parseInt(dateStampArr[1].toString());
  const dateString = dateStampArr[0].toString();
  employeeObj.timeOutEvents.push({
    type: "TimeOut",
    hour: time,
    date: dateString,
  });
  return employeeObj;
}

function hoursWorkedOnDate(employeeObj, date) {
  let timeIn;
  let timeOut;
  employeeObj.timeInEvents.forEach((timeInEvent) => {
    if (timeInEvent.date === date) {
      timeIn = timeInEvent.hour;
    }
  });

  employeeObj.timeOutEvents.forEach((timeOutEvent) => {
    if (timeOutEvent.date === date) {
      timeOut = timeOutEvent.hour;
    }
  });

  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(employeeObj, date) {
  const hoursWorked = hoursWorkedOnDate(employeeObj, date);
  return employeeObj.payPerHour * hoursWorked;
}

function allWagesFor(employeeObj) {
  const payOwed = employeeObj.timeInEvents.reduce((totalWages, timeInEvent) => {
    const date = timeInEvent.date;
    const wages = wagesEarnedOnDate(employeeObj, date);
    return totalWages + wages;
  }, 0);

  return payOwed;
}

function calculatePayroll(arrayOfEmployeeObjects) {
  const payOwedToAllEmployees = arrayOfEmployeeObjects.reduce(
    (totalPayOwed, employeeObject) => {
      const allWages = allWagesFor(employeeObject);
      return totalPayOwed + allWages;
    },
    0
  );

  return payOwedToAllEmployees;
}
