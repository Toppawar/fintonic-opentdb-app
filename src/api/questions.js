export const fetchQuestions = async (amount = 10, category) => {
  const res = await fetch(`https://opentdb.com/api.php?amount=${amount}`);
  const data = await res.json();
  return data;
};

export const fetchQuestionsByCategory = async (amount = 10, category) => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=${category}`
  );
  const data = await res.json();
  return data;
};

export const fetchCategoryQuestions = async () => {
  const res = await fetch("https://opentdb.com/api_category.php");
  const data = await res.json();
  return data;
};
