import type { AnatomicalStructure } from "../types";

interface StructureListProps {
  structures: AnatomicalStructure[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function StructureList({ structures, selectedId, onSelect }: StructureListProps) {
  return (
    <div className="panel compact">
      <h3>Estructuras detectadas</h3>
      <div className="structure-list">
        {structures.map((structure) => (
          <button
            className={`structure-item ${selectedId === structure.id ? "selected" : ""}`}
            key={structure.id}
            onClick={() => onSelect(structure.id)}
            type="button"
          >
            <span>
              <strong>{structure.label}</strong>
              <small>{structure.type === "vertebra" ? "Vértebra" : structure.type === "disc" ? "Disco" : "Canal"}</small>
            </span>
            <span className={`confidence ${structure.confidence.toLowerCase()}`}>{structure.confidence}</span>
            {structure.note && <em>{structure.note}</em>}
          </button>
        ))}
      </div>
    </div>
  );
}
