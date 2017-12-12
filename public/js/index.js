$(document).ready(function(){      
	$("#spinWheel").hide(); //CHnage this to .SHOW THIS WHENEVER AN EVENT IS TAKING TOO LONG!!
	$(".parallax").parallax();
	$(".button-collapse").sideNav();

	$("#scrapeModal").on("click", function() {
	    $('#modal1').modal('open'); 
	});

	$("#editNoteModal").on("click", function() {
		$.get("/articles/saved", function(error, data) {
			if (error) throw error;
			console.log("we're going to the saved-articles page");
		});	
		//window.location.pathname = "/articles/saved"; //an alterantive
	});
});