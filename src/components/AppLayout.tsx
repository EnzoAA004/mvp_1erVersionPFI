import type { ReactNode } from "react";
import type { StepId } from "../types";
import { StepNavigation, steps } from "./StepNavigation";

interface AppLayoutProps {
  activeStep: StepId;
  onStepChange: (step: StepId) => void;
  children: ReactNode;
}

export function AppLayout({ activeStep, onStepChange, children }: AppLayoutProps) {
  const active = steps.find((step) => step.id === activeStep);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">LA</div>
          <div>
            <strong>Lumbar Assist MVP</strong>
            <span>Validación académica simulada</span>
          </div>
        </div>
        <StepNavigation activeStep={activeStep} onStepChange={onStepChange} />
      </aside>
      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Herramienta asistiva simulada</p>
            <h1>{active?.title ?? "Lumbar Assist MVP"}</h1>
          </div>
          <div className="status-pill">No apta para uso clínico</div>
        </header>
        {children}
      </main>
    </div>
  );
}
