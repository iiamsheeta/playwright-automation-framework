import { test, expect } from "@playwright/test";
import { AppointmentPage } from "../../pages/appointment/AppointmentPage";
import { ProvisionalDiagnosisPage } from "../../pages/provisional diagnosis/ProvisionalDiagnosisPage";
import { TreatmentPlanPage } from "../../pages/treatment-plan/TreatmentPlanPage";
import { PrescriptionPage } from "../../pages/prescription/PrescriptionPage";
import { SignaturePage } from "../../pages/signature/SignaturePage";

test("should skip treatment planning and complete flow", async ({ page }) => {
  const appointmentPage = new AppointmentPage(page);
  const diagnosisPage = new ProvisionalDiagnosisPage(page);
  const treatmentPage = new TreatmentPlanPage(page);
  const prescriptionPage = new PrescriptionPage(page);
  const signaturePage = new SignaturePage(page);

  // ✅ Go to Appointment
  await page.goto("/user/appointment");

  // ✅ Open Diagnosis
  await appointmentPage.openProvisionalDiagnosisFlow();

  // ✅ Diagnosis
  await diagnosisPage.verifyPageLoaded();
  await diagnosisPage.fillForm();
  await diagnosisPage.selectToothAndFinding("55");
  await diagnosisPage.addComment();

  await diagnosisPage.goToNextStep();
  await treatmentPage.verifyPageLoaded();

  // ✅ Just click next (no validation, no input)
  await treatmentPage.goToNextStep();

  // Continue flow
  await prescriptionPage.verifyPageLoaded();
  await prescriptionPage.addMedicine();
  await prescriptionPage.goToNextStep();

  await signaturePage.verifyPageLoaded();
  await signaturePage.openSignaturePad();
  await signaturePage.drawSignature();
  await signaturePage.submitSignature();
  await signaturePage.saveDiagnosis();
});
