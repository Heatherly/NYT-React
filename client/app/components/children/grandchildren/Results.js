// CONTROL FORMATING FOR EACH RESULT FROM THE API

// Include React
var React = require("react");

// Creating the Results component to display to results of our API search
class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      arrayOfArticles: []
    };
}

handleSave(event){

    // Collect the clicked article's id
    var articleId = event.target.value;

    // Collect the clicked article's attributes
    var saveArticleObj;
    for(var i=0; i<this.state.arrayOfArticles.length; i++){
      if(this.state.arrayOfArticles[i].id == articleId){
        saveArticleObj = this.state.arrayOfArticles[i];
      }
    }

    // Copy "this" into "that" so that component is accessible inside the functions.
    var that = this;

    // Send this data to the API endpoint to save it to Mongo
    helpers.apiSave(saveArticleObj).then(function(){

      // Re-set the Mongo data to account for a change in database (i.e. added an article)
      // By Querying Mongo Again for new Data, this will re-render the components in saved.jsx
      helpers.apiGet().then(function(query){
        that.props.resetMongoResults(query.data);
      });


    }.bind(this))

}

  // Here we render the function
  render() {
        // http://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
    var that = this;
    return (

      <div className="panel panel-default">

        <div className="panel-heading">
          <h2 className="panel-title text-center">Results</h2>
        </div>

        <div className="panel-body">
          <ul className="list-group col-md-12">

            {/* Iterate over apiResults array from parent (Search.js) while pushing the results "down" to this child and into it's articles array*/}
            {this.props.apiResults.map(function(article, i) {
              // Build array of articles
              that.state.arrayOfArticles.push({
                id: article._id,
                title: article.headline.main,
                date: article.pub_date,
                url: article.web_url
              });
              return (
                <li key={article._id} className="list-group-item">
                  <p className="pub-date">
                  <a href={article.web_url} target="_new" className="headline">{article.headline.main}</a>
                      {article.pub_date.substring(0, 10)}</p>

                      <button className="btn btn-success" type="button" onClick={that._handleSave} value={article._id}>Save</button>
                </li>
              );
            })}

          </ul>
        </div>
      </div>

    );
  
  }
};

// Export the component back for use in other files
module.exports = Results;