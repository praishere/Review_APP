import React, { useState } from "react";
import "./Review.css";
import { ReactComponent as SaveIcon } from "./save.svg";
import { ReactComponent as AddPersonIcon } from "./add-person.svg";
import { ReactComponent as ThreeDotsIcon } from "./three-dots.svg";


// Define a Tooltip component
const Tooltip = ({ topic }) => {
  return <div className="tooltip">{topic}</div>;
};

const getColorCode = (sentiment) => {
  switch (sentiment) {
    case 'Positive':
      return '#D9F2DD';
    case 'Negative':
      return '#F2DBD9';
    case 'Mixed':
      return '#e8bd6d3d';
    case 'Neutral':
      return '#eaf09b6b';
    default:
      return 'black'; // Default color
  }
};

const Star = ({ sentiment, index }) => {
  // Define the ranges for each sentiment
  const ranges = {
    'Positive': [25, 192],
    'Negative': [461, 578],
    // Add more sentiments and their ranges if needed
  };

  // Check if the current index falls within the range for the given sentiment
  let filledStars = 0;
  if (ranges[sentiment] && index >= ranges[sentiment][0] && index <= ranges[sentiment][1]) {
    filledStars = 1;
  }

  return (
    <span className={`star ${filledStars ? "filled" : ""}`} style={{ borderColor: "black" }}>
      &#9733;
    </span>
  );
};

const Review = ({ review }) => {
  const [tooltipContent, setTooltipContent] = useState('');

  const highlightSentences = () => {
    return review.analytics.map((analyticsItem, index) => {
      const { highlight_indices, sentiment, topic } = analyticsItem;
      if (!highlight_indices) return null;

      const sentences = [];
      highlight_indices.forEach((indices, sentenceIndex) => {
        const [start, end] = indices;
        sentences.push(
          <span
            key={sentenceIndex}
            className={`sentence ${sentiment}`}
            data-topic={topic}
            onMouseEnter={() => setTooltipContent(topic)}
            onMouseLeave={() => setTooltipContent('')}
          >
            {review.content.substring(start, end)}
            {tooltipContent === topic && <Tooltip topic={topic} />}
          </span>
        );
      });
      return sentences;
    });
  };

  return (
    <div className="page-container" style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
    <div className="review">
      <div className="review-header">
      <img className="profile-pic" src="https://www.edigitalagency.com.au/wp-content/uploads/tripadvisor-logo-circle-owl-icon-black-green-858x858.png" alt="Profile Pic" style={{ width: '65px', height: '62px' }}/>


        <p>
        <strong>{review.reviewer_name}</strong> wrote a review at the <a href="https://www.tripadvisor.com" target="_blank" rel="noopener noreferrer">tripadvisor.com</a>
        </p>
        <div className="actions">
          <SaveIcon className="icon" />
          <AddPersonIcon className="icon" />
          <ThreeDotsIcon className="icon" />
        </div>
      </div>
      <div className="review-stars" style={{ color: getColorCode(review.sentiment) }}>
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            index={index}
            sentiment={review.sentiment}
          />
        ))}
        <span className="review-date" style={{ color: "black" }}>{review.date}</span>
      </div>
      <div className="review-content">
        {review.analytics &&
          review.analytics.map((analyticsItem, index) => (
            <React.Fragment key={index}>
              {analyticsItem.sentences.map((sentence, sentenceIndex) => (
                <span
                  key={sentenceIndex}
                  className={`sentence ${analyticsItem.sentiment}`}
                  data-topic={analyticsItem.topic}
                  onMouseEnter={() => setTooltipContent(analyticsItem.topic)}
                  onMouseLeave={() => setTooltipContent('')}
                >
                  {sentence}
                  {tooltipContent === analyticsItem.topic && <Tooltip topic={analyticsItem.topic} />}
                </span>
              ))}
            </React.Fragment>
          ))}
      </div>
    </div>
    </div>
  );
};

export default Review;
