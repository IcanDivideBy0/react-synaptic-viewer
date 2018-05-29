import React from 'react';

export default function Connection(props) {
  const {
    connection,
    layout: {
      units: { strokeWidth, connectionFontSize },
      neuronsPositions,
    },
    strokeColor,
    textColor,
  } = props;

  const pathId = `NetworkViewer-Connection-${connection.ID}`;

  const [from, to] = [
    neuronsPositions[connection.from.ID],
    neuronsPositions[connection.to.ID],
  ];

  const controlPointX = (from.x + to.x) / 2;

  return (
    <g className="Connection">
      <path
        id={pathId}
        d={`
          M ${from.x}, ${from.y}

          C ${controlPointX} ${from.y},
            ${controlPointX} ${to.y},
            ${to.x} ${to.y}
        `}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />

      <text fill={textColor} fontSize={connectionFontSize} textAnchor="middle">
        <textPath
          href={'#' + pathId}
          startOffset="50%"
          alignmentBaseline="before-edge"
        >
          {connection.weight.toFixed(2)}
        </textPath>
      </text>
    </g>
  );
}
