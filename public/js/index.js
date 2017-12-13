$(document).ready(function(event){      
	//event.preventDefault(); // !!! why doesn't THIS WORK???

	// $("#spinWheel").hide(); //CHnage this to .SHOW THIS WHENEVER AN EVENT IS TAKING TOO LONG!!
	// $(".parallax").parallax();
	// $(".button-collapse").sideNav();

	$(".editNote").on("click", function() {	
		article_id = this.parent._id //can we do this to find AND represent the parent (in this case, the Article's) id????!?!??!
		editSaveArticle(article_id);

		$.get("/api/notes/:articles:" + article_id + "?", function(error, data) {
			//window.location.pathname = "/api/articles/saved"; >>> this would GO LAST, if used...//an alternative (forced version)		    		      
			if (error) throw error;
			else{ //else we should be retrieveing the NOTES on the specified article
		    	console.log("we're now about to display the 'saved' article, that's ready for updates, on the api/saved/article page.... ");
		    	console.log(data);
		    // !! MAKE SURE that this get all finishes AFTER the Patch call, and thereby sends the article trhough the get call as a saved article, and follows tot he next page for editing
			}
		});	
	});

	function editSaveArticle(article_id) {
		var saveThisArticle = article_id.parent() //this needs to be TRAVERSED TO the ARTICLE itself, NOT just the id... 
		saveThisArticle.saved = true;

		$.ajax({
	      method: "PATCH", //this "patches" or updates the new db with the new updates /changes (ONLY.)
	      url: "/api/articles",
	      data: articleToSave
	    })
	    .then(function(data) {
	      // If successful, mongoose will send back an object containing a key of "ok" with the value of 1
	      // (which casts to 'true')
	      if (data.ok) {
	        console.log("The database SHOULD NOW REFLECT this article as 'saved'.. ."); 	
	     	console.log(data);
	     }
	    });
	}

});

