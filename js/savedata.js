let jsonObj = LoadJSONLocal();

function Edate(title,time,day,month,year,date) {
    this.title=title;
    this.time=time;
    this.day=day;
    this.month=month;
    this.year=year;
    this.date=date;

    this.id=function newid(){
        Idb=0;
        if (jsonObj == []) {
            return null;
        }
        for (var i = 0; i < jsonObj.length; i++) {
            if (jsonObj[i].id > Idb) {
                Idb=jsonObj[i].id;
            }
        }
        console.log({Idb});
        return Idb++;
    }
}

function createJSON(formdata) {
    ndate=new Edate();

    ndate.title = formdata[0].value;
    ndate.time = formdata[1].value;
    ndate.day = formdata[2].value;
    ndate.month = formdata[3].value;
    ndate.year = formdata[4].value;
    ndate.id = formdata[5].value;
    ndate.date = formdata[5].value;

    jsonObj.push(ndate);
    saveJSONLocal(jsonObj);
}

function ReadJSON(eventId) {
    let position = SearchJSON(eventId);
    return jsonObj[position];
}

function deleteJSON(eventId) {
    let position = SearchJSON(eventId);
    if(position==null){
        return;
    }
    jsonObj.splice(position, 1);
    saveJSONLocal();
}

function replace(eventId, data) {
    deleteJSON(eventId);
    createJSON(data);
    saveJSONLocal();
}

function moveEventToDay(eventId, day) {
    const e = ReadJSON(eventId);
    deleteJSON(eventId);
    saveJSONLocal();

    e.day = day;
    e.id = e.year+'-'+e.month+'-'+e.day;
    e.date = e.year+'-'+e.month+'-'+e.day;

    jsonObj.push(e);
    console.log(jsonObj);
    saveJSONLocal(jsonObj);
}

function SearchJSON(eventId) {
    if (jsonObj == []) {
        return null;
    }
    for (var i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].id == eventId) {
            return results = i;
        }
    }
}
function saveJSONLocal() {
    console.log({ events: jsonObj });
    localStorage.setItem("calendar",JSON.stringify(jsonObj) );
}

function LoadJSONLocal() {
    const events = localStorage.getItem("calendar") === null
        ? []
        : JSON.parse(localStorage.getItem("calendar"));
    console.log(events);
    return events;
}
