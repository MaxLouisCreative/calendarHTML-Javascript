let calendarEvents = loadEvents();

function getNextId() {
    return loadEvents().reduce((current, e) => Math.max(current, e.id), 0) + 1;
}

function CalendarEvent(title,time,day,month,year,date) {
    this.title=title;
    this.time=time;
    this.day=day;
    this.month=month;
    this.year=year;
    this.date=date;
    this.datetime=`${date}|${time}`;
}

function createEvent(formdata, id) {
    e = new CalendarEvent();

    e.title = formdata[0].value;
    e.time = formdata[1].value;
    e.day = formdata[2].value;
    e.month = formdata[3].value;
    e.year = formdata[4].value;
    const date = `${e.year}-${e.month}-${e.day}`;
    e.date = date;
    e.datetime = date + '|' + formdata[1].value;
    e.id = id || getNextId();
    if (debugLoggingEnabled)
        console.log({ nextId: e.id });

    calendarEvents.push(e);
    saveEvents(calendarEvents);
}

function getEventsByDate(date) {
    return calendarEvents.filter(e => e.date === date);
}

function getEventById(eventId) {
    let position = SearchJSON(eventId);
    return calendarEvents[position];
}

function deleteEventById(eventId, isDiscreteAction) {
    if (actionLoggingEnabled && isDiscreteAction)
        console.log("Delete Event Id", eventId);

    calendarEvents = calendarEvents.filter(e => e.id != eventId);
    saveEvents();
}

function updateEvent(eventId, data) {
    if (actionLoggingEnabled)
        console.log("Update Event Id", eventId);

    deleteEventById(eventId);
    createEvent(data, eventId);
    saveEvents();
}

function moveEventToDay(eventId, day) {
    if (actionLoggingEnabled)
        console.log("Move Event Id", eventId);

    const e = getEventById(eventId);
    if (!e)
        return;

    deleteEventById(eventId);
    saveEvents();

    e.day = day;
    e.date = e.year+'-'+e.month+'-'+e.day;

    calendarEvents.push(e);
    saveEvents(calendarEvents);
}

function SearchJSON(eventId) {
    if (calendarEvents == []) {
        return null;
    }
    for (var i = 0; i < calendarEvents.length; i++) {
        if (calendarEvents[i].id == eventId) {
            return results = i;
        }
    }
}

function saveEvents() {
    if (debugLoggingEnabled)
        console.log(calendarEvents);
    localStorage.setItem("calendar", JSON.stringify(calendarEvents) );
}

function loadEvents() {
    const events = localStorage.getItem("calendar") === null
        ? []
        : JSON.parse(localStorage.getItem("calendar"));
    if (debugLoggingEnabled)
        console.log(events);
    return events;
}

function clearAllEvents() {
    calendarEvents = [];
    saveEvents();
}
