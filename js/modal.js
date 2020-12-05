//var formdata;

var timeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;

$('.calendar-cell').on('click', function(){
	var el = $(this).data();
	//console.log($(this).data());
	openPopup(el);
});

function openPopup(el){
	// $(".popup-overlay").addClass("active");
	$("#addEvent").addClass("active");
	$("#selDay").val(el.day);
	$("#selMonth").val(el.month);
	$("#selYear").val(el.year);
	$("#evID").val(el.id);

};

$("#grupa-form").submit(function(e){
        e.preventDefault();
        var form = $(this);
        var action = form.attr("action");
        var formdata = form.serializeArray();
        //console.log(formdata);
        createJSON(formdata);       
        closePopup();
        calenderCell();
});

$("#grupa-form-delete").submit(function(e){
        e.preventDefault();
        var form = $(this);
        var formdata = form.serializeArray();
        //console.log(formdata[0].value);
        deleteJSON(formdata[0].value);       
        closePopup();
        calenderCell();
});

$("#grupa-form-edit").submit(function(e){
        e.preventDefault();
        var form = $(this);
        var formdata = form.serializeArray();
        console.log(formdata);
        replace(formdata);       
        closePopup();
        calenderCell();
});

$(".popup-close").on("click", function(){
	closePopup();
});


function openEdit(el,el2){
        $("#editEvent").addClass("active");
        $("#name-1").val(el2.title);
        $("#time-1").val(el2.time);
        $("#selDay-1").val(el.day);
        $("#selMonth-1").val(el.month);
        $("#selYear-1").val(el.year);
        $("#evID-1").val(el.id);
        $("#evID-2").val(el.id);
        $(".title").append(el2.title);
        $(".start").append(el2.time);
        $(".timezone").append(timeZone);
};

function closePopup(){
	$(".popup-overlay").removeClass("active");
}

