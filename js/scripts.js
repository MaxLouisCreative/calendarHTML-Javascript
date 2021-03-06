const debugLoggingEnabled = false;
const actionLoggingEnabled = true;

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
  renderCalendarCells();
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
  renderCalendarCells();
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
  renderCalendarCells();
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
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement("td");
        let cellText = document.createTextNode(date);
        cell.setAttribute('data-day', date);
        cell.setAttribute('data-month', month);
        cell.setAttribute('data-year', year);
        cell.setAttribute('class', 'calendar-cell');
        cell.setAttribute('data-id', year + '-' + month + '-' + date);
        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.classList.add("grupa-today");
        } // color today's date
        cell.appendChild(cellText);

        //add Drag and Drop
        cell.setAttribute("ondrag", "drag(event)");
        cell.setAttribute("ondrop", "drop(event)");
        cell.setAttribute("ondragover", "allowDrop(event)")
        row.appendChild(cell);
        date++;
      }

    }

    tbl.appendChild(row); // appending each row into calendar body.
  }

}

function getEvent(dayID) {
  var events = getEventById(dayID);
}

// Drag and Drop functions
let dragEventId = -1;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  dragEventId = ev.target.id;
}

function drop(ev) {
  ev.preventDefault();
  if (dragEventId < -1 || !ev.target.dataset.day)
    return;

  moveEventToDay(dragEventId, ev.target.dataset.day)
  renderCalendarCells();
}

function clearCell() {
  if ($('.grupa-event').length) {
    $('.grupa-event').remove();
  }
}

function renderCalendarCells() {
  clearCell();
  $('.calendar-cell').each(function() {
    var dayID = $(this).data().id;
    var events = getEventsByDate(dayID);

    events.sort((e1, e2) => (e1.datetime < e2.datetime) ? -1 : (e1.datetime > e2.datetime) ? 1 : 0);
    events.forEach(event => {
      var eventDiv = $("<div></div>", {
          'class': 'grupa-event',
          'data-id': event.id,
          'draggable': true,
          'data-title': event.title,
          'data-time': event.time,
          'id': event.id
        })
        .append("<p>" + event.title + "</p>")
        .append("<p>" + event.time + "</p>");
      eventDiv.appendTo(this);
    });
  });
  $('.calendar-cell').on('click', function() {
    var el = $(this).data();
    openPopup(el, $(this).id);
  });
  $(".grupa-event").on("click", function(e) {
    var el = $(this).parent().data();
    var el2 = $(this).data();
    openEdit(el, el2, el2.id);
  });
}

function init() {
  renderCalendarCells();
  updateDarkModeVisuals();
}
