import { useState } from "react";
import Rating from "./Rating";
import "./RatingInput.css";

function Ratinginput({ name, value, onChange }) {
  const [rating, setRating] = useState(value);

  const handleSelect = (nextValue) => onChange(name, nextValue);

  const handleMouseOut = () => setRating(value);

  return (
    <Rating
      className="RatingInput"
      value={rating}
      onSelect={handleSelect}
      onMouseOut={handleMouseOut}
      onHover={setRating}
    />
  );
}
export default Ratinginput;
