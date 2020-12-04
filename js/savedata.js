

function Edate(title,time,day,month,year,key){
    this.id=id;
    this.title=title;
    this.time=time;
    this.day=day;
    this.month=month;
    this.Year=year;
    this.key=key;
    id=function newid(){
        Idb=0;
        if (jsonObj == []) {
            return null;
        }
        for (var i = 0; i < jsonObj.length; i++) {
            if (jsonObj[i].id > Idb) {
                Idb=jsonObj[i].id;
            }
        }
        return Idb++;
    }

}

let jsonObj = LoadJSONLocal();
function createJSON(formdata) {
    ndate=new Edate();
 
    ndate.title = formdata[0].value;
    ndate.time = formdata[1].value;
    ndate.day = formdata[2].value;
    ndate.month = formdata[3].value;
    ndate.year = formdata[4].value;
    

    jsonObj.push(ndate);
    console.log(jsonObj);
    saveJSONLocal(jsonObj);
}

function ReadJSON(event) {
    let position = SearchJSON(event);
    return jsonObj[position];
}

function deleteJSON(event) {
    
    let position = SearchJSON(event);
    if(position==null){
        return;
    }
    jsonObj.splice(position, 1);
    console.log(jsonObj);
    saveJSONLocal();
}

function replace(event) {
  
    deleteJSON(event);
    createJSON();
    saveJSONLocal();
}

function SearchJSON(event) {
    console.log(jsonObj);
    if (jsonObj == []) {
        return null;
    }
    for (var i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].id == event) {
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