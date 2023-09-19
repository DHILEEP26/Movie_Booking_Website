import React, { useState} from "react";
import { Link } from "react-router-dom";
import "./MoviesAvailable.css";
import axios from "axios";


let SCREEN = [
    {
      id: 1,
      time: "10:30 pm",
      seats: [1, 0, 1, 1, 1, 0, 0, 1],
    },
    {
      id: 2,
      time: "11:30 pm",
      seats: [1, 0, 1, 0, 1, 0, 1, 1],
    },
    {
      id: 3,
      time: "12:30 pm",
      seats: [0, 0, 1, 0, 1, 0, 1, 1],
    },
  ];
  const MOVIES = [
    {
      id: 1,
      MovieName: "DUNKIRK",
      MovieRating: "https://www.imdb.com/title/tt5013056/",
      Image:
        "https://3.bp.blogspot.com/-eUapFVoPxTg/WTjuG5uZfAI/AAAAAAAAjRs/itEkSo4TDf4cIndnQYEu2SSI5wyi8Im0gCLcB/s1600/Dunkirk.jpg",
    },
    {
      id: 2,
      MovieName: "OPPENHEIMER",
      MovieRating: "https://www.imdb.com/title/tt15398776/",
      Image:
        "https://media1.popsugar-assets.com/files/thumbor/zRDW_egryKkJGaKc_0R6VE69y-E/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2022/12/19/663/n/1922283/327e6a0463a07b7fc2a599.45949052_/i/oppenheimer-movie.jpg",
    },
    {
      id: 3,
      MovieName: "INTERSTELLAR",
      MovieRating: "https://www.imdb.com/title/tt0816692/",
      Image:
        "https://3.bp.blogspot.com/-DGBcx22-QIw/ViJJEf5ckLI/AAAAAAAAAaI/rW2Gf-bzdXA/s1600/interstellar_poster_comp_by_camartin-d87bpf6.jpg",
    },
  ];
  
  function MovieNames() {
    const [SelectedMovie, setSelectedMovie] = useState(null);
    const [selectedScreen, setSelectedScreen] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const handleSeatSelect=(index,screen)=>{
      if(screen?.id !== selectedScreen?.id){
        setSelectedSeats([index]);
        setSelectedScreen(screen)   
       return
      }
      setSelectedScreen(screen)
      if(selectedSeats.includes(index)){
        setSelectedSeats(selectedSeats.filter((i)=>i !== index));
      }
      else{
        setSelectedSeats((seats)=> [...seats, index])
      }
  
    }
    const sel_seats =selectedSeats.map(index => index+1).join(", ");
    const sel_ticket = selectedSeats?.length;
    const amount =selectedSeats?.length*180;
    const handleBooking =()=>{ 
      const postData = {
        sel_seats,
        sel_ticket,
        amount,
      };
      console.log(postData);
  
      axios.post('http://localhost:5000/api/posts',postData)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error:', error);
        });
      alert(`Seats ${sel_seats} booked for ${selectedScreen.movie.MovieName} at ${selectedScreen.time}`)
  
      SCREEN = SCREEN.map(screen => {
        if(screen.id === selectedScreen?.id){
          let seats = screen.seats;
          selectedSeats.map((seat) => (seats[seat] = 0))
            return{
              ...screen,
              seats
  
            }
        }
    return screen
      })
      setSelectedMovie(null)
      setSelectedScreen(null)
      setSelectedSeats([])
    }
  
    return (
      <div>
        <h1 className="fancy">CINEMATE</h1>
        <div className="link">
            <Link to="/home">
                <button className="button-75">Add Rating</button>
            </Link>
        </div>
        <h2 className="animate-charcter">Now Treanding</h2>
        <div className="MovieSelection">
          {MOVIES.map((movie) => (
            <div className="movie" key={movie.id} onClick={() => setSelectedMovie(movie)}>
              <img
                className="movie_poster"
                src={movie.Image}
                alt={movie.MovieName}
              ></img>
              <div className="movie_name">{movie.MovieName}</div>
              <div>
                <a href={movie.MovieRating}>
                  <button className="movie_rating">Rating</button>
                </a>
              </div>
            </div>
          ))}
        </div>
        {SelectedMovie && (
          <>
            <h2>Choose Your's</h2>
            <div className="screen_selection">
              {SCREEN.map((screen) => {
                return (
                  <div
                    key={screen.id}
                    className={`screen ${
                      screen?.id === selectedScreen?.id ? "selected" : ""
                    } ${screen.seats.includes(1) ? "available" : ""}`}
                  >
                    <div className="screen-number">Screen {screen.id}</div>
                    <div className="screen-time">{screen.time}</div>
                    <div className="movie-title">{SelectedMovie.MovieName}</div>
                    <div className="screen-seats">
                      {screen.seats.map((seat, index) => {
                        return (
                          <div
                            key={index}
                            className={`seat ${
                              seat ? "available" : "unavailable"
                            }  ${
                              selectedSeats.includes(index) &&
                              selectedScreen?.id === screen.id
                                ? "selected"
                                : ""
                            }
                            ${selectedSeats.includes(index) ? "booked" : ""}`}
                            onClick={()=>{
                              if(seat){
                                handleSeatSelect(index,{
                                  ...screen,
                                  movie: SelectedMovie
                                })
                              }
                            }}
                          >
                            <div className="seat-number">{index+1}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <div className="booking-summary">
          <div>
            {
  
              selectedScreen && (
                <div  className="selected-screen">
                  <h3>SCREEN NUMBER: {selectedScreen.id}</h3>
                  <p>TIME: {selectedScreen.time}</p>
                  <p>MOVIE: {selectedScreen.movie.MovieName}</p>
               </div>
            )
          }
          </div>
          <div >
            {
             selectedScreen && selectedSeats?.length > 0 && (
              <div className="selected-seat">
                <h3>SEATS NUMBER: <>{sel_seats}</></h3>
                <h3>TICKETS NUMBER: <>{sel_ticket}</></h3>
                <h3>AMOUNT: <>{amount}</></h3>
              </div>
             )
            }
          </div>
        </div>
        <button className="button-75" onClick={handleBooking} disabled={!selectedScreen || selectedSeats?.length === 0}>
          BOOK NOW!!
        </button>
      </div>
    );
  }
  export default MovieNames;
  