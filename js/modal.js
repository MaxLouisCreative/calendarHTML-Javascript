var formdata;

$('.calendar-cell').on('click', function(){
	var el = $(this).data();
	console.log($(this).data());
	openPopup(el);
})

function openPopup(el){
	$(".popup-overlay").addClass("active");
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
}