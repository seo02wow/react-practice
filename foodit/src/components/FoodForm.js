import { useState } from "react";
import FileInput from "./FileInput";

function FoodForm() {
  const [values, setValues] = useState({
    title: "",
    calorie: 0,
    content: "",
    imgFile: null,
  });

  // 칼로리 값이 문자열로 처리되어 숫자로 바꿔줌 (인풋값이 숫자일 경우에만 처리)
  function sanitize(type, value) {
    switch (type) {
      case "number":
        return Number(value) || 0;

      default:
        return value;
    }
  }

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <input
        name="title"
        onChange={handleInputChange}
        value={values.title}
      ></input>
      <input
        type="number"
        name="calorie"
        onChange={handleInputChange}
        value={values.calorie}
      ></input>
      <input
        name="content"
        onChange={handleInputChange}
        value={values.content}
      ></input>
      <button type="submit">확인</button>
    </form>
  );
}
export default FoodForm;