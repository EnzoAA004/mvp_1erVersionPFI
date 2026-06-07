import type { Measurement, MeasurementState } from "../types";

interface MeasurementsPanelProps {
  measurements: Measurement[];
  onChange: (measurements: Measurement[]) => void;
  onSelect: (id: string) => void;
}

const stateLabels: MeasurementState[] = ["Aceptada", "Revisar", "Descartada"];

export function MeasurementsPanel({ measurements, onChange, onSelect }: MeasurementsPanelProps) {
  const setState = (id: string, state: MeasurementState) => {
    onChange(measurements.map((measurement) => measurement.id === id ? { ...measurement, state } : measurement));
  };

  const setValue = (id: string, value: number) => {
    onChange(measurements.map((measurement) => measurement.id === id ? { ...measurement, value } : measurement));
  };

  const acceptedCount = measurements.filter((measurement) => measurement.state === "Aceptada").length;
  const reviewCount = measurements.filter((measurement) => measurement.state === "Revisar").length;
  const lowConfidenceCount = measurements.filter((measurement) => measurement.confidence === "Baja").length;

  return (
    <section className="content-grid">
      <div className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Cuantificación simulada</p>
            <h2>Mediciones revisables por el profesional</h2>
            <p className="muted">Los valores son geométricos y ficticios. La interfaz permite validar si aceptar, corregir o descartar mediciones sería útil en el flujo real.</p>
          </div>
        </div>
        <div className="metric-strip">
          <div className="metric-card"><strong>{measurements.length}</strong><span>mediciones generadas</span></div>
          <div className="metric-card"><strong>{acceptedCount}</strong><span>aceptadas</span></div>
          <div className="metric-card"><strong>{reviewCount + lowConfidenceCount}</strong><span>alertas de revisión</span></div>
        </div>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Estructura</th>
                <th>Medición</th>
                <th>Valor</th>
                <th>Unidad</th>
                <th>Confianza</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((measurement) => (
                <tr key={measurement.id}>
                  <td>
                    <button className="link-button" onClick={() => onSelect(measurement.structureId)} type="button">
                      {measurement.structure}
                    </button>
                  </td>
                  <td>{measurement.name}</td>
                  <td>
                    <input
                      className="value-input"
                      type="number"
                      value={measurement.value}
                      step="0.1"
                      onChange={(event) => setValue(measurement.id, Number(event.target.value))}
                      aria-label={`Editar ${measurement.name}`}
                    />
                  </td>
                  <td>{measurement.unit}</td>
                  <td><span className={`confidence ${measurement.confidence.toLowerCase()}`}>{measurement.confidence}</span></td>
                  <td>{measurement.state}</td>
                  <td className="action-cell">
                    {stateLabels.map((state) => (
                      <button key={state} onClick={() => setState(measurement.id, state)} type="button">
                        {state}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
