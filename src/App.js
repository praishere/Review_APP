// App.js
import React, { useState, useEffect } from "react";
import Review from "./Review";
import "./App.css";

function App() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetching reviews data
    const fetchData = async () => {
      try {
        const response = await fetch("reviews_data.json");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <h1>Reviews</h1>
      {
        console.log(reviews)
      }
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </div>
    </div>
  );
}

export default App;
