import { feedbackQuestions, openQuestions } from "../data/mockData";
import type { FeedbackResponses } from "../types";

interface FeedbackFormProps {
  feedback: FeedbackResponses;
  onChange: (feedback: FeedbackResponses) => void;
}

export function FeedbackForm({ feedback, onChange }: FeedbackFormProps) {
  const setRating = (question: string, value: number) => {
    onChange({ ...feedback, ratings: { ...feedback.ratings, [question]: value } });
  };

  const setOpen = (question: string, value: string) => {
    onChange({ ...feedback, open: { ...feedback.open, [question]: value } });
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(feedback, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "feedback_lumbar_assist_simulado.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="content-grid two">
      <div className="panel">
        <h2>Preguntas con escala 1 a 5</h2>
        <p className="muted">1 = muy en desacuerdo, 5 = muy de acuerdo.</p>
        <div className="rating-list">
          {feedbackQuestions.map((question) => (
            <label className="rating-row" key={question}>
              <span>{question}</span>
              <input
                min="1"
                max="5"
                type="range"
                value={feedback.ratings[question]}
                onChange={(event) => setRating(question, Number(event.target.value))}
              />
              <strong>{feedback.ratings[question]}</strong>
            </label>
          ))}
        </div>
      </div>
      <div className="panel">
        <h2>Preguntas abiertas</h2>
        <div className="open-list">
          {openQuestions.map((question) => (
            <label className="field" key={question}>
              {question}
              <textarea
                value={feedback.open[question]}
                onChange={(event) => setOpen(question, event.target.value)}
                placeholder="Respuesta del profesional..."
              />
            </label>
          ))}
        </div>
        <button className="primary-button" onClick={exportJson} type="button">Exportar respuestas como JSON</button>
      </div>
    </section>
  );
}
