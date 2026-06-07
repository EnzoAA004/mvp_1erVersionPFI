import type { Study } from "../types";

interface StudyUploadProps {
  study: Study;
  onProcess: () => void;
}

export function StudyUpload({ study, onProcess }: StudyUploadProps) {
  return (
    <section className="content-grid two">
      <div className="panel">
        <h2>Carga de estudio</h2>
        <p className="muted">
          No se requiere un archivo real. El prototipo utiliza un estudio anonimizado ficticio para simular el flujo.
        </p>
        <div className="drop-zone">
          <span className="drop-icon">+</span>
          <strong>Cargar estudio</strong>
          <p>{study.fileName}</p>
        </div>
        <button className="primary-button" onClick={onProcess} type="button">
          Procesar estudio
        </button>
      </div>
      <div className="panel">
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
