
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

$(".grupa-today").on("click", function(){
$(".popup, .popup-content").addClass("active");
console.log(this);
});

$(".close, .popup").on("click", function(){
$(".popup, .popup-content").removeClass("active");
});