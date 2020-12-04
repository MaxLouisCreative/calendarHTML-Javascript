
let jsonObj = LoadJSONLocal();
function createJSON(formdata) {

    item = {}
    // item["Event"] = document.getElementById("Event").value;
    // item["Day"] = document.getElementById("Day").value;
    // item["Hour"] = document.getElementById("Hour").value;
    // item["Minute"] = document.getElementById("Minute").value;
    item["Event"] = formdata[0];
    item["Time"] = formdata[1];
    item["Day"] = formdata[2];
    item["Month"] = formdata[3];
    item["Year"] = formdata[4];
    

    jsonObj.push(item);
    console.log(jsonObj);
}

function ReadJSON(event) {
    let position = SearchJSON(event);
    return jsonObj[position];
}

function deleteJSON(event) {
    event = document.getElementById("Event").value;
    let position = SearchJSON(event);
    if(position==null){
        return;
    }
    jsonObj.splice(position, 1);
    console.log(jsonObj);
    saveJSONLocal();
}

function replace(event, day, hour, minute) {
    event = document.getElementById("Event").value;
    deleteJSON(event)
    createJSON();
    saveJSONLocal();
}

function SearchJSON(event) {
    console.log(jsonObj);
    if (jsonObj == []) {
        return null;
    }
    for (var i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i]["Event"] == event) {
            return results = i;
        }
    }
}
function saveJSONLocal(){
    localStorage.setItem("calendar",JSON.stringify(jsonObj) );
}

function LoadJSONLocal(){
    return localStorage.getItem("calendar")==null? [] :JSON.parse(localStorage.getItem("calendar"));
}