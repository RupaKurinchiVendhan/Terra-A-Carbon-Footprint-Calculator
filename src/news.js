const url =
          'http://newsapi.org/v2/everything?' +
          'q=climate&' +
          'from=2020-09-20&' +
          'sortBy=popularity&' +
          'apiKey=bc8b042589ec4daab0731d99f198fa81';

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}
