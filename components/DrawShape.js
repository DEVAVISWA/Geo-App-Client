import React, { useState } from 'react';
import { useMap } from 'react-map-gl';

const DrawShape = () => {
  const [drawing, setDrawing] = useState(false);
  const map = useMap();

  const handleDraw = () => {
    if (!drawing) {
      map.addSource('draw-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0]
          }
        }
      });

      map.addLayer({
        id: 'draw-layer',
        source: 'draw-source',
        type: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#40a9ff'
        }
      });

      map.on('draw.create', (e) => {
        const { id } = e.features[0];
        map.getSource('draw-source').setData({
          type: 'FeatureCollection',
          features: map.getSource('draw-source')._data.features.filter(f => f.id !== id)
        });
        setDrawing(false);
        handleDrawShape(e.features[0]);
      });

      map.on('draw.update', (e) => {
        setDrawing(true);
      });

      map.on('draw.delete', (e) => {
        setDrawing(false);
      });

      map.addInteraction({
        type: 'draw',
        id: 'draw-interaction',
        source: 'draw-source',
        layers: ['draw-layer'],
        options: {
          type: 'circle',
          maxPoints: 1
        }
      });

      setDrawing(true);
    } else {
      map.removeLayer('draw-layer');
      map.removeSource('draw-source');
      map.removeInteraction('draw-interaction');
      setDrawing(false);
    }
  };

  return (
    <button onClick={handleDraw}>
      {drawing ? 'Stop Drawing' : 'Draw'}
    </button>
  );
};

export default DrawShape;