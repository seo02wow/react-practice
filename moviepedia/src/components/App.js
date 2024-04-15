import ReviewList from "./ReviewList";
import { useCallback, useEffect, useState } from "react";
import { createReview, deleteReview, getReviews, updateReview } from "./api";
import ReviewForm from "./ReviewForm";
import useAsync from "./hooks/useAsync";
import { LocaleProvider } from "../contexts/LocaleContext";
import LocaleSelect from "./LocaleSelect";

const LIMIT = 6;

function App() {
  // 최상위 컴포넌트
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);

  const handleNewstClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleDelete = async (id) => {
    const reslut = await deleteReview(id);
    if (!reslut) return;

    //prevItems : setter 함수에서 콜백으로 받는 매개변수
    // state 변경 전의 값을 참조하고 있음 , 즉 삭제하기 전에 item들
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleLoad = useCallback(
    async (options) => {
      const result = await getReviewsAsync(options);
      if (!result) return;

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
    },
    [getReviewsAsync]
  );

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
      // 기존 리뷰 배열에서 같은 아이디에 해당하는 리뷰 갈아끼움
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad]);

  return (
    <LocaleProvider defalutValue="ko">
      <div>
        <LocaleSelect />
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
    </LocaleProvider>
  );
}

export default App;
