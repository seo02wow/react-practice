import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { getReviews } from "./api";

const LIMIT = 6;

function App() {
  // 최상위 컴포넌트
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const handleNewstClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    const { reviews, paging } = await getReviews(options);
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      // previtems : 현재 state 값
      setItems((previtems) => [...previtems, ...reviews]);
    }
    // 데이터를 받아온 후 작업 offset limit값만큼 증가
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext); // 리스폰스에 있는 paging 객체
  };

  const handleLoadMore = () => {
    // 다음 페이지를 불러오는 함수
    handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleNewstClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {/* hasNext 값이 true인 경우 실행, false인 경우 표현식 계산하지 않고 hasNext의 값을 사용함 (리액트에서 false 값은 렌더링하지 않음)  */}
      {hasNext && <button onClick={handleLoadMore}>더보기</button>}
    </div>
  );
}

export default App;
