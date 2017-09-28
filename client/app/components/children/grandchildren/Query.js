//SEARCH FORM COMPONENT

// Include React
var React = require("react");

// Creating the Form component
class Query extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
      startYear: "",
      endYear: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { //looks for any changes on multiple form fields
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Passing Query to Search parent");
    console.log(this.state.term, this.state.startYear, this.state.endYear);
    this.props.setQuery(this.state.term, this.state.startYear, this.state.endYear);
    //gives the properties up to Search to perform API Search
    this.setState({ term: "", startYear: "", endYear: "" });
  }
  // Here we describe this component's render method
 render() {
    return (
      <div id="query">
        <form id="queryForm" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="term" className="col-form-label">Search Term</label>
            <input type="text" className="form-control" id="term" value={this.state.term} onChange={this.handleChange} required />
          
          <div className="form-row">
            <div className="col-sm-5">
              <label htmlFor="startYear" className="col-form-label">Start Year</label>
              <input type="number" className="form-control" id="startYear" value={this.state.startYear} onChange={this.handleChange} required />
            </div>
            <div className="col-sm-2"></div>
            <div className="col-sm-5">
              <label htmlFor="endYear" className="col-form-label">End Year</label>
              <input type="number" className="form-control" id="endYear" value={this.state.endYear} onChange={this.handleChange} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" value="search">Search</button>
         </div>
        </form>
      </div>
    );
  }
}

// Export the component back for use in other files
module.exports = Query;
