import type { Measurement, MeasurementState } from "../types";

interface MeasurementsPanelProps {
  measurements: Measurement[];
  onChange: (measurements: Measurement[]) => void;
  onSelect: (id: string) => void;
}

export function MeasurementsPanel({ measurements, onChange, onSelect }: MeasurementsPanelProps) {
  const setState = (id: string, state: MeasurementState) => {
    onChange(measurements.map((measurement) => measurement.id === id ? { ...measurement, state } : measurement));
  };

  const setValue = (id: string, value: number) => {
    onChange(measurements.map((measurement) => measurement.id === id ? { ...measurement, value } : measurement));
  };

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <h2>Mediciones cuantitativas simuladas</h2>
          <p className="muted">Mediciones geométricas de apoyo. No constituyen conclusiones diagnósticas.</p>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Estructura</th>
              <th>Medición</th>
              <th>Valor automático</th>
              <th>Unidad</th>
              <th>Confianza</th>
              <th>Estado de revisión</th>
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
                  <button onClick={() => setState(measurement.id, "Aceptada")} type="button">Aceptar</button>
                  <button onClick={() => setState(measurement.id, "Revisar")} type="button">Revisar</button>
                  <button onClick={() => setState(measurement.id, "Descartada")} type="button">Descartar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
