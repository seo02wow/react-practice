import { useRef } from "react";

function FileInput({ name, value, onChange }) {
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

  return (
    <div>
      <input type="file" onChange={handleChange} ref={inputRef} />
      {/* // value 값이 있을 때만 렌더링 */}
      {value && <button onClick={handleClearClick}> X </button>}
    </div>
  );
}

export default FileInput;
