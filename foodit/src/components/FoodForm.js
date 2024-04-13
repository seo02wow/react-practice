import { useState } from "react";

function FoodForm() {
  const [title, setTitle] = useState("");
  const [calorie, setCalorie] = useState(0);
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCalorieChange = (e) => {
    const nextCalorie = Number(e.target.value) || 0;
    setCalorie(nextCalorie);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form>
      <input name="title" onChange={handleTitleChange}></input>
      <input
        type="number"
        name="calorie"
        onChange={handleCalorieChange}
      ></input>
      <input name="content" onChange={handleContentChange}></input>
    </form>
  );
}
export default FoodForm;
