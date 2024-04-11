export async function getReviews(order = "createdAt") {
  const query = `order=${order}`;
  const response = await fetch(
    `https://learn.codeit.kr/9188/film-reviews?${query}`
  );
  const body = await response.json();
  return body;
}
