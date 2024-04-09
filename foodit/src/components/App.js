import FoodList from "./FoodList";
import mockItems from "../mock.json";
import { useState } from "react";

function App() {
  // 최상위 컴포넌트
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState(mockItems);
  const sortedMenus = items.sort((a, b) => b[order] - a[order]);

  const handleNewClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  return (
    <div>
      <div>
        <button onClick={handleNewClick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
      </div>
      <FoodList items={items} onDelete={handleDelete} />
    </div>
  );
}

export default App;
