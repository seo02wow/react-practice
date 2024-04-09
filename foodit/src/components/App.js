import FoodList from "./FoodList";
import items from "../mock.json";

function App() {
  // 최상위 컴포넌트
  return (
    <div>
      <FoodList items={items} />
    </div>
  );
}

export default App;
