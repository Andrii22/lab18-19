export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (e) {
    console.log('Error', e);
  }
};
