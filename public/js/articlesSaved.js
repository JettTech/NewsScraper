/* global bootbox */
$(document).ready(function() {
  // Getting a reference to the article container div we will be rendering all articles inside of
  var articleContainer = $(".article-container");
  // Adding event listeners for dynamically generated buttons for deleting articles,
  // pulling up article notes, saving article notes, and deleting article notes
  $(document).on("click", ".btn.delete", handleArticleDelete);
  $(document).on("click", ".btn.notes", handleArticleNotes);
  $(document).on("click", ".btn.save", handleNoteSave);
  $(document).on("click", ".btn.note-delete", handleNoteDelete);

  // initPage kicks everything off when the page is loaded
  initPage();

  function initPage() {
    // Empty the article container, run an AJAX request for any saved articles
    articleContainer.empty();
    $.get("/api/articles?saved=true").then(function(data) {
      // If we have articles, render them to the page
      if (data && data.length) {
        renderArticles(data);
      }
      else {
        // Otherwise render a message explaing we have no articles
        renderEmpty();
      }
    });
  }

  function renderArticles(articles) {
    // This function handles appending HTML containing our article data to the page
    // We are passed an array of JSON containing all available articles in our database
    var articlePanels = [];
    // We pass each article JSON object to the createPanel function which returns a bootstrap
    // panel with our article data inside
    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    // Once we have all of the HTML for the articles stored in our articlePanels array,
    // append them to the articlePanels container
    articleContainer.append(articlePanels);
  }

  function createPanel(article) {
    // This functiont takes in a single JSON object for an article/headline
    // It constructs a jQuery element containing all of the formatted HTML for the
    // article panel
    var panel = $(
      [
        "<div class='col-sm-12 col-md-6 col-lg-4 flip-container'>",
        "<div class='card flipper'>",
        "<div class='card-image front waves-effect waves-block waves-light'>",
        "<img id='data-" + article.img + "' src= '" + article.img + "' height='300px' style='z-index:2px;'>",
        "<h4 class='text-center' style='color:white'>",
        "<i class='material-icons' style='font-size:3rem'>",
        "info_outline",
        "</i>",
        "</h4>",
        "</div>",
        "<div class='card-content'>",
        "<div class='panel-heading text-center back'>",
        "<h4>",
        "<a class='article-link' target='_blank' href='" + article.link + "'>",
        article.title,
        "</a>",
        "</h4>",
        "<br/>",
        "<a  target='_blank' href='" + article.link + "' class='btn btn-large btn-success link'>",
        "Visit Article",
        "</a>",
        "<a class='btn btn-danger delete' id='"+ article._id +"'>",
        "Delete From Saved",
        "</a>",
        "<a class='btn btn-info notes' id='N"+ article._id +"'>Article Notes</a>",
        "</div>",
        "</div>",
        "</div>"
      ].join("")
    );
	 // panel.data("_id", article._id);
    return panel;
  }

  function renderEmpty() {
    // This function renders some HTML to the page explaining we don't have any articles to view
    // Using a joined array of HTML string data because it's easier to read/change than a concatenated string
    var emptyAlert = $(
      [
        "<div class='alert alert-warning text-center'>",
        "<h4>You currently don't have any saved articles! Be sure to click the 'Save Article' button whenever you fancy an article.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>Would You Like to Browse Available Articles?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a href='/'>Browse Articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    // Appending this data to the page
    articleContainer.append(emptyAlert);
  }

  function renderNotesList(data) {
    // This function handles rendering note list items to our notes bootBox
    // Setting up an array of notes to render after finished
    // Also setting up a currentNote variable to temporarily store each note
    var notesToRender = [];
    var currentNote;
    if (!data.noteText.length) {
      // If we have no notes, just display a message explaing this
      currentNote = ["<li class='list-group-item'>", "No notes for this article yet.", "</li>"].join("");
      notesToRender.push(currentNote);
    }
    else {
      // If we do have notes, go through each one
      for (var i = 0; i < data.length; i++) {
        // Constructs an li element to contain our noteText and a delete button
        currentNote = $(
          [
            "<li class='list-group-item note'>",
            data[i].noteText,
            "<button class='btn btn-danger note-delete'>x</button>",
            "</li>"
          ].join("")
        );
        // Store the note id on the delete button for easy access when trying to delete
        currentNote.children("button").data("_id", data[i]._id);
        // Adding our currentNote to the notesToRender array
        notesToRender.push(currentNote);
      }
    }
    // Now append the notesToRender to the note-container inside the note bootBox
    $(".note-container").append(notesToRender);
  }

  function handleArticleDelete() {
  	var articleToDeleteID = $(this).attr("id");
    // Using a delete method here just to be semantic since we are deleting an article/headline
    $.ajax({
      method: "DELETE",
      url: "/api/articles/" + articleToDeleteID
    }).then(function(data) {
      // If this works out, run initPage again which will rerender our list of saved articles
      if (data.ok) {
        console.log("articleToDeleteID info: ");
        console.log(articleToDeleteID);
        console.log("data : ");
        console.log(data);
      }
      initPage();
    });
  }

  function handleArticleNotes() {
    // This function handles opending the notes bootBox and displaying our notes
    // We grab the id of the article to get notes for from the panel element the delete button sits inside
    var currentArticleNNum = $(this).attr("id");
    var currentArticle = currentArticleNNum.slice(1);
    var articleTitle;
    // var noteNum = 0;
    // noteNum++;

     // Grab the article title
    $.get("/api/articles/" + currentArticle)
      .then(function(data) {
      	articleTitle = data.title;
 	});

    // Grab any notes with this headline/article id
    $.get("/api/notes/" + currentArticle)
      .then(function(data) {
      	console.log("currentArticle - for notes - info: ");
        console.log(currentArticle);
        console.log("Note Data : ");
        console.log(data);

      // Constructing our initial HTML to add to the notes bootBox
      var bootBoxText = [
        "<div class='container-fluid text-center'>",
        "<h4>",
        "<strong>Article Notes</strong> ",
        "</h4>",
        "<h5>",
        articleTitle,
        "</h5>",
        "<hr />",
        "<ul class='list-group note-container'>",
        "</ul>",
        "<textarea id='textMessage' placeholder='New Note' rows='4' cols='60'></textarea>",
        "<button class='btn btn-success save'>Save Note</button>",
        "</div>"
      ].join("");
      // Adding the formatted HTML to the note bootBox
      bootbox.dialog({
        message: bootBoxText,
        closeButton: true
      });

      var noteData = {
        _article_Id: currentArticle,
        noteText: data || []
      };
      // Adding some information about the article and article notes to the save button for easy access
      // When trying to add a new note
      $(".btn.save").data("article", noteData);
      // renderNotesList will populate the actual note HTML inside of the bootBox we just created/opened
      console.log("noteData ");
      console.log(noteData);
      renderNotesList(noteData);
    });
  }

  function handleNoteSave() {
    // This function handles what happens when a user tries to save a new note for an article
    // Setting a variable to hold some formatted data about our note,
    // grabbing the note typed into the input box
    var noteData;
    var newNote = $("#textMessage").val().trim();
    // If we actually have data typed into the note input field, format it
    // and post it to the "/api/notes" route and send the formatted noteData as well
    if (newNote) {
      noteData = {
        _article_Id: $(this).data("article")._article_Id,
        noteText: newNote
      };
      $.post("/api/notes", noteData).then(function() {
          console.log("noteData (id + noteText) =");
	      console.log(noteData);
	      renderNotesList(noteData)

        // When complete, close the bootBox/refresh
        var textmessageArea = $("#textMessage");
        textmessageArea = "";
        bootbox.hideAll();
        //initPage();
      });
    }
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
      // When done, hide the bootBox
      bootbox.hideAll();
    });
  }
});
