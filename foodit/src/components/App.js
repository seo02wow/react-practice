import FoodList from "./FoodList";
import { getFoods } from "./api";
import { useEffect, useState } from "react";

function App() {
  // 최상위 컴포넌트
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const handleNewClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    let reslut;
    try {
      setIsLoading(true);
      setLoadingError(null);
      reslut = await getFoods(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { foods, paging } = reslut;
    if (!options.cursor) {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }
    setCursor(paging.nextCursor);
  };

  const handleLoadMore = () => {
    handleLoad({
      order,
      cursor,
    });
  };

  useEffect(() => {
    handleLoad({
      order,
    });
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleNewClick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
      </div>
      <FoodList items={items} onDelete={handleDelete} />
      {cursor && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
