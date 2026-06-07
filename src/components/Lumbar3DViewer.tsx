import type { AnatomicalStructure, LayerState } from "../types";

interface Lumbar3DViewerProps {
  layers: LayerState;
  structures: AnatomicalStructure[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const vertebrae3d = [
  { id: "l1", y: 42, label: "L1" },
  { id: "l2", y: 98, label: "L2" },
  { id: "l3", y: 154, label: "L3" },
  { id: "l4", y: 210, label: "L4" },
  { id: "l5", y: 266, label: "L5" },
];

const discs3d = [
  { id: "d-l1-l2", y: 83, label: "L1-L2" },
  { id: "d-l2-l3", y: 139, label: "L2-L3" },
  { id: "d-l3-l4", y: 195, label: "L3-L4" },
  { id: "d-l4-l5", y: 251, label: "L4-L5" },
  { id: "d-l5-s1", y: 307, label: "L5-S1" },
];

export function Lumbar3DViewer({ layers, structures, selectedId, onSelect }: Lumbar3DViewerProps) {
  const selected = structures.find((structure) => structure.id === selectedId);

  return (
    <div className="panel viewer-panel">
      <div className="section-heading">
        <div>
          <h2>Visualización 3D simplificada</h2>
          <p className="muted">Representación conceptual preparada para reemplazarse por un modelo 3D real.</p>
        </div>
        {selected && <span className="status-pill">Selección: {selected.label}</span>}
      </div>
      <svg className="lumbar-3d" viewBox="0 0 520 360" role="img" aria-label="Modelo 3D simplificado de columna lumbar">
        <defs>
          <linearGradient id="vertebra3d" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#9cc2d3" />
            <stop offset="45%" stopColor="#e1eef3" />
            <stop offset="100%" stopColor="#6d9caf" />
          </linearGradient>
          <linearGradient id="disc3d" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#d0a35f" />
            <stop offset="60%" stopColor="#f1d08f" />
            <stop offset="100%" stopColor="#af7d3c" />
          </linearGradient>
        </defs>
        <rect width="520" height="360" rx="16" fill="#0b161d" />
        {layers.canal && (
          <g onClick={() => onSelect("canal")} className="clickable-region">
            <path
              className={`tube ${selectedId === "canal" ? "selected-mask" : ""}`}
              d="M318 34 C352 98 344 224 318 326"
              fill="none"
              strokeWidth="24"
            />
            {layers.labels && <text className="label-3d" x="365" y="175">Canal</text>}
          </g>
        )}
        {layers.vertebrae && vertebrae3d.map((item) => (
          <g key={item.id} className="clickable-region" onClick={() => onSelect(item.id)}>
            <path
              className={`vertebra-3d ${selectedId === item.id ? "selected-mask" : ""}`}
              d={`M170 ${item.y} C210 ${item.y - 20} 270 ${item.y - 18} 304 ${item.y} L286 ${item.y + 30} C246 ${item.y + 44} 196 ${item.y + 42} 156 ${item.y + 28} Z`}
            />
            <ellipse cx="232" cy={item.y + 13} rx="72" ry="24" fill="none" stroke="#ffffff" opacity=".18" />
            {layers.labels && <text className="label-3d" x="118" y={item.y + 17}>{item.label}</text>}
          </g>
        ))}
        {layers.discs && discs3d.map((item) => (
          <g key={item.id} className="clickable-region" onClick={() => onSelect(item.id)}>
            <ellipse
              className={`disc-3d ${selectedId === item.id ? "selected-mask" : ""}`}
              cx="232"
              cy={item.y}
              rx="70"
              ry="16"
            />
            {layers.labels && <text className="label-3d small-label" x="328" y={item.y + 5}>{item.label}</text>}
          </g>
        ))}
        {layers.measurements && (
          <g className="measure-lines">
            <line x1="305" y1="251" x2="355" y2="251" />
            <text x="365" y="256">altura discal</text>
          </g>
        )}
      </svg>
    </div>
  );
}
