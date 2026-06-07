import type { Study } from "../types";

interface StudyUploadProps {
  study: Study;
  onProcess: () => void;
}

export function StudyUpload({ study, onProcess }: StudyUploadProps) {
  return (
    <section className="content-grid two">
      <div className="panel">
        <p className="eyebrow">Entrada del sistema</p>
        <h2>Carga de estudio simulado</h2>
        <p className="muted">
          Para entrevistas no se necesita cargar un archivo real. La demo utiliza un caso ficticio para mostrar cómo sería el ingreso de una RM lumbar anonimizada.
        </p>
        <div className="drop-zone">
          <span className="drop-icon">+</span>
          <strong>{study.fileName}</strong>
          <p>Arrastrar estudio o usar caso simulado</p>
        </div>
        <button className="primary-button" onClick={onProcess} type="button">
          Procesar estudio simulado
        </button>
      </div>
      <div className="panel">
        <p className="eyebrow">Ficha del caso</p>
        <h2>Metadatos ficticios</h2>
        <dl className="metadata">
          <div><dt>ID</dt><dd>{study.id}</dd></div>
          <div><dt>Modalidad</dt><dd>{study.modality}</dd></div>
          <div><dt>Región</dt><dd>{study.region}</dd></div>
          <div><dt>Plano</dt><dd>{study.plane}</dd></div>
          <div><dt>Secuencia</dt><dd>{study.sequence}</dd></div>
          <div><dt>Estado</dt><dd>Anonimizado: {study.anonymized}</dd></div>
        </dl>
      </div>
    </section>
  );
}
