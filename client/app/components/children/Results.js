// Include React
var React = require("react");

// Creating the Results component to display to results of our API search
var Results = React.createClass({
// Here we set a generic state
  getInitialState: function() {
    return {
      arrayOfArticles: []
    };
  },

handleSave: function(event){

    // Collect the clicked article's id
    var articleId = event.target.value;

    // Collect the clicked article's attributes
    var saveArticleObj;
    for(var i=0; i<this.state.arrayOfArticles.length; i++){
      if(this.state.arrayOfArticles[i].id == articleId){
        saveArticleObj = this.state.arrayOfArticles[i];
      }
    }
},

  // Here we render the function
  render: function() {
        // http://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
    var that = this;
    return (

      <div className="panel panel-default">

        <div className="panel-heading">
          <h3 className="panel-title text-center" style={ {fontSize: "20px"} }><i><b>Results</b></i></h3>
        </div>

        <div className="panel-body">
          <ul className="list-group col-md-8 col-md-offset-2">

            {/* Iterate over apiResults array from parent (Main.js) while pushing the results "down" to this child and into it's articles array*/}
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
                  <div className="input-group">
                    <div type="text" className="form-control">
                      <b><a href={article.web_url} target="_new" style={ {color: "black"} }>{article.headline.main}</a></b>
                      <i> {article.pub_date.substring(0, 10) /*shorten string to just the part we need leaving out the time*/}</i>
                    </div>       
                    <span className="input-group-btn">
                      <button className="btn btn-success" type="button" onClick={that._handleSave} value={article._id}>Save</button>
                    </span>
                  </div>
                </li>
              );
            })}

          </ul>
        </div>
      </div>

    );
  
  }
});

// Export the component back for use in other files
module.exports = Results;
