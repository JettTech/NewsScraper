$(document).ready(function(event){      
	//event.preventDefault(); //why doesn't THIS WORK???

	// $("#spinWheel").hide(); //CHnage this to .SHOW THIS WHENEVER AN EVENT IS TAKING TOO LONG!!
	// $(".parallax").parallax();
	// $(".button-collapse").sideNav();

	$("#editNoteModal").on("click", function() {
		    $('#editNoteModal').modal('open'); 
	});
	
});
