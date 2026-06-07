import type { ReviewState } from "../types";

interface ReviewPanelProps {
  checklist: Record<string, boolean>;
  observations: string;
  reviewState: ReviewState;
  onChecklistChange: (checklist: Record<string, boolean>) => void;
  onObservationsChange: (value: string) => void;
  onReviewStateChange: (state: ReviewState) => void;
}

const items = [
  "Segmentación anatómicamente plausible",
  "Mediciones útiles como apoyo",
  "Visualización clara",
  "Preinforme comprensible",
  "Requiere correcciones",
];

export function ReviewPanel({
  checklist,
  observations,
  reviewState,
  onChecklistChange,
  onObservationsChange,
  onReviewStateChange,
}: ReviewPanelProps) {
  return (
    <section className="content-grid two">
      <div className="panel">
        <h2>Checklist de revisión profesional</h2>
        <div className="toggle-list">
          {items.map((item) => (
            <label className="toggle-row" key={item}>
              <input
                checked={Boolean(checklist[item])}
                onChange={(event) => onChecklistChange({ ...checklist, [item]: event.target.checked })}
                type="checkbox"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <label className="field">
          Observaciones libres
          <textarea
            value={observations}
            onChange={(event) => onObservationsChange(event.target.value)}
            placeholder="Registrar observaciones del profesional..."
          />
        </label>
      </div>
      <div className="panel">
        <h2>Estado final de revisión</h2>
        <p className="muted">El profesional conserva el control de aceptación, corrección o descarte.</p>
        <div className="review-state">{reviewState}</div>
        <div className="button-stack">
          <button className="primary-button" onClick={() => onReviewStateChange("Revisado")} type="button">Aceptar resultados</button>
          <button onClick={() => onReviewStateChange("Requiere ajustes")} type="button">Solicitar corrección</button>
          <button onClick={() => onReviewStateChange("Requiere ajustes")} type="button">Marcar como no confiable</button>
        </div>
      </div>
    </section>
  );
}
