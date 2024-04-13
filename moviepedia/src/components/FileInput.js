import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();

  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return; // 값이 없는 경우 함수 종료
    inputNode.value = "";
    onChange(name, null); // 부모 컴포넌트에서 이미지 파일 값이 null
  };

  // value = img URL
  // 파일을 선택할 때마다 미리 보기 주소를 바꿈
  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value); // side effect 발생
    setPreview(nextPreview);

    return () => {
      // 정리 함수
      setPreview(); // 빈 값으로 초기화
      URL.revokeObjectURL(nextPreview); // ObjectURL해제
    };
  }, [value]);

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      {/* // value 값이 있을 때만 렌더링 */}
      {value && <button onClick={handleClearClick}> X </button>}
    </div>
  );
}

export default FileInput;
