//This Script is specifically created to generate a date for scrapped data that does not have a date (this will set the date to the current date at the time of the scrape).
var generateDate = function() {
	var date = new Date();
	var dateStructured = "";
	dateStructured += (date.getMonth() + 1) + "_"; //"getMonth" method will return integer number, between 0 and 11, 
	 //representing the month according to local time, where 0 corresponds to January, 1 to February, and so on.
	dateStructured += date.getDate() + "_";
	dateStructured += date.getFullYear() + "_";

	console.log("This is the dateStructured variable in the date.js file: " + dateStructured);
	return dateStructured;
};
module.exports = generateDate;