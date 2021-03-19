module.exports = function getQuestions(data) {
  const questions = [];
  let question = null;

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (row.length === 0) {
      if (question) pushQuestion(question, questions);
      break;
    }
    if (row[0] === "No" && row[1] === "Question") continue;

    if (row[0]) {
      if (question) pushQuestion(question, questions);

      question = {
        id: row[0],
        text: row[1],
        options: [],
        answers: [],
        desiredAnswers: null,
      };
    }

    const options = row.slice(3, row.length);
    for (let i = 0; i < options.length; i++) {
      if (!options[i]) continue;
      if (typeof options[i] === "string") {
        const split = options[i].split(/^A:/);
        if (split.length > 1) {
          question.answers.push(question.options.length + 1);
          let value = split[1];
          if (typeof value !== "string") {
            value = value.toString().toUpperCase();
          }
          question.options.push(value);
          continue;
        }
      }

      let value = options[i];
      if (typeof value !== "string") {
        value = value.toString().toUpperCase();
      }
      question.options.push(value);
    }
  }

  return questions;
};

function pushQuestion(question, questions) {
  if (question.options.length === 1) {
    if (question.options[0] === "TRUE") question.options.push("FALSE");
    if (question.options[0] === "FALSE") question.options.push("TRUE");
  }

  questions.push(question);
}
