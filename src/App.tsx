import { useEffect, useState } from "react";
import { AppLayout } from "./components/AppLayout";
import { Dashboard } from "./components/Dashboard";
import { FeedbackForm } from "./components/FeedbackForm";
import { MeasurementsPanel } from "./components/MeasurementsPanel";
import { buildReport, PreReportEditor } from "./components/PreReportEditor";
import { ProcessingSimulation } from "./components/ProcessingSimulation";
import { ReviewPanel } from "./components/ReviewPanel";
import { SegmentationWorkspace } from "./components/SegmentationWorkspace";
import { StudyUpload } from "./components/StudyUpload";
import { anatomicalStructures, initialFeedback, initialMeasurements, study } from "./data/mockData";
import type { FeedbackResponses, LayerState, Measurement, ReviewState, StepId } from "./types";

const initialLayers: LayerState = {
  vertebrae: true,
  discs: true,
  canal: true,
  measurements: true,
  labels: true,
};

const initialChecklist = {
  "Segmentación anatómicamente plausible": false,
  "Mediciones útiles como apoyo": false,
  "Visualización clara": false,
  "Preinforme comprensible": false,
  "Requiere correcciones": false,
};

function App() {
  const [activeStep, setActiveStep] = useState<StepId>("dashboard");
  const [layers, setLayers] = useState<LayerState>(initialLayers);
  const [selectedStructure, setSelectedStructure] = useState("d-l4-l5");
  const [measurements, setMeasurements] = useState<Measurement[]>(initialMeasurements);
  const [checklist, setChecklist] = useState<Record<string, boolean>>(initialChecklist);
  const [observations, setObservations] = useState("");
  const [reviewState, setReviewState] = useState<ReviewState>("Pendiente");
  const [feedback, setFeedback] = useState<FeedbackResponses>(initialFeedback);
  const [reportText, setReportText] = useState(() => buildReport(study, initialMeasurements, "", "Pendiente"));

  useEffect(() => {
    setReportText((current) => {
      if (current.trim().length === 0 || current.includes("PREINFORME ESTRUCTURADO SIMULADO")) {
        return buildReport(study, measurements, observations, reviewState);
      }
      return current;
    });
  }, [measurements, observations, reviewState]);

  return (
    <AppLayout activeStep={activeStep} onStepChange={setActiveStep}>
      {activeStep === "dashboard" && <Dashboard onStart={setActiveStep} />}
      {activeStep === "upload" && <StudyUpload study={study} onProcess={() => setActiveStep("processing")} />}
      {activeStep === "processing" && <ProcessingSimulation onDone={() => setActiveStep("segmentation")} />}
      {activeStep === "segmentation" && (
        <SegmentationWorkspace
          layers={layers}
          onLayerChange={setLayers}
          structures={anatomicalStructures}
          selectedId={selectedStructure}
          onSelect={setSelectedStructure}
        />
      )}
      {activeStep === "measurements" && (
        <MeasurementsPanel
          measurements={measurements}
          onChange={setMeasurements}
          onSelect={(id) => {
            setSelectedStructure(id);
            setActiveStep("segmentation");
          }}
        />
      )}
      {activeStep === "review" && (
        <ReviewPanel
          checklist={checklist}
          observations={observations}
          reviewState={reviewState}
          onChecklistChange={setChecklist}
          onObservationsChange={setObservations}
          onReviewStateChange={setReviewState}
        />
      )}
      {activeStep === "report" && (
        <PreReportEditor
          study={study}
          measurements={measurements}
          observations={observations}
          reviewState={reviewState}
          reportText={reportText}
          onReportChange={setReportText}
        />
      )}
      {activeStep === "feedback" && <FeedbackForm feedback={feedback} onChange={setFeedback} />}
    </AppLayout>
  );
}

export default App;
