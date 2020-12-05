let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
    calendarCell();
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
    calendarCell();
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {

        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                cell.setAttribute('data-day',date);
                cell.setAttribute('data-month',month);
                cell.setAttribute('data-year',year);
                cell.setAttribute('class','calendar-cell');
                cell.setAttribute('data-id',year+'-'+month+'-'+date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("grupa-today");
                } // color today's date
                cell.appendChild(cellText);

                //add Drag and Drop
                cell.setAttribute("ondrop", "drop(event)");
                cell.setAttribute("ondragover", "allowDrop(event)")
                row.appendChild(cell);
                date++;
            }

        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

function getEvent(dayID){
    var events = ReadJSON(dayID);
    console.log(events);
}


// Drag and Drop functions
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function clearCell(){
     if ($('.grupa-event').length) {
        $('.grupa-event').remove();
    } 
}
function calendarCell(){
    clearCell();
    $('.calendar-cell').each(function() {
        var dayID = $(this).data().id;
        var event = ReadJSON(dayID);

        if (event != undefined) {
            var eventDiv = $("<div></div>", { 'class': 'grupa-event', 'data-id': dayID, 'draggable':true, 'data-title': event.title, 'data-time': event.time  }).append("<p>"+event.title+"</p>").append("<p>"+event.time+"</p>");
            eventDiv.appendTo(this);
        }
    });
}
