var formdata;

$('.calendar-cell').on('click', function(){
	var el = $(this).data();
	console.log($(this).data());
	createEvent(el);
})

$('.grupa-event').on('click', function(){
        var el = $(this).data();
        console.log($(this).data());
        editEvent(el);
})

$('.grupa-event_close').on('click', function(){
        var el = $(this).data();
        console.log($(this).data());
        deleteEvent(el);
})

function createEvent(el){
	$("#popup-create").addClass("active");
        $(".container").addClass("background-overlay");
	$("#selDay").val(el.day);
	$("#selMonth").val(el.month);
	$("#selYear").val(el.year);

};

function editEvent(el){
        $("#popup-edit").addClass("active");
        $(".container").addClass("background-overlay");
        $("#selDay").val(el.day);
        $("#selMonth").val(el.month);
        $("#selYear").val(el.year);

};

function deleteEvent(el){
        $("#popup-delete").addClass("active");
        $(".container").addClass("background-overlay");
        $("#selDay").val(el.day);
        $("#selMonth").val(el.month);
        $("#selYear").val(el.year);

};

$("#grupa-form").submit(function(e){
        e.preventDefault();
        var form = $(this);
        var action = form.attr("action");
        formdata = form.serializeArray();
        createJSON(formdata);
        // $.ajax({
        //             url: contextroot+action,
        //             dataType: 'json',
        //             type: 'POST',
        //             contentType: 'application/json',
        //             data: JSON.stringify(getFormData(data)),
        //             success: function(data){
        //                 console.log("DATA POSTED SUCCESSFULLY"+data);
        //             },
        //             error: function( jqXhr, textStatus, errorThrown ){
        //                 console.log( errorThrown );
        //             }
        // });
        closePopup();
});


$(".popup-close").on("click", function(){
	closePopup();
});


function closePopup(){
	$(".popup-overlay").removeClass("active");
        $(".container").removeClass("background-overlay");
}