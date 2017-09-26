// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(term, startYear, endYear) {
    // Search for articles
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + term + "&begin_date=" + startYear + "0101&end_date=" + endYear + "1231&sort=newest" ;

    return axios.get(queryURL).then(function(response) {

      console.log(response.data.response.docs);
      return response.data.response.docs;
    });
  },

  // This function hits our own server to retrieve the record of query results
  getArticles: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  // postArticles: function(title) {
  //   return axios.post("/api", { title: title });
  // }
};

// We export the API helper
module.exports = helper;
