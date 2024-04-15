import { useState } from "react";
import "./FoodList.css";
import FoodForm from "./FoodForm";

function FoodListItem({ item, onDelete, onEdit }) {
  const { imgUrl, title, calorie, content } = item;
  const handleDeleteClick = () => onDelete(item.id);
  const handleEditClick = () => onEdit(item.id);

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie}</div>
      <div>{content}</div>
      <button onClick={handleDeleteClick}>삭제</button>
      <button onClick={handleEditClick}>수정</button>
    </div>
  );
}

function FoodList({ items, onDelete }) {
  const [editngId, setEditingId] = useState(null);

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id === editngId) {
          const { imgUrl, content, title, calorie } = item;
          const initalValues = { content, title, calorie };
          const handleCancle = () => setEditingId(null);

          return (
            <li key={item.id}>
              <FoodForm
                initalValues={initalValues}
                initalPreview={imgUrl}
                onCanel={handleCancle}
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
