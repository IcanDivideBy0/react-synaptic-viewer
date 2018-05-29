import React from 'react';
import PropTypes from 'prop-types';
import { Network } from 'synaptic';

import { computeNetworkLayout } from '../utils';

import Connection from './Connection';
import Neuron from './Neuron';

export default class NetworkViewer extends React.Component {
  static propTypes = {
    network: PropTypes.instanceOf(Network).isRequired,
    viewBox: PropTypes.string,
    strokeColor: PropTypes.string,
    textColor: PropTypes.string,
    activeColor: PropTypes.array,
    inactiveColor: PropTypes.array,
  };

  static defaultProps = {
    viewBox: '0 0 100 100',
    strokeColor: '#000',
    textColor: '#000',
    activeColor: [255, 0, 0],
    inactiveColor: [255, 255, 255],
  };

  constructor(props, ...args) {
    super(props, ...args);

    const { network, viewBox } = props;
    this.state = { layout: computeNetworkLayout(network, viewBox) };
  }

  static getDerivedStateFromProps({ network, viewBox }) {
    if (network.optimized) network.restore();

    return { layout: computeNetworkLayout(network, viewBox) };
  }

  render() {
    const {
      network,
      strokeColor,
      textColor,
      activeColor,
      inactiveColor,
      ...props
    } = this.props;

    const styleProps = {
      strokeColor,
      textColor,
      activeColor,
      inactiveColor,
    };

    const { layout } = this.state;

    const neurons = network.neurons();

    return (
      <svg width="600" height="600" {...props}>
        {neurons.reduce(
          (acc, { neuron }) => [
            ...acc,
            ...Object.values(neuron.connections.inputs).map(connection => (
              <Connection
                key={connection.ID}
                connection={connection}
                layout={layout}
                {...styleProps}
              />
            )),
          ],
          []
        )}

        {neurons.map(({ neuron }) => (
          <Neuron
            key={neuron.ID}
            neuron={neuron}
            layout={layout}
            {...styleProps}
          />
        ))}
      </svg>
    );
  }
}
