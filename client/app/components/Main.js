// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var Articles = require("./children/Articles");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return {searchTerm: "", startYear: "", endYear: "", apiResults: [] };
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function(prevProps, prevState) {

     // If we have a new search term, run a new search
    if (prevState.term !== this.state.term) {
      console.log("UPDATED");
      // console.log(this.state.term);
      // console.log(this.state.startYear);


    // Run the query for the article search
    helpers.runQuery(this.state.term, this.state.startYear, this.state.endYear).then(function(data) {
        console.log(data);
        this.setState({ apiResults: data });

        }.bind(this));
    }
  },
  // This function allows childrens to update the parent.
  setQuery: function(term, startYear, endYear) {
    this.setState({ term: term, startYear: startYear, endYear: endYear });
  },
  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">New York Times Scrapper!</h2>
            <p className="text-center">
              <em>Enter your search term and date range below.</em>
            </p>
          </div>

          <div className="col-md-12">

            <Form setQuery={this.setQuery}/>

          </div>
        </div>
        <div className="row">
          <div className="col-md-12">

           <Results term={this.state.term} apiResults={this.state.apiResults} />

          </div>
        </div>

        

        <div className="row">

         {/* <Articles history={this.state.history} /> */}

        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
