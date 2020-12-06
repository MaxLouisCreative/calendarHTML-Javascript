var darkModeStatus = false;

$(".dark-mode-button").on("click", function(e){
    darkMode();
});

function darkMode(){
	if(!darkModeStatus){
		darkModeStatus = true;
		$("body").addClass("dark-mode");
	}
	else if(darkModeStatus){
		darkModeStatus = false;
		$("body").removeClass("dark-mode");
	}
}
