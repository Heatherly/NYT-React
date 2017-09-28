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

// API Post Request Function
  apiSave: function(articleObj){

  // Get API Post URL (this allows it to work in both localhost and heroku)
  var apiURL = window.location.origin + '/api/saved';

  // Create a JavaScript *Promise*
  return new Promise(function (fulfill, reject){

    // Re-format the article Object to match the Mongo Model (ie we need to take off the the id)
    var params = new URLSearchParams();
    params.append("title", articleObj.title);
    params.append("date", articleObj.date);
    params.append("url", articleObj.url);
    axios.post(apiURL, params).then(function(response){

      // Error handling / fullfil promise if successful query
      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }
      
    })

  });
  
},

// API Post Request Function
  apiGet: function(query){

  // Get API Post URL (this allows it to work in both localhost and heroku)
  var apiURL = window.location.origin + '/api';

  // Create a JavaScript *Promise*
  return new Promise(function (fulfill, reject){

    // Re-format the article Object to match the Mongo Model (ie we need to take off the the id)
    axios.get(apiURL).then(function(response) {

      // Error handling / fullfil promise if successful query
      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }

    });
    
  });
  
}
};

// We export the API helper
module.exports = helper;
