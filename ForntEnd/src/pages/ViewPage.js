import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ViewPage.css";
import axios from "axios";

const View = () => {
  const [User, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card_header">
          <p>User Rating</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name:</strong>
          <span>{User.name}</span>
          <br />
          <br />
          <strong>Movie Name:</strong>
          <span>{User.movie_name}</span>
          <br />
          <br />
          <strong>Rating:</strong>
          <span>{User.rating}</span>
          <br />
          <br />
          <Link to="/home">
          <div className="btn btn-edit">Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default View;
