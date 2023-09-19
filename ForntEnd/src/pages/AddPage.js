import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddPage.css";
import axios from "axios";
import { toast } from "react-toastify";

const initial = {
  name: "",
  movie_name: "",
  rating: "",
};

const AddPage = () => {
  const [state, setState] = useState(initial);

  const { name, movie_name, rating } = state;

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !movie_name || !rating) {
      toast.error("Please provied the required value!");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            name,
            movie_name,
            rating,
          })
          .then(() => {
            setState({ name: "", movie_name: "", rating: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Thanks For Your Rating!!");
      } else{
        axios
        .put(`http://localhost:5000/api/update/${id}`, {
          name,
          movie_name,
          rating,
        })
        .then(() => {
          setState({ name: "", movie_name: "", rating: "" });
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("Rating Updated Successfuly!!");
      }

      setTimeout(() => navigate("/"), 500);
    }
  };
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div style={{ margin: "100px" }}>
      <form onSubmit={submitHandler}>
        <div
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
          }}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name..."
            value={name || ""}
            onChange={inputChangeHandler}
          />
          <label htmlFor="ticket_num">Movie Name</label>
          <input
            type="text"
            id="movie_name"
            name="movie_name"
            placeholder="Your Movie Name..."
            value={movie_name || ""}
            onChange={inputChangeHandler}
          />
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            placeholder="Your Movie Rating..."
            value={rating || ""}
            onChange={inputChangeHandler}
          />
          <input type="submit" value={id ? "Update" : "Save"} />
          <Link to="/home">
            <input type="button" value="Go Back" />
          </Link>
        </div>
      </form>
    </div>
  );
};
export default AddPage;
