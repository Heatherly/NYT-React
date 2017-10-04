// Include React
var React = require("react");

// Here we include all of the sub-components
var Search = require("./children/Search");
var Saved = require("./children/Saved");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
class Main extends React.Component {
    constructor() {
    super();

    this.state = {
      mongoResults: []
    };

this.refreshMongoResults = this.refreshMongoResults.bind(this);
}

 // After the Main renders, collect the saved articles from the API endpoint
  componentDidMount() {

    // Hit the Mongo API to get saved articles
    helpers.apiGet().then(function(query){
      this.setState({ mongoResults: query.data });
    }.bind(this));

  }

  refreshMongoResults(newData){
    this.setState({ mongoResults: newData} );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          
          <div className="col-md-12">

            <Search mongoResults={this.state.mongoResults} refreshMongoResults={this.refreshMongoResults} />

          </div>
        </div>
        <div className="row">
          <div className="col-md-12">

        <Saved mongoResults={this.state.mongoResults} refreshMongoResults={this.refreshMongoResults} />

        </div>

      </div>
    </div>
    );
  }
};

// Export the component back for use in other files
module.exports = Main;
