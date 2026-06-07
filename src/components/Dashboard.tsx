import type { StepId } from "../types";

interface DashboardProps {
  onStart: (step: StepId) => void;
}

export function Dashboard({ onStart }: DashboardProps) {
  return (
    <section className="panel intro-panel">
      <div className="intro-copy">
        <p className="eyebrow">RM Lumbar Assist</p>
        <h2>Prototipo simulado para análisis asistido de RM lumbar sagital</h2>
        <p>
          Esta aplicación permite recorrer un flujo futuro de segmentación, mediciones,
          revisión profesional y generación de preinforme editable con datos ficticios.
        </p>
        <div className="warning-banner">Demo simulada para validación de flujo. No apta para uso clínico.</div>
        <button className="primary-button" onClick={() => onStart("upload")} type="button">
          Iniciar análisis simulado
        </button>
      </div>
      <div className="flow-card">
        <h3>Flujo de validación</h3>
        <ol className="flow-list">
          <li>Cargar estudio simulado</li>
          <li>Procesar con pasos mockeados</li>
          <li>Visualizar segmentaciones</li>
          <li>Revisar mediciones</li>
          <li>Generar preinforme editable</li>
        </ol>
      </div>
    </section>
  );
}
