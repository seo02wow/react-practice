import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import Ratinginput from "./RatingInput";
import { createReview } from "./api";

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
}) {
  const [isSubmitting, setIsSubmitting] = useState(false); // 로딩 처리
  const [submittingError, setSubmittingError] = useState(null); // 에러 처리
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

    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true); // 로딩 중일 때 버튼 비활성화
      result = await createReview(formData);
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }

    const { review } = result;
    onSubmitSuccess(review);

    setValues(INITIAL_VALUES); // 초기화
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
        확인
      </button>
      {onCancel && <button onClick={onCancel}>취소</button>}
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}
export default ReviewForm;
