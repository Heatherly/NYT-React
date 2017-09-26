// Include React
var React = require("react");

// Creating the Form component
class Form extends React.Component {
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
handleChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("CLICK");
    console.log(this.state.term, this.state.startYear, this.state.endYear);
    this.props.setQuery(this.state.term, this.state.startYear, this.state.endYear);
    this.setState({ term: "", startYear: "", endYear: "" });
  }
  // Here we describe this component's render method
 render() {
    return (
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">

              <h4>
                <strong>Search Articles For:</strong>
              </h4>
              <input
                type="text"
                value={this.state.term}
                className="form-control"
                id="term"
                onChange={this.handleChange}
                required
              />

              <h4 className="">
                <strong>Start Year</strong>
              </h4>

              <input
                type="number"
                value={this.state.startYear}
                className="form-control"
                id="startYear"
                onChange={this.handleChange}
                required
              />

              <h4>
                <strong>End Year</strong>
              </h4>
              <input
                type="number"
                value={this.state.endYear}
                className="form-control"
                id="endYear"
                onChange={this.handleChange}
                required
              />

            </div>
            <input type="submit" value="Search" id="searchBtn" />
          </form>
    );
  }
};

// Export the component back for use in other files
module.exports = Form;
