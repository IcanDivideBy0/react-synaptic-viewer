import React, { Component } from 'react';
import { Architect, Trainer } from 'synaptic';
import { NetworkViewer } from 'react-synaptic-viewer';

import './App.css';

const network = new Architect.Perceptron(2, 3, 1);
const trainer = new Trainer(network);
trainer.XOR();

class App extends Component {
  constructor(...args) {
    super(...args);

    const inputs = Array.from({ length: network.inputs() }, () => 0);

    network.activate(inputs);
    this.state = { inputs };
  }

  handleChange = (value, idx) => {
    const {
      inputs: [...inputs],
    } = this.state;
    inputs[idx] = value;

    network.activate(inputs);
    this.setState({ inputs });
  };

  render() {
    const { inputs } = this.state;

    return (
      <div className="App">
        <h1>XOR neural network visualizer</h1>
        <a href="https://github.com/IcanDivideBy0/react-synaptic-viewer">
          GitHub
        </a>

        <div className="App-main">
          <div className="App-inputs">
            {inputs.map((value, idx) => (
              <input
                key={idx}
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={value}
                onChange={evt => this.handleChange(evt.target.value, idx)}
              />
            ))}
          </div>

          <NetworkViewer network={network} className="App-network" />
        </div>
      </div>
    );
  }
}

export default App;
