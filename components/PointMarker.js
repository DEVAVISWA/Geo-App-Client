import React, { useState } from 'react';
import { useMap } from 'react-map-gl';

const PointMarker = () => {
  const [dragging, setDragging] = useState(false);
  const [pointMarker, setPointMarker] = useState(null);
  const map = useMap();

  const handleAddPointMarker = () => {
    const newPointMarker = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [map.getCenter().lng, map.getCenter().lat]
      }
    };
    setPointMarker(newPointMarker);
  };

  const handleMovePointMarker = (e) => {
    if (pointMarker) {
      const { lng, lat } = e.lngLat;
      setPointMarker({
        ...pointMarker,
        geometry: {
          ...pointMarker.geometry,
          coordinates: [lng, lat]
        }
      });
    }
  };

  const handleSavePointMarker = () => {
    if (pointMarker) {
      fetch('/api/pointMarkers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pointMarker)
      })
        .then(response => response.json())
        .then((pointMarker) => setPointMarkers([...pointMarkers, pointMarker]));
    }
  };

  const handleDeletePointMarker = () => {
    if (pointMarker) {
      fetch(`/api/pointMarkers/${pointMarker.id}`, {
        method: 'DELETE'
      })
        .then(() => {
          setPointMarker(null);
          setPointMarkers(pointMarkers.filter(pm => pm.id !== pointMarker.id));
        });
    }
  };

  useEffect(() => {
    if (pointMarker) {
      map.addSource('point-marker-source', {
        type: 'geojson',
        data: pointMarker
      });

      map.addLayer({
        id: 'point-marker-layer',
        source: 'point-marker-source',
        type: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#40a9ff'
        }
      });

      map.on('click', (e) => {
        if (!dragging) {
          handleAddPointMarker();
          handleMovePointMarker(e);
        }
      });

      map.on('mousemove', (e) => {
        if (dragging) {
          handleMovePointMarker(e);
        }
      });

      map.on('mousedown', () => {
        setDragging(true);
      });

      map.on('mouseup', () => {
        setDragging(false);
      });
    } else {
      map.removeLayer('point-marker-layer');
      map.removeSource('point-marker-source');
    }
  }, [pointMarker]);

  return (
    <div>
      <button onClick={handleAddPointMarker}>
        Add Point Marker
      </button>
      <button onClick={handleSavePointMarker}>
        Save Point Marker
      </button>
      <button onClick={handleDeletePointMarker}>
        Delete Point Marker
      </button>
    </div>
  );
};

export default PointMarker;