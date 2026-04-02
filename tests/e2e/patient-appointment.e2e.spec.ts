import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/auth/LoginPage';
import { PatientPage, Patient } from '../../pages/patient/PatientPage';
import { AppointmentPage } from '../../pages/appointment/AppointmentPage';
import { DataFactory } from '../../utils/dataFactory';
import { ProvisionalDiagnosisPage } from '../../pages/provisional diagnosis/ProvisionalDiagnosisPage';
import { TreatmentPlanPage } from '../../pages/treatment-plan/TreatmentPlanPage';
import { PrescriptionPage } from '../../pages/prescription/PrescriptionPage';
import { SignaturePage } from '../../pages/signature/SignaturePage';
import { BillingPage } from '../../pages/billing/BillingPage';

test('Create Patient Appointment Flow', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const patientPage = new PatientPage(page);
  const appointmentPage = new AppointmentPage(page);
  const diagnosisPage = new ProvisionalDiagnosisPage(page);
  const treatmentPlanPage = new TreatmentPlanPage(page);
  const prescriptionPage = new PrescriptionPage(page);
  const signaturePage = new SignaturePage(page);
  const billingPage = new BillingPage(page);

  const patient: Patient = DataFactory.buildPatient();

  // Navigate
  await loginPage.navigate();

  // Login
  await loginPage.login(
    DataFactory.loginData.tenant,
    DataFactory.loginData.username,
    DataFactory.loginData.password
  );

  // Patient module
  await patientPage.navigateToPatientModule();

  // Create patient
  await patientPage.createPatient(patient);

  await patientPage.verifyPatientCreated(patient.email);

  // Appointment
  await appointmentPage.openCreateAppointment();

  await appointmentPage.fillAppointmentForm();

  await appointmentPage.saveAppointment();

  await expect(page.getByRole('alert'))
    .toContainText('Appointment created successfully');

  // Diagnosis
  await appointmentPage.openProvisionalDiagnosisFlow();

  await diagnosisPage.verifyPageLoaded();

  await diagnosisPage.fillDiagnosisForm();

  await diagnosisPage.selectDentalChart();

  await diagnosisPage.selectTooth('55');

  await diagnosisPage.selectClinicalFinding();

  await diagnosisPage.addComment();

  await diagnosisPage.goToNextStep();

  // Treatment
  await treatmentPlanPage.goToMedicineStep();

  // Prescription
  await prescriptionPage.addMedicine();

  await prescriptionPage.goToNextStep();

  // Signature
  await signaturePage.verifyPageLoaded();

  await signaturePage.openSignaturePad();

  await signaturePage.drawSignature();

  await signaturePage.submitSignature();

  await signaturePage.saveDiagnosis();

  await expect(page.getByRole('alert'))
    .toContainText('Provisional Diagnosis Data had been Stored');

  await page.waitForURL(/prescription/);

  // Billing
  await billingPage.navigateToBilling();

  await billingPage.verifyBillingPageLoaded();

  await billingPage.createBilling();

  await billingPage.completePayment();
});