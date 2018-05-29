export const lerp = (a, b, alpha) => a * (1 - alpha) + b * alpha;

export const lerpColors = (c1, c2, alpha) => [
  lerp(c1[0], c2[0], alpha).toFixed(0),
  lerp(c1[1], c2[1], alpha).toFixed(0),
  lerp(c1[2], c2[2], alpha).toFixed(0),
];

export function computeNetworkLayout(network, viewBox) {
  const [minX, minY, width, height] = viewBox
    .split(' ')
    .map(v => parseInt(v, 10));
  const maxX = minX + width;
  const maxY = minY + height;

  const lerpX = x => lerp(minX, maxX, x);
  const lerpY = y => lerp(minY, maxY, y);

  const layers = [
    network.layers.input,
    ...network.layers.hidden,
    network.layers.output,
  ];

  const networkSize = layers.length;
  let maxLayerHeight = 0;

  const neuronsPositions = layers.reduce((acc, layer, layerIdx) => {
    const layerSize = layer.list.length;
    maxLayerHeight = Math.max(maxLayerHeight, layerSize);

    return {
      ...acc,
      ...layer.list.reduce(
        (acc, neuron, neuronIdx) => ({
          ...acc,
          [neuron.ID]: {
            x: lerpX((layerIdx + 0.5) / networkSize),
            y: lerpY((neuronIdx + 0.5) / layerSize),
          },
        }),
        {}
      ),
    };
  }, {});

  const neuronUnit = Math.min(
    lerpX(1 / networkSize),
    lerpY(1 / maxLayerHeight)
  );

  return {
    units: {
      neuronRadius: neuronUnit / 4,
      strokeWidth: neuronUnit / 80,
      neuronFontSize: neuronUnit / 6,
      connectionFontSize: neuronUnit / 8,
    },
    neuronsPositions,
  };
}
