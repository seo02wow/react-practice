import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import { createFood, deleteFood, getFoods, updateFood } from "./api";
import { useCallback, useEffect, useState } from "react";
import useAsync from "./hooks/useAsync";
import LocaleContext from "../contexts/LocaleContext";
import LocaleSelect from "./LocaleSelect";

function App() {
  // 최상위 컴포넌트
  const [locale, setLocale] = useState("ko");
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState();
  const [isLoading, loadingError, getFoodAsync] = useAsync(getFoods);
  const [search, setSearch] = useState("");

  const handleNewClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  const handleDelete = async (id) => {
    const reslut = await deleteFood(id);
    if (!reslut) return;
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleLoad = useCallback(
    async (options) => {
      const reslut = await getFoodAsync(options);
      if (!reslut) return;

      const { foods, paging } = reslut;
      if (!options.cursor) {
        setItems(foods);
      } else {
        setItems((prevItems) => [...prevItems, ...foods]);
      }
      setCursor(paging.nextCursor);
    },
    [getFoodAsync]
  );

  const handleLoadMore = () => {
    handleLoad({
      order,
      cursor,
      search,
    });
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);

    handleLoad(search);
  };

  const handleCreateSuccess = (food) => {
    setItems((prevItems) => [food, ...prevItems]);
  };

  const handleUpdateSuccess = (food) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === food.id);
      return [
        ...prevItems.slice(0, splitIdx),
        food,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({
      order,
      search,
    });
  }, [order, search, handleLoad]);

  return (
    <LocaleContext.Provider value={locale}>
      <div>
        <LocaleSelect value={locale} onChange={setLocale} />
        <div>
          <FoodForm
            onSubmitSuccess={handleCreateSuccess}
            onSubmit={createFood}
          />
          <button onClick={handleNewClick}>최신순</button>
          <button onClick={handleCalorieClick}>칼로리순</button>
          <form onSubmit={handleSearchSubmit}>
            <input name="search" />
            <button type="submit">검색</button>
          </form>
        </div>
        <FoodList
          items={items}
          onDelete={handleDelete}
          onUpdate={updateFood}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {cursor && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            더보기
          </button>
        )}
        {loadingError?.message && <span>{loadingError.message}</span>}
      </div>
    </LocaleContext.Provider>
  );
}

export default App;
