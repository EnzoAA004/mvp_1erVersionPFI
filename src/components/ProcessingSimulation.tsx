import { useEffect, useState } from "react";
import { processingSteps } from "../data/mockData";

interface ProcessingSimulationProps {
  onDone: () => void;
}

export function ProcessingSimulation({ onDone }: ProcessingSimulationProps) {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setCompleted(0);
    const timer = window.setInterval(() => {
      setCompleted((current) => {
        if (current >= processingSteps.length) {
          window.clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, 550);
    return () => window.clearInterval(timer);
  }, []);

  const progress = Math.round((completed / processingSteps.length) * 100);

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <h2>Procesamiento simulado</h2>
          <p className="muted">La secuencia representa el comportamiento esperado. No se ejecuta IA real.</p>
        </div>
        <span className="status-pill">{progress}%</span>
      </div>
      <div className="progress-track"><div style={{ width: `${progress}%` }} /></div>
      <div className="processing-list">
        {processingSteps.map((step, index) => (
          <div className={`process-item ${index < completed ? "done" : ""}`} key={step}>
            <span>{index < completed ? "✓" : index + 1}</span>
            <p>{step}</p>
          </div>
        ))}
      </div>
      <button className="primary-button" disabled={completed < processingSteps.length} onClick={onDone} type="button">
        Ver resultados simulados
      </button>
    </section>
  );
}
