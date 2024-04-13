function FileInput({ name, value, onChange }) {
  const handleChange = (e) => {
    const nextVlaue = e.target.files[0];
    onChange(name, nextVlaue);
  };

  return <input type="file" onChange={handleChange} />;
}
export default FileInput;
