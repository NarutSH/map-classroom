import React, { useState } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

const Form = ({ callBack }) => {
  const { addToast } = useToasts();

  const [title, setTitle] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const onHandleSubmit = async () => {
    const data = {
      title: title,
      latitude: latitude,
      longitude: longitude,
    };

    const response = await axios.post("http://localhost:8000/locations", data);
    await callBack();
    addToast(response.data.message, {
      appearance: "success",
      autoDismiss: true,
    });
    console.log("response", response);
    setTitle("");
    setLatitude("");
    setLongitude("");
  };

  return (
    <div>
      <input
        type="text"
        className="form-control my-2"
        placeholder="ชื่อ"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="number"
        className="form-control my-2"
        placeholder="latitude"
        value={latitude}
        onChange={(ev) => setLatitude(ev.target.value)}
      />
      <input
        type="number"
        className="form-control my-2"
        placeholder="longitude"
        value={longitude}
        onChange={(ev) => setLongitude(ev.target.value)}
      />

      <button className="btn btn-primary" onClick={onHandleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Form;
