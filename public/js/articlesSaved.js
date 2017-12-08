$(document).ready(function(){      
	$("#spinWheel").hide(); //CHnage this to .SHOW THIS WHENEVER AN EVENT IS TAKING TOO LONG!!
	$(".parallax").parallax();
	$(".button-collapse").sideNav();

	$("#scrapeModal").on("click", function() {
	    $('#scrapeModal').modal('open'); 
	});

	$("#editNoteModal").on("click", function() {
		    $('#editNoteModal').modal('open'); 
	});
	
});
