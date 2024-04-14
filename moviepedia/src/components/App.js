import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { createReview, getReviews, updateReview } from "./api";
import ReviewForm from "./ReviewForm";

const LIMIT = 6;

function App() {
  // 최상위 컴포넌트
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const handleNewstClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      // 로딩 시작
      setIsLoading(true);
      setLoadingError(null);
      result = await getReviews(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      // 리퀘스트가 실패하거나 성공하는 경우
      // 오류가 나도 항상 로딩 값은 false
      setIsLoading(false);
    }
    const { reviews, paging } = result;
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

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      // 수정할 인덱스 찾기
      // 기존 리뷰 배열에서 같은 아이디에 해당하는 리뷰 갈아끼움 ..
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
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
      <ReviewForm
        onSubmitSuccess={handleCreateSuccess}
        onSubmit={createReview}
      />
      <ReviewList
        items={sortedItems}
        onDelete={handleDelete}
        onUpdate={updateReview}
        onUpdateSuccess={handleUpdateSuccess}
      />

      {/* hasNext 값이 true인 경우 실행, false인 경우 표현식 계산하지 않고 hasNext의 값을 사용함 (리액트에서 false 값은 렌더링하지 않음)  
      로딩되고 있는 경우에는 버튼을 비활성화 처리 
      비활성화 처리하지 않는 경우 로딩 중에 버튼을 클릭할 수 있어 불필요한 리퀘스트 발생 가능함 */}
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
