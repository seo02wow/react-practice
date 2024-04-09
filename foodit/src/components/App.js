import FoodList from "./FoodList";
import items from "../mock.json";
import { useState } from "react";

function App() {
  // 최상위 컴포넌트
  const [order, setOrder] = useState("createdAt");
  const sortedMenus = items.sort((a, b) => b[order] - a[order]);

  const handleNewClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  return (
    <div>
      <div>
        <button onClick={handleNewClick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
      </div>
      <FoodList items={items} />
    </div>
  );
}

export default App;
