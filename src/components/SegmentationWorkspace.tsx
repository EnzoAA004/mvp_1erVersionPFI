import type { AnatomicalStructure, LayerState } from "../types";
import { LayerControls } from "./LayerControls";
import { Lumbar3DViewer } from "./Lumbar3DViewer";
import { MRIViewer2D } from "./MRIViewer2D";
import { StructureList } from "./StructureList";

interface SegmentationWorkspaceProps {
  layers: LayerState;
  onLayerChange: (layers: LayerState) => void;
  structures: AnatomicalStructure[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function SegmentationWorkspace(props: SegmentationWorkspaceProps) {
  return (
    <section className="workspace-grid">
      <div className="viewer-stack">
        <MRIViewer2D {...props} />
        <Lumbar3DViewer {...props} />
      </div>
      <aside className="right-rail">
        <LayerControls layers={props.layers} onChange={props.onLayerChange} />
        <StructureList structures={props.structures} selectedId={props.selectedId} onSelect={props.onSelect} />
      </aside>
    </section>
  );
}
