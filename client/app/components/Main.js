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
}


 // After the Main renders, collect the saved articles from the API endpoint
  componentDidMount() {

    // Hit the Mongo API to get saved articles
    helpers.apiGet().then(function(query){
      this.setState({ mongoResults: query.data });
    }.bind(this));

  }

  resetMongoResults(newData){
    this.setState({ mongoResults: newData} );
  }

  // Here we render the function
  render() {
    return (
      <div className="container">
        <div className="row">
          
          <div className="col-md-12">

            <Search mongoResults={this.state.mongoResults} resetMongoResults={this.resetMongoResults} />

          </div>
        </div>
        <div className="row">
          <div className="col-md-12">

        <Saved mongoResults={this.state.mongoResults} resetMongoResults={this.resetMongoResults} />

        </div>

      </div>
    </div>
    );
  }
};

// Export the component back for use in other files
module.exports = Main;
