import React, {Component} from 'react';
import '../styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);


    this.state = {
      vehicles: [],
      value: '',
      pilot: ''
    }

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleNameChange(event) {
    this.setState({value: event.target.value});
  }



  handleSubmit(event){
        event.preventDefault();
        this.setState({
          pilot: this.state.value,
          value: ''
        })
    }


  componentDidMount() {
      fetch('https://swapi.co/api/vehicles/')
        .then(r => r.json())
        .then(data => {
          let vehicles = data.results;
          console.log(vehicles);
          this.setState({vehicles: vehicles});
        });
      }



  render() {
    let vehicleArray = this.state.vehicles;
    let vehicles = vehicleArray.map( vehicles => {
      return (
        <div key={vehicles.name} className="col-md-4">
          <div className="card">
            <div className="card-block">
              <h4 className="card-title">Vehicle: {vehicles.name}</h4>
              <h5 className="card-subtitle mb-2 text-muted">Model: {vehicles.model}</h5>
              <div className="card">
                <div className="card-block">
                  <h5 className="card-subtitle mb-2 text-muted">Specs</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Manufacturer: {vehicles.manufacturer}</li>
                    <li className="list-group-item">Class: {vehicles.vehicle_class}</li>
                    <li className="list-group-item">Passengers: {vehicles.passengers}</li>
                    <li className="list-group-item">Crew: {vehicles.crew}</li>
                    <li className="list-group-item">Length: {vehicles.length}</li>
                    <li className="list-group-item">Max Speed: {vehicles.max_atmosphering_speed}</li>
                    <li className="list-group-item">Cargo Capacity: {vehicles.cargo_capacity}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    });

    return (
      <div className="App">
        <main className="row">
          <section className="col-md-10 offset-md-1">
            <div className="jumbotron">
              <h1 className="display-3">Star Wars</h1> <hr className="my-4"/> <p className = "lead" > The Vehicles of Star Wars < /p>
            </div>
            <div className="card form">
              <div className="card-block">
                <h2 className="card-title">What is your name, pilot?</h2>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input className="form-control col-md-4 offset-md-4" id="pilotName" onChange={this.handleNameChange} name="name" type="text" value={this.state.value} placeholder="Enter your name"/>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <h1>{this.state.pilot}</h1>
              </div>
            </div>
            <div className = "row">
              {vehicles}
            </div>
          </section>
        </main>
      </div>
    )
  }
}

export default App;
