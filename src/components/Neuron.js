import React from 'react';

import { lerpColors } from '../utils';

export default function Neuron(props) {
  const {
    neuron,
    layout: {
      units: { neuronRadius, neuronFontSize, strokeWidth },
      neuronsPositions,
    },
    textColor,
    activeColor,
    inactiveColor,
  } = props;
  const color = lerpColors(inactiveColor, activeColor, neuron.activation);
  const position = neuronsPositions[neuron.ID];

  return (
    <g className="Neuron">
      <circle
        cx={position.x}
        cy={position.y}
        r={neuronRadius}
        fill={`rgb(${color.join(',')})`}
        stroke="black"
        strokeWidth={strokeWidth}
      />
      <text
        x={position.x}
        y={position.y}
        fill={textColor}
        strokeWidth="2"
        fontSize={neuronFontSize}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {neuron.activation.toFixed(2)}
      </text>
    </g>
  );
}
