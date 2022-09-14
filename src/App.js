import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Map from "./components/Map";
import axios from "axios";

const App = () => {
  const [locations, setLocations] = useState([]);

  const getLocations = async () => {
    const response = await axios.get("http://localhost:8000/locations");

    const { data } = response.data;
    setLocations(data);
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <Map locations={locations} callBack={getLocations} />
        </div>
        <div className="col-md-4">
          <Form callBack={getLocations} />
        </div>
      </div>
    </div>
  );
};

export default App;
