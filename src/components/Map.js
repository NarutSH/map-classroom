import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { BiTrashAlt } from "react-icons/bi";
import { useToasts } from "react-toast-notifications";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ locations, callBack }) => {
  const [position, setPosition] = useState([14, 103]);

  const { addToast } = useToasts();

  const onHandleDelete = async (item) => {
    const response = await axios.delete(
      `http://localhost:8000/locations/${item.id}`
    );

    await callBack();
    addToast("ลบเรียบร้อยแล้ว", {
      appearance: "success",
      autoDismiss: true,
    });
  };

  return (
    <div>
      <MapContainer
        style={{ width: "100%", height: "400px" }}
        center={position}
        zoom={9}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((item) => {
          return (
            <Marker position={[item.latitude, item.longitude]}>
              <Popup>
                <div>{item.title}</div>
                <div>
                  <BiTrashAlt
                    onClick={() => onHandleDelete(item)}
                    role="button"
                  />
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
