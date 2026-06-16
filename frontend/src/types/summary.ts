export interface Summary {
  patient_information: string;
  medical_history: string;
  clinical_findings: string;
  recommendations: string;
}

export interface SummaryResponse {
  success: boolean;
  summary: Summary | null;
  error: string | null;
}