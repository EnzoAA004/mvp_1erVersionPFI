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
  const checkedCount = items.filter((item) => checklist[item]).length;

  return (
    <section className="content-grid two">
      <div className="panel">
        <p className="eyebrow">Human-in-the-loop</p>
        <h2>Revisión profesional</h2>
        <p className="muted">
          Esta pantalla valida si el médico considera claro el punto de intervención humana antes de aceptar resultados o avanzar al preinforme.
        </p>
        <div className="metric-strip">
          <div className="metric-card"><strong>{checkedCount}/{items.length}</strong><span>criterios marcados</span></div>
          <div className="metric-card"><strong>{reviewState}</strong><span>estado actual</span></div>
          <div className="metric-card"><strong>Manual</strong><span>decisión final</span></div>
        </div>
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
      </div>

      <div className="panel">
        <p className="eyebrow">Cierre de revisión</p>
        <h2>Observaciones y decisión</h2>
        <p className="muted">El profesional puede dejar observaciones libres y definir si el resultado simulado sería aceptable, corregible o no confiable.</p>
        <label className="field">
          Observaciones libres
          <textarea
            value={observations}
            onChange={(event) => onObservationsChange(event.target.value)}
            placeholder="Registrar observaciones del profesional..."
          />
        </label>
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
