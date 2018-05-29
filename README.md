# React Synaptic Viewer

React component to render a [synaptic](http://caza.la/synaptic) neural network.

[demo](https://icandivideby0.github.io/react-synaptic-viewer/)

## Usage

```sh
npm install react-synaptic-viewer
# or
yarn add react-synaptic-viewer
```

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Architect, Trainer } from 'synaptic';
import { NetworkViewer } from 'react-synaptic-viewer';

const network = new Architect.Perceptron(2, 3, 1);
const trainer = new Trainer(network)
trainer.XOR();

ReactDOM.render(
  <NetworkViewer network={network} />,
  ...
);
```
