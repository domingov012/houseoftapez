export default function QuizQuestion({question, answers, onAnswer}) {
  if (!question) return null;

  // Get options based on question type
  let options = question.options;

  // Handle branching questions (body_part depends on injury_category)
  if (question.optionsByCategory && answers.injury_category) {
    options = question.optionsByCategory[answers.injury_category] || [];
  }

  return (
    <div className="quiz-question">
      <h2 className="quiz-question-title">{question.question}</h2>

      <div className="quiz-options">
        {options?.map((option) => (
          <button
            key={option.value}
            className="quiz-option"
            onClick={() => onAnswer(question.id, option.value)}
          >
            <span className="quiz-option-label">{option.label}</span>
            {option.description && (
              <span className="quiz-option-description">
                {option.description}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
