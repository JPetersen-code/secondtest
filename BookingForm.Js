/**
 * declare a date object
 */
var date = new Date();
/**
 *declare the firstday object
 */
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

/** declare lastday object*/
var lastDay = new Date(date.getFullYear(), date.getMonth() + 3, 0);

/**
 * if firstday is smaller than lastday then perfom the conditions
 */
while (firstDay <= lastDay) {
  var opt = document.createElement("option");
  var text = document.createTextNode(firstDay.toLocaleDateString());
  opt.appendChild(text); //
  document.getElementById("myDropDown").appendChild(opt);
  firstDay.setDate(firstDay.getDate() + 1);
}

/** declare an array called selectedDates*/
var selectedDates = new Array();

/**
 * function to display the date
 *
 */
function displayDate() {
  //document.getElementById("demo").innerHTML += document.getElementById("myDropDown").value + "<br />";
  var selectedDate = document.getElementById("myDropDown").value; //store date selected as string
  //add the selected date to the array
  selectedDates.push(new DatePrice(selectedDate));
  //display total price of all selected dates
  var total = 0;
  for (var i = 0; i < selectedDates.length; i++) {
    total += selectedDates[i].p;
  }
  document.getElementById("demo").innerHTML = total;
  //add all selected dates to myDropDown2
  document.getElementById("myDropDown2").innerHTML = ""; //clear options in myDropDown2
  for (var i = 0; i < selectedDates.length; i++) {
    var opt = document.createElement("option"); //<option></option>
    var text = document.createTextNode(selectedDates[i].d.toLocaleDateString()); //XX/XX/XXXX
    opt.appendChild(text); //<option>XX/XX/XXXX</option>
    document.getElementById("myDropDown2").appendChild(opt);
  }
}

/**
 * Represents a function of taking away a date that is saved.
 */
function RemoveFromArray() {
  var total = document.getElementById("demo").innerHTML;
  var selectedDate = document.getElementById("myDropDown2").value;
  var selectedIndex = document.getElementById("myDropDown2").selectedIndex;
  function compare(a, b) {
    const dateA = a.d;
    const dateB = b.d;

    let comparison = 0;
    if (dateA > dateB) {
      comparison = 1;
    } else if (dateA < dateB) {
      comparison = -1;
    }
    return comparison;
  }

  selectedDates.sort(compare);
  /** Declare function binarySearch
   * {param value}
   * {param list}
   */
  function binarySearch(value, list) {
    let first = 0;
    let last = list.length - 1;
    let position = 0;
    let found = false;
    let middle;

    while (found === false && first <= last) {
      middle = Math.floor((first + last) / 2);
      if (list[middle].d.toLocaleDateString() == value) {
        found = true;
        position = middle;
      } else if (list[middle].d.toLocaleDateString() > value) {
        last = middle - 1;
      } else {
        first = middle + 1;
      }
    }
    return position;
  }

  let posFound = binarySearch(selectedDate, selectedDates);
  total -= selectedDates[posFound].p;
  selectedDates.splice(posFound, 1);
  document.getElementById("myDropDown2").remove(selectedIndex);
  document.getElementById("demo").innerHTML = total;
}

/** creating a class dateprice
 * parameters date
 * parameter getprice
 * if the date is lower return 210
 * if the date is medium return 220
 * if the date is in the middle range return 250.
 */
class DatePrice {
  constructor(d) {
    this.d = new Date(d);
    this.p = this.getPrice();
  }
  getPrice() {
    if (this.d.getMonth() >= 5 && this.d.getMonth() <= 10) {
      return 210;
    } else if (this.d.getMonth() >= 11 && this.d.getDate() <= 18) {
      return 220;
    } else if (this.d.getMonth() >= 11 && this.d.getDate() >= 19) {
      return 250;
    } else if (this.d.getMonth() >= 0 && this.d.getMonth() <= 1) {
      return 250;
    } else {
      return 0;
    }
  }
}
