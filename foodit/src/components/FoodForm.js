import { useState } from "react";

function FoodForm() {
  const [values, setValues] = useState({
    title: "",
    calorie: 0,
    content: "",
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
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: sanitize(type, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" onChange={handleChange} value={values.title}></input>
      <input
        type="number"
        name="calorie"
        onChange={handleChange}
        value={values.calorie}
      ></input>
      <input
        name="content"
        onChange={handleChange}
        value={values.content}
      ></input>
      <button type="submit">확인</button>
    </form>
  );
}
export default FoodForm;
