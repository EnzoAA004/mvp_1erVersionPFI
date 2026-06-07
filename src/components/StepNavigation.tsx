import type { StepId } from "../types";

export const steps: { id: StepId; title: string; short: string }[] = [
  { id: "dashboard", title: "Dashboard", short: "Inicio" },
  { id: "upload", title: "Carga de estudio", short: "Carga" },
  { id: "processing", title: "Procesamiento simulado", short: "Procesamiento" },
  { id: "segmentation", title: "Segmentación y visualización", short: "Segmentación" },
  { id: "measurements", title: "Mediciones cuantitativas", short: "Mediciones" },
  { id: "review", title: "Revisión profesional", short: "Revisión" },
  { id: "report", title: "Preinforme editable", short: "Preinforme" },
  { id: "feedback", title: "Feedback User Research", short: "Feedback" },
];

interface StepNavigationProps {
  activeStep: StepId;
  onStepChange: (step: StepId) => void;
}

export function StepNavigation({ activeStep, onStepChange }: StepNavigationProps) {
  return (
    <nav className="step-nav" aria-label="Flujo del prototipo">
      {steps.map((step, index) => (
        <button
          key={step.id}
          className={`step-button ${activeStep === step.id ? "active" : ""}`}
          onClick={() => onStepChange(step.id)}
          type="button"
        >
          <span className="step-index">{index + 1}</span>
          <span>{step.short}</span>
        </button>
      ))}
    </nav>
  );
}
