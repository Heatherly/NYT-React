 //Use Grandchild component 'Results' to map over and format each result from the API
// Include React
var React = require("react");

// Here we include all of the sub-components
var Query = require("./grandchildren/Query");
var Results = require("./grandchildren/Results");

// Helper for making AJAX requests to our API
var helpers = require("../utils/helpers");

// Creating the Main component
class Search extends React.Component {

	constructor(props) {
    super(props);

    this.state = {
      term: "",
      startYear: "",
      endYear: "",
      apiResults:[]
    };

    this.setQuery = this.setQuery.bind(this);
  }

componentDidUpdate(prevProps, prevState) {

 // If we have a new search term, run a new search
    if (prevState.term !== this.state.term) {
      // console.log("UPDATED");
	helpers.runQuery(this.state.term, this.state.startYear, this.state.endYear).then(function(data) {
        // console.log(data);
        this.setState({ apiResults: data });

        }.bind(this));
    };
  }

// This function allows the child Query to update the parent Search.js
setQuery(term, startYear, endYear) {
    this.setState({ term: term, startYear: startYear, endYear: endYear });
  }

render() {
    return (
         <div>
           <div className="row text-center">
             <h1>New York Times Scrapper</h1>
              <p>Enter your search term and date range below.</p>
             </div>
	       
	       <div className="row">
  		     <div className="col-md-12">
            
             <Query setQuery={this.setQuery}/>

           </div>
         </div>
         <div className="row">
          <div className="col-md-12">

          <Results term={this.state.term} apiResults={this.state.apiResults} refreshMongoResults={this.props.refreshMongoResults} />

          </div>
        </div>
      </div>
	);
  }
};

// Export the component back for use in other files
module.exports = Search;
