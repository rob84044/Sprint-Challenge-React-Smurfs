import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      getErrorMessage: '',
      smurf: {
        name: '',
        age: '',
        height: ''
      }
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => this.setState({ smurfs: response.data }))
      .catch(err => {
        console.log(err);
        this.setState({ getErrorMessage: 'Could not retrieve any smurfs' });
      });
  }

  updateSmurfList = (e, smurf) => {
    axios
      .put(`http://localhost:3333/smurfs/${smurf.id}`, smurf)
      .then(res => {
        this.setState({ smurfs: res.data });

        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <SmurfForm post={this.updateSmurfList} />
        <Smurfs smurfs={this.state.smurfs} />
      </div>
    );
  }
}

export default App;
