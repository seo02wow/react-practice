import { useContext, useState } from "react";
import "./FoodList.css";
import FoodForm from "./FoodForm";
import { useLocale } from "../contexts/LocaleContext";

function FoodListItem({ item, onDelete, onEdit }) {
  const { imgUrl, title, calorie, content } = item;
  const handleDeleteClick = () => onDelete(item.id);
  const handleEditClick = () => onEdit(item.id);

  const locale = useLocale();

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <p>현재 언어 : {locale}</p>
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <button onClick={handleDeleteClick}>삭제</button>
      <button onClick={handleEditClick}>수정</button>
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
