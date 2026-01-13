import QuizQuestion from './QuizQuestion';

export default function TapeFinderQuiz({
  step,
  totalSteps,
  currentQuestion,
  answers,
  onStart,
  onAnswer,
  onBack,
}) {
  // Welcome screen
  if (step === -1) {
    return (
      <div className="quiz-welcome">
        <div className="quiz-welcome-content">
          <h1 className="quiz-welcome-title">
            ENCUENTRA TU <span className="highlight">TAPE IDEAL</span>
          </h1>
          <p className="quiz-welcome-subtitle">
            Responde algunas preguntas y te recomendaremos el mejor tape para tu
            situación.
          </p>
          <button onClick={onStart} className="quiz-start-button">
            Comenzar
          </button>
        </div>
      </div>
    );
  }

  // Quiz questions
  return (
    <div className="quiz-container">
      <div className="quiz-progress">
        <div className="quiz-progress-bar">
          <div
            className="quiz-progress-fill"
            style={{width: `${((step + 1) / totalSteps) * 100}%`}}
          />
        </div>
        <span className="quiz-progress-text">
          {step + 1} / {totalSteps}
        </span>
      </div>

      <QuizQuestion
        question={currentQuestion}
        answers={answers}
        onAnswer={onAnswer}
      />

      {step > 0 && (
        <button onClick={onBack} className="quiz-back-button">
          Volver
        </button>
      )}
    </div>
  );
}
