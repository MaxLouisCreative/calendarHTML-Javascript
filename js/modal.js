
function openPopup(date){};

$(".grupa-today").on("click", function(){
$(".popup, .popup-content").addClass("active");
console.log(this);
});

$(".close, .popup").on("click", function(){
$(".popup, .popup-content").removeClass("active");
});