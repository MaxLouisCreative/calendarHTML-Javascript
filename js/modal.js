//var formdata;

$('.calendar-cell').on('click', function(){
	var el = $(this).data();
	//console.log($(this).data());
	openPopup(el);
})

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
        createJSON(formdata);
        
        closePopup();
});

$(".popup-close").on("click", function(){
	closePopup();
});


function closePopup(){
	$(".popup-overlay").removeClass("active");
}

