import React, { Component } from 'react';
import './App.css';
import Table from "./Containers/Table"

import * as data from "./Assets/table-json.json";

class App extends Component {
  //componentDidMount
  state = {
    tableJSON : data.default
  }
  
  render(){
    return (
     
      <div className="App">
        <header className="App-header">
          <p>
            Json To Table 
          </p>
        </header>
        <section>
          <Table data={ this.state.tableJSON }/>
            
        </section>
      </div>
    );
  }
}

export default App;
