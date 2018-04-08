$(document).ready(function() {
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

   var articleContainer = $("#article-container");
   $(document).on("click", ".btn.delete", handleArticleDelete);
   $(document).on("click", ".btn.notes", handleArticleNotes);
   $(document).on("click", ".btn.save", handleNoteSave);
   $(document).on("click", ".btn.note-delete", handleNoteDelete);

   // initApp STARTS everything when page is loaded
   initApp();


// ==================================================
// Intialize App Logic
// ==================================================
  function initApp() {
    // Empty the article container, and run an AJAX request for all articles (saved and unsaved)
    articleContainer.empty();
    $.get("/api/articles").then(function(data) {
      // If we have headlines, render them to the page
      if (data && data.length) {
        console.log("This is the data object, which should refect the articles scrapped"); 	
     	console.log(data);
        // renderArticles(data); //the articles should show via the handlebars object passed into the index views express router function.
      }
      else {
        // Otherwise notify user that no articles are avail, and offer to preferm scrape
        renderEmptyMessage();
      }
    });
  }

 ///////////////////////
  // function renderArticles(articles) {
  //   // This function appends the article data to the Handlebars page
  //   //The "articles" parameter passed into this function is an array of JSON containing all available articles in the database
  //   var articlePanels = [];
  //   for (var i = 0; i < articles.length; i++) {
  //     articlePanels.push(createPanel(articles[i]));
  //   }
  //   // Once we have all of the HTML for the articles stored in our articlePanels array,
  //   // append them to the articlePanels container
  //   articleContainer.append(articlePanels);
  // }

  // function createPanel(article) {
  //   // This functiont takes in a single JSON object for an article/headline
  //   // It constructs a jQuery element containing all of the formatted HTML for the
  //   // article panel
  //   var panel = $(
  //     [
  //       "<div class='panel panel-default'>",
  //       "<div class='panel-heading'>",
  //       "<h3>",
  //       "<a class='article-link' target='_blank' href='" + article.url + "'>",
  //       article.headline,
  //       "</a>",
  //       "<a class='btn btn-success save'>",
  //       "Save Article",
  //       "</a>",
  //       "</h3>",
  //       "</div>",
  //       "<div class='panel-body'>",
  //       article.summary,
  //       "</div>",
  //       "</div>"
  //     ].join("")
  //   );
  //   // We attach the article's id to the jQuery element
  //   // We will use this when trying to figure out which article the user wants to save
  //   panel.data("_id", article._id);
  //   // We return the constructed panel jQuery element
  //   return panel;
  // }

 ///////////////////////
  function renderEmptyMessage() {
    // Creates user message re: lack of articles
    // (Using a joined array of HTML string data rather than a concatenated string for improved data readability/manipulation...)
    var emptyAlert = $(
      [
        "<div class='alert alert-warning text-center'>",
        "<h4>Well, this is Looks like we don't have any new articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>What Would You Like To Do?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
        "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    // Append message to the page
    articleContainer.append(emptyAlert);
  }

// ==================================================
// Edit Article Logic
// ==================================================	
	function handleArticleEdit() {
		var article_id = this.parent()._id
		var editNotes = $("#newArticleNote").value().trim();
		saveEditedArticle(article_id);

		$.get("/api/notes" + article_id + "?saved=true/"+ editNotes, function(error, data) {	    		      
			if (error) throw error;
			else{ //else we should be retrieving the NOTES on the specified article
		    	console.log("we're now about to display the 'saved' article, that's ready for updates, on the api/saved/article page.... ");
		    	console.log(data);
			}
		});
	}

	function saveEditedArticle(article_id) {
		var editedArticle = article_id 
		editedArticle.saved = true;
		$.ajax({
	      method: "PATCH", //this "patches" or updates the new db with the new updates /changes (ONLY.)
	      url: "/api/articles",
	      data: saveThisArticle
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

// ==================================================
// Render Article NOTE Logic
// ==================================================
  function renderNotesList(data) {
    // This function handles rendering note list items to our notes modal
    // Setting up an array of notes to render after finished
    // Also setting up a currentNote variable to temporarily store each note
    var notesToRender = [];
    var currentNote;
    if (!data.notes.length) {
      // If we have no notes, just display a message explaing this
      currentNote = ["<li class='list-group-item'>", "No notes for this article yet.", "</li>"].join("");
      notesToRender.push(currentNote);
    }
    else {
      // If we do have notes, go through each one
      for (var i = 0; i < data.notes.length; i++) {
        // Constructs an li element to contain our noteText and a delete button
        currentNote = $(
          [
            "<li class='list-group-item note'>",
            data.notes[i].noteText,
            "<button class='btn btn-danger note-delete'>x</button>",
            "</li>"
          ].join("")
        );
        // Store the note id on the delete button for easy access when trying to delete
        currentNote.children("button").data("_id", data.notes[i]._id);
        // Adding our currentNote to the notesToRender array
        notesToRender.push(currentNote);
      }
    }
    // Now append the notesToRender to the note-container inside the note modal
    $(".note-container").append(notesToRender);
  }


// ==================================================
// Delete Article NOTE Logic
// ==================================================	
  function handleArticleDelete() {
    // This function handles deleting articles/headlines
    // We grab the id of the article to delete from the panel element the delete button sits inside
    var articleToDelete = $(this).parents(".panel").data();
    // Using a delete method here just to be semantic since we are deleting an article/headline
    $.ajax({
      method: "DELETE",
      url: "/api/headlines/" + articleToDelete._id
    }).then(function(data) {
      // If this works out, run initApp again which will rerender our list of saved articles
      if (data.ok) {
        initApp();
      }
    });
  }
    function handleNoteDelete() {
    // This function handles the deletion of notes
    // First we grab the id of the note we want to delete
    // We stored this data on the delete button when we created it
    var noteToDelete = $(this).data("_id");
    // Perform an DELETE request to "/api/notes/" with the id of the note we're deleting as a parameter
    $.ajax({
      url: "/api/notes/" + noteToDelete,
      method: "DELETE"
    }).then(function() {
      // When done, hide the modal
      bootbox.hideAll();
    });
  }

 // ==================================================
 // Save Article Logic
 // ==================================================	
	function handleArticleSave() {
		var articleToSave = $(this).parent()._id
		var newData = articleToSave.saved = true;
		console.log("articleToSave =" + articleToSave);

		$.ajax({
		      method: "PUT",
		      url: "/api/articles/" + articleToSave,
		      data: newData
		}).then(function (data) {
			if (data.saved) {
				// window.location.pathname = "/saved";
				$.get("/saved")
					.then(function(data) {
						console.log("redirecting to the saved page...")
					});
			}
		});	  	
	}

// ==================================================
// Save Article NOTE Logic
// ==================================================	
  function handleArticleNotes() {
    // This function handles opending the notes modal and displaying our notes
    // We grab the id of the article to get notes for from the panel element the delete button sits inside
    var currentArticle = $(this).parents(".panel").data();
    // Grab any notes with this headline/article id
    $.get("/api/notes/" + currentArticle._id).then(function(data) {
      // Constructing our initial HTML to add to the notes modal
      var modalText = [
        "<div class='container-fluid text-center'>",
        "<h4>Notes For Article: ",
        currentArticle._id,
        "</h4>",
        "<hr />",
        "<ul class='list-group note-container'>",
        "</ul>",
        "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
        "<button class='btn btn-success save'>Save Note</button>",
        "</div>"
      ].join("");
      // Adding the formatted HTML to the note modal
      bootbox.dialog({
        message: modalText,
        closeButton: true
      });
      var noteData = {
        _id: currentArticle._id,
        notes: data || []
      };
      // Adding some information about the article and article notes to the save button for easy access
      // When trying to add a new note
      $(".btn.save").data("article", noteData);
      // renderNotesList will populate the actual note HTML inside of the modal we just created/opened
      renderNotesList(noteData);
    });
  }

  function handleNoteSave() {
    // This function handles what happens when a user tries to save a new note for an article
    // Setting a variable to hold some formatted data about our note,
    // grabbing the note typed into the input box
    var noteData;
    var newNote = $(".bootbox-body textarea").val().trim();
    // If we actually have data typed into the note input field, format it
    // and post it to the "/api/notes" route and send the formatted noteData as well
    if (newNote) {
      noteData = {
        _id: $(this).data("article")._id,
        noteText: newNote
      };
      $.post("/api/notes", noteData).then(function() {
        // When complete, close the modal
        bootbox.hideAll();
      });
    }
  }

});

