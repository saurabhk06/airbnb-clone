import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import "mapbox-gl/dist/mapbox-gl.css";

function MapService({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  // Transform the search results object.
  const coordinates = searchResults.map(result => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11
  });

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/saurabhk/cl13xqrff000714lcv4b81gw1'
      mapboxAccessToken={process.env.mapbox_key}
      onMove={evt => setViewport(evt.viewport)}
      {...viewport}
    >
      {searchResults.map(result => (
        <div key={result.long}>
            <Marker
              longitude={result.long}
              latitude={result.lat}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <p 
                role='img'
                onClick={() => setSelectedLocation(result)}
                className='cursor-pointer text-xl animate-bounce'
                aria-label='push-pin'>📌</p>                
            </Marker>
            
            {/* The popup that should show if we click on a Marker */}
            {selectedLocation.long === result.long ? (
               <div>
               <Popup
                  latitude={result.lat}
                  longitude={result.long}
                  closeOnClick={false}
                  closeOnMove={true}
                >
                  {result.title }
                </Popup>
                </div>
            ) : (
              null
            ) }
        </div>
      ))}

    </ReactMapGL>
  )
}

export default MapService