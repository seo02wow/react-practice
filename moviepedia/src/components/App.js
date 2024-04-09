import ReviewList from "./ReviewList";
import items from "../mock.json";

function App() {
  // 최상위 컴포넌트
  const sortedItems = items.sort((a, b) => b.rating - a.rating);
  return (
    <div>
      <ReviewList items={sortedItems} />
    </div>
  );
}

export default App;
