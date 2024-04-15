import { useState } from "react";
import Rating from "./Rating";
import "./ReviewList.css";
import ReviewForm from "./ReviewForm";
import useTranslate from "../hooks/useTranslate";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, onDelete, onEdit }) {
  const t = useTranslate(); // 번역하는 함수 가져옴

  const handleDeleteClick = () => onDelete(item.id);

  const handleEditClick = () => {
    onEdit(item.id);
  };

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <Rating value={item.rating} />
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleEditClick}>{t("edit button")}</button>
        <button onClick={handleDeleteClick}>{t("delete button")}</button>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancle = () => setEditingId(null);

  return (
    <ul>
      {items.map((item) => {
        if (item.id === editingId) {
          const { id, imgUrl, title, rating, content } = item;
          const initalValues = { title, rating, content, imgFile: null };

          const handleSubmit = (formData) => onUpdate(id, formData);
          const handleSubmitSuccess = (review) => {
            onUpdateSuccess(review);
            setEditingId(null); // 입력 폼 닫음
          };
          return (
            <li key={item.id}>
              <ReviewForm
                initalValues={initalValues}
                initalPreview={imgUrl}
                onCancel={handleCancle}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <ReviewListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}
export default ReviewList;
