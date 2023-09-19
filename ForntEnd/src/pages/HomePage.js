import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
 import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [Data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  }, []);

  const deleteContent = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that information ")
    ) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Deleted Successfuly");
      setTimeout(() => loadData(), 500);
    }
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <Link to="/addContact">
        <button className="btn btn-contact">Add Contact</button>
      </Link>
      <table className="style_table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Movie Name</th>
            <th style={{ textAlign: "center" }}>Rating</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {Data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.movie_name}</td>
                <td>{item.rating}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteContent(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
