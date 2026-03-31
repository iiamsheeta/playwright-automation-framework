import { test } from '@playwright/test';

import { Navigation } from '../../utils/navigation';
import { AppointmentPage } from '../../pages/appointment/AppointmentPage';
import { ProvisionalDiagnosisPage } from '../../pages/provisional diagnosis/ProvisionalDiagnosisPage';
import { TreatmentPlanPage } from '../../pages/treatment-plan/TreatmentPlanPage';
import { PrescriptionPage } from '../../pages/prescription/PrescriptionPage';
import { SignaturePage } from '../../pages/signature/SignaturePage';

test('Complete Clinical Workflow', async ({ page }) => {

  const appointmentPage = new AppointmentPage(page);
  const diagnosisPage = new ProvisionalDiagnosisPage(page);
  const treatmentPage = new TreatmentPlanPage(page);
  const prescriptionPage = new PrescriptionPage(page);
  const signaturePage = new SignaturePage(page);

  // Navigate to appointments
  await Navigation.goToAppointments(page);

  // Open Provisional Diagnosis
  await appointmentPage.openProvisionalDiagnosisFlow();

  // =========================
  // PROVISIONAL DIAGNOSIS
  // =========================

  await diagnosisPage.verifyPageLoaded();

  await diagnosisPage.fillDiagnosisForm();

  await diagnosisPage.selectDentalChart();

  await diagnosisPage.selectTooth('17');

  await diagnosisPage.selectClinicalFinding();

  await diagnosisPage.addComment();

  await diagnosisPage.goToNextStep();

  // =========================
  // TREATMENT PLAN
  // =========================

  await treatmentPage.verifyPageLoaded();

  await treatmentPage.goToMedicineStep();

  // =========================
  // PRESCRIPTION
  // =========================

  await prescriptionPage.verifyPageLoaded();

  await prescriptionPage.addMedicine();

  await prescriptionPage.goToNextStep();

  // =========================
  // SIGNATURE
  // =========================

  await signaturePage.verifyPageLoaded();

  await signaturePage.openSignaturePad();

  await signaturePage.drawSignature();

  await signaturePage.submitSignature();

  await signaturePage.saveDiagnosis();

});