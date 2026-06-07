import type { StepId } from "../types";

interface DashboardProps {
  onStart: (step: StepId) => void;
}

export function Dashboard({ onStart }: DashboardProps) {
  return (
    <section className="panel intro-panel">
      <div className="intro-copy">
        <p className="eyebrow">Prototipo de validación de flujo</p>
        <h2>Entorno simulado para revisar una RM lumbar asistida</h2>
        <p>
          Esta demo muestra cómo podría verse el producto futuro: carga del estudio,
          segmentación visual, mediciones revisables, selección de estructuras,
          preinforme editable y registro de feedback profesional. Todos los datos son ficticios.
        </p>

        <div className="warning-banner">
          Demo académica simulada. No apta para uso clínico.
        </div>

        <div className="hero-actions">
          <button className="primary-button" onClick={() => onStart("upload")} type="button">
            Iniciar análisis simulado
          </button>
          <button className="ghost-button" onClick={() => onStart("segmentation")} type="button">
            Ver workstation simulada
          </button>
        </div>

        <div className="metric-strip" aria-label="Resumen del prototipo">
          <div className="metric-card">
            <strong>11</strong>
            <span>estructuras mockeadas</span>
          </div>
          <div className="metric-card">
            <strong>5</strong>
            <span>mediciones editables</span>
          </div>
          <div className="metric-card">
            <strong>7</strong>
            <span>pasos de validación</span>
          </div>
        </div>
      </div>

      <div className="flow-card">
        <p className="eyebrow">Flujo que ve el profesional</p>
        <h3>De la imagen al preinforme revisable</h3>
        <ol className="flow-list">
          <li>Cargar estudio lumbar anonimizado.</li>
          <li>Simular procesamiento y segmentación.</li>
          <li>Explorar máscaras 2D y vista conceptual 3D.</li>
          <li>Seleccionar vértebras, discos y canal espinal.</li>
          <li>Aceptar, editar o descartar mediciones.</li>
          <li>Completar revisión profesional.</li>
          <li>Generar preinforme editable.</li>
        </ol>
      </div>
    </section>
  );
}
