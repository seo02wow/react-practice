export async function getFoods() {
  const response = await fetch("https://learn.codeit.kr/9188/foods");
  const body = response.json();
  return body;
}