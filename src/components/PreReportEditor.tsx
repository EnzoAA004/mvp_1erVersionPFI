import type { Measurement, ReviewState, Study } from "../types";

interface PreReportEditorProps {
  study: Study;
  measurements: Measurement[];
  observations: string;
  reviewState: ReviewState;
  reportText: string;
  onReportChange: (value: string) => void;
}

export function buildReport(study: Study, measurements: Measurement[], observations: string, reviewState: ReviewState) {
  const lowConfidence = measurements.filter((measurement) => measurement.confidence === "Baja");
  const accepted = measurements.filter((measurement) => measurement.state !== "Descartada");

  return [
    "PREINFORME ESTRUCTURADO SIMULADO",
    "",
    `Estudio: ${study.fileName}`,
    `Modalidad: ${study.modality}`,
    `Región: ${study.region}`,
    `Plano: ${study.plane}`,
    `Secuencia: ${study.sequence}`,
    "Estado: anonimizado",
    "",
    "Aclaración de uso:",
    "Se identificaron automáticamente estructuras lumbares en plano sagital. Las segmentaciones y mediciones fueron generadas por el sistema de forma simulada y requieren revisión profesional. Las mediciones cuantitativas se presentan como apoyo geométrico y no constituyen diagnóstico automático.",
    "",
    "Estructuras segmentadas:",
    "- Vértebras: L1, L2, L3, L4, L5.",
    "- Discos intervertebrales: L1-L2, L2-L3, L3-L4, L4-L5, L5-S1.",
    "- Canal espinal: representación segmentada simulada.",
    "",
    "Mediciones geométricas simuladas:",
    ...accepted.map((measurement) => `- ${measurement.structure}: ${measurement.name}: ${measurement.value} ${measurement.unit}. Confianza: ${measurement.confidence}. Estado: ${measurement.state}.`),
    "",
    "Advertencias de baja confianza:",
    ...(lowConfidence.length
      ? lowConfidence.map((measurement) => `- ${measurement.structure}: requiere revisión profesional antes de su utilización.`)
      : ["- No se registran advertencias de baja confianza en las mediciones activas."]),
    "",
    "Observaciones del profesional:",
    observations || "- Sin observaciones registradas.",
    "",
    `Estado de revisión: ${reviewState}.`,
    "",
    "Este preinforme es editable y forma parte de un prototipo académico simulado. No es apto para uso clínico.",
  ].join("\n");
}

export function PreReportEditor({
  study,
  measurements,
  observations,
  reviewState,
  reportText,
  onReportChange,
}: PreReportEditorProps) {
  const copyReport = async () => {
    await navigator.clipboard.writeText(reportText);
  };

  const resetReport = () => {
    onReportChange(buildReport(study, measurements, observations, reviewState));
  };

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <h2>Preinforme editable</h2>
          <p className="muted">Salida estructurada no diagnóstica generada a partir de datos simulados.</p>
        </div>
        <div className="button-row">
          <button onClick={resetReport} type="button">Editar preinforme</button>
          <button className="primary-button" onClick={copyReport} type="button">Copiar texto</button>
        </div>
      </div>
      <textarea
        className="report-editor"
        value={reportText}
        onChange={(event) => onReportChange(event.target.value)}
        aria-label="Preinforme editable"
      />
    </section>
  );
}
