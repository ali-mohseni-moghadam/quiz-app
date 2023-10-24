const formatData = (questionData) => {
  const result = questionData.map((item) => {
    const questionObject = { question: item.question };
    const answers = [...item.incorrect_answers];
    const corroctAnswerIndex = Math.floor(Math.random() * 4);
    answers.splice(corroctAnswerIndex, 0, item.correct_answer);
    questionObject.answer = answers;
    questionObject.corroctAnswerIndex = corroctAnswerIndex;
    return questionObject;
  });

  return result;
};

export default formatData;
