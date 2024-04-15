import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, onChange, initalPreview }) {
  const inputRef = useRef();
  const [preview, setPreview] = useState(initalPreview);

  const handleChange = (e) => {
    const nextVlaue = e.target.files[0];
    onChange(name, nextVlaue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;
    inputNode.value = "";
    onChange(name, null);
  };
  useEffect(() => {
    if (!value) return;

    const nextValue = URL.createObjectURL(value);
    setPreview(nextValue);

    return () => {
      setPreview(initalPreview);
      URL.revokeObjectURL(nextValue);
    };
  }, [value, initalPreview]);

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && <button onClick={handleClearClick}> X </button>}
    </div>
  );
}
export default FileInput;
