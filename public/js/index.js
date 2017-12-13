$(document).ready(function(event){      
	event.preventDefault();

	// $("#spinWheel").hide(); //CHnage this to .SHOW THIS WHENEVER AN EVENT IS TAKING TOO LONG!!
	// $(".parallax").parallax();
	// $(".button-collapse").sideNav();

	$("#editNoteModal").on("click", function() {
		note_id = this._id //this should reprsent the note that is being pressed...
		article_id = this.parent._id //can we do this to find AND represent the parent (in this case, the Article's) id????!?!??!
		
		$.get("/api/articles/:id" + note_id, function(error, data) {
			if (error) throw error;
			console.log("we're going to the article-edit page");
		});	
		//window.location.pathname = "/articles/saved"; //an alternative
	});

});