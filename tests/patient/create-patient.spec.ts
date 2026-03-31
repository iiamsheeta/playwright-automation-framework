import { test } from '@playwright/test';
import { PatientPage } from '../../pages/patient/PatientPage';
import { DataFactory } from '../../utils/dataFactory';
import { Navigation } from '../../utils/navigation';

test('Create Patient Flow', async ({ page }) => {

  const patientPage = new PatientPage(page);
  const patient = DataFactory.buildPatient();

  await Navigation.goToPatients(page);

  await patientPage.openCreatePatientDialog();

  await patientPage.createPatient(patient);

  await patientPage.verifyPatientCreated(patient.email);

});