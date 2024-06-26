import { useState } from "react";
import FileInput from "./FileInput";
import useAsync from "./hooks/useAsync";
import useTranslate from "./hooks/useTranslate";

const INITIAL_VALUES = {
  title: "",
  calorie: 0,
  content: "",
  imgFile: null,
};

function FoodForm({
  onSubmitSuccess,
  initalValues = INITIAL_VALUES,
  initalPreview,
  onCanel,
  onSubmit,
}) {
  const [values, setValues] = useState(initalValues);
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);
  const t = useTranslate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgFile", values.imgFile);
    formData.append("title", values.title);
    formData.append("calorie", values.calorie);
    formData.append("content", values.content);

    const result = await onSubmitAsync(formData);
    if (!result) return;

    const { food } = result;
    onSubmitSuccess(food);

    setValues(INITIAL_VALUES);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
        initalPreview={initalPreview}
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
      <button type="submit" disabled={isSubmitting}>
        {t("confirm button")}
      </button>
      {onCanel && <button onClick={onCanel}> {t("cancel button")}</button>}
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}
export default FoodForm;
