// import React, { useEffect, useRef, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';

// mapboxgl.accessToken = '';

// const Map = () => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-70.9);
//   const [lat, setLat] = useState(42.35);
//   const [zoom, setZoom] = useState(9);

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [lng, lat],
//       zoom: zoom
//     });

//     const draw = new MapboxDraw();
//     map.current.addControl(draw);

//     map.current.on('load', () => {
//       // Load GeoJSON/KML files and add to the map
//     });

//     map.current.on('draw.create', (e) => {
//       // Save drawn shapes
//     });

//     map.current.on('draw.update', (e) => {
//       // Update shapes
//     });

//     map.current.on('draw.delete', (e) => {
//       // Delete shapes
//     });
//   });

//   return <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;
// };

// export default Map;

// client/components/Map.js

import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN


const Map = () => {
  const [map, setMap] = useState(null);
  const [files, setFiles] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [pointMarkers, setPointMarkers] = useState([]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [10.7905, 78.7047],
      zoom: 4
    });
    setMap(map);
  }, []);


  //YET TO HANDLE
  
  useEffect(() => {
    fetch('/api/files')
      .then(response => response.json())
      .then(files => setFiles(files));
  }, []);

  useEffect(() => {
    fetch('/api/shapes')
      .then(response => response.json())
      .then(shapes => setShapes(shapes));
  }, []);

  useEffect(() => {
    fetch('/api/pointMarkers')
      .then(response => response.json())
      .then(pointMarkers => setPointMarkers(pointMarkers));
  }, []);

  const handleDrawShape = (shape) => {
    // To Save shape to database yet to handle
    fetch('/api/shapes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shape)
    })
      .then(response => response.json())
      .then((shape) => setShapes([...shapes, shape]));
  };

  const handleAddPointMarker = (pointMarker) => {
    //To Save point marker to database yet to handle
    fetch('/api/pointMarkers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pointMarker)
    })
      .then(response => response.json())
      .then((pointMarker) => setPointMarkers([...pointMarkers, pointMarker]));
  };

  return (
    <div id="map" style={{ width: '100%', height: '500px' }} />
  );
};

export default Map;