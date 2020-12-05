//var formdata;

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
        location.reload();
});

$("#grupa-form-delete").submit(function(e){
        e.preventDefault();
        var form = $(this);
        var formdata = form.serializeArray();
        //console.log(formdata[0].value);
        deleteJSON(formdata[0].value);       
        closePopup();
        location.reload();
});

$("#grupa-form-edit").submit(function(e){
        e.preventDefault();
        var form = $(this);
        var formdata = form.serializeArray();
        console.log(formdata);
        replace(formdata);       
        closePopup();
        location.reload();
});

$(".popup-close").on("click", function(){
	closePopup();
});


function openEdit(el){
	$("#editEvent").addClass("active");
	$("#selDay-1").val(el.day);
	$("#selMonth-1").val(el.month);
	$("#selYear-1").val(el.year);
	$("#evID-1").val(el.id);
	$("#evID-2").val(el.id);

};

function closePopup(){
	$(".popup-overlay").removeClass("active");
}

