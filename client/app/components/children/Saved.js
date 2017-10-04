// Include React
var React = require("react");


// Requiring our helper for making API calls
var helpers = require("../utils/helpers.js");

// This is the Articles component. It will be used to show a log of  recent searches.
class Saved extends React.Component {

  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
}

  handleDelete(event) {

    // Collect the clicked article's id
    var articleMongoId = event.target.value;

    // Copy "this" into "that" so that component is accessible inside the functions.
    // var that = this;

    // Send this data to the API endpoint to save it to Mongo
    helpers.apiDelete(articleMongoId).then(() => {

      //Refresh this component to account for deletion
      helpers.apiGet().then((query) => {
        this.props.refreshMongoResults(query.data);
      });

    });
  }
  
  render() {
    // console.log(this.props.mongoResults);
    return (
      <div className="panel panel-default">

        <div className="panel-heading">
          <h2 className="panel-title text-center">Saved Articles</h2>
        </div>

        <div className="panel-body">
          <ul className="list-group col-md-12">

            {/* Iterate over mongoResults array from parent (Main.js)*/} 
            {this.props.mongoResults.map((search, i) => {
              return (
                <li key={search._id} className="list-group-item">
                  <p className="pub-date">
                  <a href={search.url} target="_new" className="headline">{search.title}</a>
                      {search.date.substring(0, 10)}</p>

                      <button className="btn btn-success" type="button" onClick={this.handleDelete} value={search._id}>Remove</button>
                </li>
              );
            })}

          </ul>
        </div>
      </div>      
    );
  }
};
// Export the model back for use in other files
module.exports = Saved;
