var darkModeStatus = false;

$(".dark-mode-button").on("click", function(e){
    darkMode();
});

function darkMode(){
	if(!darkModeStatus){
		darkModeStatus = true;
		$("body").addClass("dark-mode");
		$(".dark-mode-button").text("Light Mode");
	}
	else if(darkModeStatus){
		darkModeStatus = false;
		$("body").removeClass("dark-mode");
		$(".dark-mode-button").text("Dark Mode");
	}
}
