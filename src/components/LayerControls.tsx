import type { LayerState } from "../types";

interface LayerControlsProps {
  layers: LayerState;
  onChange: (layers: LayerState) => void;
}

const labels: Record<keyof LayerState, string> = {
  vertebrae: "Ver vértebras",
  discs: "Ver discos",
  canal: "Ver canal espinal",
  measurements: "Ver mediciones",
  labels: "Ver etiquetas anatómicas",
};

export function LayerControls({ layers, onChange }: LayerControlsProps) {
  return (
    <div className="panel compact">
      <h3>Capas</h3>
      <div className="toggle-list">
        {(Object.keys(layers) as (keyof LayerState)[]).map((key) => (
          <label className="toggle-row" key={key}>
            <input
              checked={layers[key]}
              onChange={(event) => onChange({ ...layers, [key]: event.target.checked })}
              type="checkbox"
            />
            <span>{labels[key]}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
