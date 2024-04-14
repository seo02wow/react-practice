const BASE_URL = "https://learn.codeit.kr/9188";

export async function getFoods({
  order = "createdAt",
  cursor = "",
  limit = 10,
  search = "",
}) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}&search=${search}`;
  const response = await fetch(`${BASE_URL}/foods?${query}`);
  if (!response.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function createFood(formData) {
  const response = await fetch(`${BASE_URL}/foods`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("데이터를 생성하는 데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
