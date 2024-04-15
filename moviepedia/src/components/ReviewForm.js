import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import Ratinginput from "./RatingInput";
import useAsync from "../hooks/useAsync";
import useTranslate from "../hooks/useTranslate";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({
  initalValues = INITIAL_VALUES,
  initalPreview,
  onSubmitSuccess,
  onCancel,
  onSubmit,
}) {
  const t = useTranslate(); // 번역하는 함수 가져옴
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);
  const [values, setValues] = useState(initalValues);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value, // name 값으로 프로퍼티명 지정
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target; // 이벤트 객체에서 name, value 값 가져옴
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);

    const result = await onSubmitAsync(formData);
    if (!result) return;

    const { review } = result;

    setValues(INITIAL_VALUES); // 초기화
    onSubmitSuccess(review);
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initalPreview={initalPreview}
        onChange={handleChange}
      />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <Ratinginput
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      <button type="submit" disabled={isSubmitting}>
        {t("confirm button")}
      </button>
      {onCancel && <button onClick={onCancel}>{t("cancel button")}</button>}
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}
export default ReviewForm;
