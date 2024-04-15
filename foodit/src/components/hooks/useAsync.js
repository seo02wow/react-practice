import { useState, useCallback } from "react";

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  // 로딩, 에러 처리
  const wrappedFunction = useCallback(
    async (...args) => {
      try {
        setError(null);
        setPending(true); // 로딩 중일 때 버튼 비활성화
        return await asyncFunction(...args);
      } catch (error) {
        setError(error);
        return;
      } finally {
        setPending(false);
      }
    },
    [asyncFunction]
  );

  return [pending, error, wrappedFunction];
}

export default useAsync;
