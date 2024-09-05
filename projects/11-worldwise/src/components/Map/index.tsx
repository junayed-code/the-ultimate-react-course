import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";

import Button from "@components/Button";
import Spinner from "@components/Spinner";
import { useCities } from "@/providers/CitiesProvider";
import { useGeolocation } from "@hooks/useGeolocation";
import { useLatlngParams } from "@hooks/useLatlngParams";
import styles from "./Map.module.css";

function Map() {
  const geo = useGeolocation();
  const { data: cities, isLoading } = useCities();
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (geo.position) {
      const { lat, lng } = geo.position;
      setSearchParams({ lat: `${lat}`, lng: `${lng}` });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo.position]);

  return (
    <div className={styles.mapContainer}>
      {!cities && isLoading && <Spinner />}
      {!!cities && (
        <>
          {!geo.position && (
            <Button variant="position" onClick={geo.getPosition}>
              {geo.isLoading ? "Loading..." : "Use your location"}
            </Button>
          )}
          <MapContainer zoom={10} className={styles.map} center={[38.7, -9.1]}>
            <TileLayer
              // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
            />
            {cities?.map(({ id, position, cityName, emoji }) => (
              <Marker key={id} position={[position.lat, position.lng]}>
                <Popup>
                  <span>{emoji}</span> <span>{cityName}</span>
                </Popup>
              </Marker>
            ))}
            <ChangeMapPosition />
            <MapClickEvent />
          </MapContainer>
        </>
      )}
    </div>
  );
}

function ChangeMapPosition() {
  const map = useMap();
  const [lat, lng] = useLatlngParams();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (lat && lng) map.setView([lat, lng]);
  }, [lat, lng]);

  return null;
}

function MapClickEvent() {
  const navigate = useNavigate();
  useMapEvent("click", (e) => {
    navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
  });
  return null;
}

export default Map;
