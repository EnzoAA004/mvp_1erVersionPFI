export type StepId =
  | "dashboard"
  | "upload"
  | "processing"
  | "segmentation"
  | "measurements"
  | "review"
  | "report"
  | "feedback";

export type Confidence = "Alta" | "Media" | "Baja";

export type StructureType = "vertebra" | "disc" | "canal";

export type ReviewState = "Pendiente" | "Revisado" | "Requiere ajustes";

export type MeasurementState = "Pendiente" | "Aceptada" | "Revisar" | "Descartada";

export interface Study {
  id: string;
  fileName: string;
  modality: string;
  region: string;
  plane: string;
  sequence: string;
  anonymized: string;
}

export interface AnatomicalStructure {
  id: string;
  label: string;
  type: StructureType;
  confidence: Confidence;
  note?: string;
}

export interface Measurement {
  id: string;
  structureId: string;
  structure: string;
  name: string;
  value: number;
  unit: string;
  confidence: Confidence;
  state: MeasurementState;
}

export interface LayerState {
  vertebrae: boolean;
  discs: boolean;
  canal: boolean;
  measurements: boolean;
  labels: boolean;
}

export interface FeedbackResponses {
  ratings: Record<string, number>;
  open: Record<string, string>;
}
