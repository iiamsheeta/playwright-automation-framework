import { test } from "@playwright/test";
import { AppointmentPage } from "../../pages/appointment/AppointmentPage";
import { ProvisionalDiagnosisPage } from "../../pages/provisional diagnosis/ProvisionalDiagnosisPage";
import { TreatmentPlanPage } from "../../pages/treatment-plan/TreatmentPlanPage";
import { PrescriptionPage } from "../../pages/prescription/PrescriptionPage";
import { SignaturePage } from "../../pages/signature/SignaturePage";

test.describe("Full Diagnosis → Treatment → Prescription Flow", () => {
  test("should complete full patient flow", async ({ page }) => {
    const appointmentPage = new AppointmentPage(page);
    const diagnosisPage = new ProvisionalDiagnosisPage(page);
    const treatmentPage = new TreatmentPlanPage(page);

    // ✅ Step 1: Go to Appointment page
    await page.goto("/user/appointment");

    // ✅ Step 2: Open Provisional Diagnosis
    await appointmentPage.openProvisionalDiagnosisFlow();

    // ✅ Step 3: Diagnosis Page Actions
    await diagnosisPage.verifyPageLoaded();
    await diagnosisPage.fillForm();
    await diagnosisPage.selectToothAndFinding("55");
    await diagnosisPage.addComment();

    // ✅ Navigate to Treatment Planning
    await diagnosisPage.goToNextStep();

    // ===============================
    // 🔥 NEW CONTINUATION STARTS HERE
    // ===============================

    // ✅ Step 4: Treatment Planning Page
    await treatmentPage.verifyPageLoaded();

    await treatmentPage.clickAddTreatmentStep();

    await treatmentPage.selectProcedure(); // Scaling

    await treatmentPage.enterPrice("800");

    await treatmentPage.selectDate(); // today/future

    await treatmentPage.clickAddSpecialist();

    await treatmentPage.selectSpecialist("dhruv Kumar");

    await treatmentPage.enterSpecialistAmount("20");

    // ✅ Move to Prescription page
    await treatmentPage.goToNextStep();

    const prescriptionPage = new PrescriptionPage(page);

    await prescriptionPage.verifyPageLoaded();

    await prescriptionPage.addMedicine();

    await prescriptionPage.goToNextStep();

    const signaturePage = new SignaturePage(page);

    // ✅ Verify navigation
    await signaturePage.verifyPageLoaded();

    // ✅ Open signature modal
    await signaturePage.openSignaturePad();

    // ✅ Draw signature
    await signaturePage.drawSignature();

    // ✅ Submit signature
    await signaturePage.submitSignature();

    // ✅ Save diagnosis
    await signaturePage.saveDiagnosis();
  });
});
