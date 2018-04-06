//===================================================================
//Controller ++ Scraper Functionality Occurs in this File
//===================================================================

//Local Files:
//=================================================
var db = require("../models");
var scrape = require("../scripts/scrape");


// Controller Logic for Fetch >>> Which relays with the scraper
// ==========================================================
module.exports = {
  scrapeHeadlines: function(req, res) {
    // scrapes and returns the updated articles from Austin Business Journal FIRST,
    return scrape()
    // After scraping function complete, the scraped articles are inserted into the db
      .then(function(articles) {
        console.log("finished scraping arts...")
        return db.Article.create(articles);
      })
      //Determine if new articles were insterted into the db, this query won't insert articles with duplicate headlines.
      .then(function(dbArticle) {
        //using 'instertedCount' instead of 'length'
        if (dbArticle.instertedCount === 0) {
          res.json({
            message: "No new articles today. Check back tomorrow!"
          });
          console.log("Finished trying to insert into db..there are no new articles");
          res.status(200).end();
        }
        else {
          // If new articles were scraped, notify the user, send back a count of how many new articles recieved, and redirect to homepage.
           res.json({
             message: "Nicely Done!  You just added " + dbArticle.instertedCount + " new artiles to the Homepage! \n Now go give them a visit. =D"
           });
           console.log("Finished writing new articles into DB");
           res.redirect("/articles");
           //res.status(200).end();
         }
      })
      .catch(function(err) {
        // This query won't insert articles with duplicate headlines, but it will error after inserting the others...
        res.json({
          message: "Scrape complete!!"
        });
      });
  }
};