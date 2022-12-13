import { useEffect, useRef, useState } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "Kiki's Deliver Servicing";
  }, []);

  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [longitude, setLongitude] = useState(-76.8867);
  const [latitude, setLatitude] = useState(40.2732);

  useEffect(() => {
    let map = tt.map({
      key: process.env.REACT_APP_TOM_TOM_API_KEY,
      container: mapElement.current,
      center: [longitude, latitude],
      zoom: 10,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
    });
    setMap(map);

    const addMarker = () => {
      const element = document.createElement("div");
      element.className = "marker";
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);
    };

    addMarker();

    return () => map.remove();
  }, [longitude, latitude]);

  return (
    <div className="app">
      <div className="map" ref={mapElement} />
      <div className="search-bar">
        <h1>Where to?</h1>
        <input
          type="text"
          id="longitude"
          className="longitude"
          placeholder="Put in Longitude"
          onChange={(e) => {
            setLongitude(e.target.value);
          }}
        />
        <input
          type="text"
          id="latitude"
          className="latitude"
          placeholder="Put in Latitude"
          onChange={(e) => {
            setLatitude(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default App;
