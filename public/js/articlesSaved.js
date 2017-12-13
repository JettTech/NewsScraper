$(document).ready(function(event){      
	//event.preventDefault(); // !!! why doesn't THIS WORK???

	$("#spinWheel").hide(); //CHnage this to .SHOW THIS WHENEVER AN EVENT IS TAKING TOO LONG!!
	$(".parallax").parallax();
	$(".button-collapse").sideNav();

	$("#editNoteModal").on("click", function() {
		$('#editNoteModal').modal('open'); 

		article_id = this.parent._id //can we do this to find AND represent the parent (in this case, the Article's) id????!?!??!

		$.get("/api/notes/:articles:" + article_id + "?", function(error, data) {
			if (error) throw error;
			else{ //else we should be retrieveing the NOTES on the specified article
				editSaveArticle(article_id);

		    	console.log("we're just retrieved an article and it's notes: ");
		    	console.log(data);
			}
		});	
	});
	
});
