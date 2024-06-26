import { useState } from "react";
import "./FoodList.css";
import FoodForm from "./FoodForm";
import useTranslate from "./hooks/useTranslate";

function FoodListItem({ item, onDelete, onEdit }) {
  const { imgUrl, title, calorie, content } = item;
  const handleDeleteClick = () => onDelete(item.id);
  const handleEditClick = () => onEdit(item.id);

  const t = useTranslate();

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <button onClick={handleDeleteClick}>{t("delete button")}</button>
      <button onClick={handleEditClick}>{t("edit button")}</button>
    </div>
  );
}

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editngId, setEditingId] = useState(null);
  const handleCancle = () => setEditingId(null);

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id === editngId) {
          const { id, imgUrl, content, title, calorie } = item;
          const initalValues = { content, title, calorie, imgUrl: null };

          const handleSubmit = (formData) => onUpdate(id, formData);
          const handleSubmitSuccess = (food) => {
            onUpdateSuccess(food);
            setEditingId(null); // 입력 폼 닫음
          };

          return (
            <li key={item.id}>
              <FoodForm
                initalValues={initalValues}
                initalPreview={imgUrl}
                onCanel={handleCancle}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              />
            </li>
          );
        }

        return (
          <li key={item.id}>
            <FoodListItem
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

export default FoodList;
