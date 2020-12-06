let calendarEvents = loadEvents();

function getNextEventId() {
  return loadEvents().reduce((current, e) => Math.max(current, e.id), 0) + 1;
}

function CalendarEvent({ title, time, day, month, year, id }) {
  this.title = title;
  this.time = time;
  this.day = day;
  this.month = month;
  this.year = year;
  this.date = `${year}-${month}-${day}`;
  this.datetime = `${this.date}|${time}`;
  this.id = id;
}

function getEventsByDate(date) {
  return calendarEvents.filter(e => e.date === date);
}

function getEventById(eventId) {
  const events = calendarEvents.filter(e => e.id == eventId);
  return events.length > 0 ? events[0] : null;
}

function createEvent(formdata, id) {
  persistAfter(() => calendarEvents.push(new CalendarEvent({
    title: formdata[0].value,
    time: formdata[1].value,
    day: formdata[2].value,
    month: formdata[3].value,
    year: formdata[4].value,
    id: id || getNextEventId()
  })));
}


function deleteEventById(eventId, isDiscreteAction) {
  if (actionLoggingEnabled && isDiscreteAction)
    console.log("Delete Event Id", eventId);

  persistAfter(() => calendarEvents = calendarEvents.filter(e => e.id != eventId));
}

function updateEvent(eventId, formdata) {
  if (actionLoggingEnabled)
    console.log("Update Event Id", eventId);

  deleteEventById(eventId);
  persistAfter(() => createEvent(formdata, eventId));
}

function moveEventToDay(eventId, day) {
  if (actionLoggingEnabled)
    console.log("Move Event Id", eventId);

  const e = getEventById(eventId);
  if (!e)
    return;

  deleteEventById(eventId);

  e.day = day;
  e.date = e.year + '-' + e.month + '-' + day;

  persistAfter(() => calendarEvents.push(e));
}

function persistAfter(action) {
  action();
  saveEvents();
}

function saveEvents() {
  if (debugLoggingEnabled)
    console.log(calendarEvents);
  localStorage.setItem("calendar", JSON.stringify(calendarEvents));
}

function loadEvents() {
  const events = localStorage.getItem("calendar") === null ? [] :
    JSON.parse(localStorage.getItem("calendar"));
  if (debugLoggingEnabled)
    console.log(events);
  return events;
}

function clearAllEvents() {
  persistAfter(() => calendarEvents = []);
}
