import type { AnatomicalStructure, LayerState } from "../types";

interface MRIViewer2DProps {
  layers: LayerState;
  structures: AnatomicalStructure[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const vertebrae = [
  { id: "l1", x: 168, y: 45, w: 86, h: 46, label: "L1" },
  { id: "l2", x: 158, y: 105, w: 92, h: 48, label: "L2" },
  { id: "l3", x: 150, y: 168, w: 96, h: 50, label: "L3" },
  { id: "l4", x: 145, y: 235, w: 96, h: 52, label: "L4" },
  { id: "l5", x: 150, y: 304, w: 88, h: 50, label: "L5" },
];

const discs = [
  { id: "d-l1-l2", x: 170, y: 92, w: 76, h: 20, label: "L1-L2" },
  { id: "d-l2-l3", x: 161, y: 154, w: 78, h: 20, label: "L2-L3" },
  { id: "d-l3-l4", x: 154, y: 220, w: 78, h: 20, label: "L3-L4" },
  { id: "d-l4-l5", x: 152, y: 288, w: 74, h: 18, label: "L4-L5" },
  { id: "d-l5-s1", x: 156, y: 356, w: 68, h: 18, label: "L5-S1" },
];

export function MRIViewer2D({ layers, structures, selectedId, onSelect }: MRIViewer2DProps) {
  const selected = structures.find((structure) => structure.id === selectedId);

  return (
    <div className="panel viewer-panel">
      <div className="section-heading">
        <div>
          <h2>Visor 2D sagital</h2>
          <p className="muted">Imagen placeholder radiológica con máscaras artificiales. Datos simulados.</p>
        </div>
        {selected && <span className={`confidence ${selected.confidence.toLowerCase()}`}>{selected.label}: {selected.confidence}</span>}
      </div>
      {selected?.confidence === "Baja" && (
        <div className="warning-banner small">Requiere revisión profesional</div>
      )}
      <svg className="mri-svg" viewBox="0 0 420 430" role="img" aria-label="Representación esquemática de RM lumbar sagital">
        <defs>
          <radialGradient id="mriGlow" cx="45%" cy="44%" r="65%">
            <stop offset="0%" stopColor="#51606b" />
            <stop offset="55%" stopColor="#1d2830" />
            <stop offset="100%" stopColor="#071015" />
          </radialGradient>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>
        <rect width="420" height="430" rx="18" fill="url(#mriGlow)" />
        <path d="M260 34 C318 86 320 176 291 246 C270 298 272 356 302 410" stroke="#31424d" strokeWidth="42" fill="none" opacity=".5" filter="url(#softBlur)" />
        <path d="M120 30 C92 82 93 144 112 198 C139 276 130 345 96 408" stroke="#21313a" strokeWidth="36" fill="none" opacity=".45" filter="url(#softBlur)" />
        <path d="M246 40 C224 120 221 228 246 392" stroke="#d3dbe0" strokeWidth="12" fill="none" opacity=".25" />

        {layers.canal && (
          <path
            className={`mask canal ${selectedId === "canal" ? "selected-mask" : ""}`}
            d="M275 32 C252 112 249 236 274 397"
            fill="none"
            strokeWidth="22"
            onClick={() => onSelect("canal")}
          />
        )}

        {layers.vertebrae && vertebrae.map((item) => (
          <g key={item.id} onClick={() => onSelect(item.id)} className="clickable-region">
            <rect
              className={`mask vertebra ${selectedId === item.id ? "selected-mask" : ""}`}
              x={item.x}
              y={item.y}
              width={item.w}
              height={item.h}
              rx="15"
            />
            {layers.labels && <text x={item.x + item.w / 2} y={item.y + item.h / 2 + 5}>{item.label}</text>}
          </g>
        ))}

        {layers.discs && discs.map((item) => (
          <g key={item.id} onClick={() => onSelect(item.id)} className="clickable-region">
            <ellipse
              className={`mask disc ${selectedId === item.id ? "selected-mask" : ""}`}
              cx={item.x + item.w / 2}
              cy={item.y + item.h / 2}
              rx={item.w / 2}
              ry={item.h / 2}
            />
            {layers.labels && <text x={item.x + item.w + 20} y={item.y + item.h / 2 + 5}>{item.label}</text>}
          </g>
        ))}

        {layers.measurements && (
          <g className="measure-lines">
            <line x1="152" y1="288" x2="226" y2="288" />
            <text x="235" y="292">7.2 mm</text>
            <line x1="275" y1="274" x2="275" y2="314" />
            <text x="292" y="299">12.4 mm</text>
          </g>
        )}
      </svg>
    </div>
  );
}
