import type { AnatomicalStructure, FeedbackResponses, Measurement, Study } from "../types";

export const study: Study = {
  id: "RM-2026-SIM-001",
  fileName: "RM_Lumbar_Sagital_001",
  modality: "RM",
  region: "Columna lumbar",
  plane: "Sagital",
  sequence: "T2",
  anonymized: "Sí",
};

export const anatomicalStructures: AnatomicalStructure[] = [
  { id: "l1", label: "L1", type: "vertebra", confidence: "Alta" },
  { id: "l2", label: "L2", type: "vertebra", confidence: "Alta" },
  { id: "l3", label: "L3", type: "vertebra", confidence: "Media" },
  { id: "l4", label: "L4", type: "vertebra", confidence: "Alta" },
  { id: "l5", label: "L5", type: "vertebra", confidence: "Media" },
  { id: "d-l1-l2", label: "Disco L1-L2", type: "disc", confidence: "Alta" },
  { id: "d-l2-l3", label: "Disco L2-L3", type: "disc", confidence: "Media" },
  { id: "d-l3-l4", label: "Disco L3-L4", type: "disc", confidence: "Alta" },
  {
    id: "d-l4-l5",
    label: "Disco L4-L5",
    type: "disc",
    confidence: "Baja",
    note: "Requiere revisión profesional",
  },
  { id: "d-l5-s1", label: "Disco L5-S1", type: "disc", confidence: "Media" },
  {
    id: "canal",
    label: "Canal espinal",
    type: "canal",
    confidence: "Baja",
    note: "Requiere revisión profesional",
  },
];

export const initialMeasurements: Measurement[] = [
  {
    id: "m1",
    structureId: "d-l4-l5",
    structure: "Disco L4-L5",
    name: "Altura estimada del disco",
    value: 7.2,
    unit: "mm",
    confidence: "Baja",
    state: "Pendiente",
  },
  {
    id: "m2",
    structureId: "d-l3-l4",
    structure: "Disco L3-L4",
    name: "Área proyectada del disco",
    value: 284,
    unit: "mm²",
    confidence: "Alta",
    state: "Pendiente",
  },
  {
    id: "m3",
    structureId: "canal",
    structure: "Canal espinal L4-L5",
    name: "Diámetro sagital estimado",
    value: 12.4,
    unit: "mm",
    confidence: "Baja",
    state: "Pendiente",
  },
  {
    id: "m4",
    structureId: "l3",
    structure: "Cuerpo vertebral L3",
    name: "Área proyectada del cuerpo vertebral",
    value: 910,
    unit: "mm²",
    confidence: "Media",
    state: "Pendiente",
  },
  {
    id: "m5",
    structureId: "d-l2-l3",
    structure: "Discos L2-L3 / L4-L5",
    name: "Relación de altura discal entre niveles",
    value: 1.18,
    unit: "ratio",
    confidence: "Media",
    state: "Pendiente",
  },
];

export const processingSteps = [
  "Normalización de imagen",
  "Detección de región lumbar",
  "Segmentación de vértebras",
  "Segmentación de discos intervertebrales",
  "Segmentación de canal espinal",
  "Cálculo de mediciones",
  "Generación de salida estructurada",
];

export const feedbackQuestions = [
  "¿El flujo propuesto representa una mejora potencial respecto del flujo actual?",
  "¿La segmentación automática sería útil como apoyo?",
  "¿Las mediciones automáticas serían útiles si son revisables?",
  "¿La visualización superpuesta facilita la revisión?",
  "¿El preinforme editable resulta claro?",
  "¿El rol del profesional queda adecuadamente preservado?",
  "¿Confiaría en una herramienta de este tipo si los resultados fueran trazables y corregibles?",
];

export const openQuestions = [
  "¿Qué parte del flujo le resultó más útil?",
  "¿Qué parte le generó mayor desconfianza?",
  "¿Qué información adicional necesitaría ver?",
  "¿Qué modificaría del prototipo?",
  "¿Qué funcionalidad considera indispensable para una primera versión real?",
];

export const initialFeedback: FeedbackResponses = {
  ratings: Object.fromEntries(feedbackQuestions.map((question) => [question, 3])),
  open: Object.fromEntries(openQuestions.map((question) => [question, ""])),
};
