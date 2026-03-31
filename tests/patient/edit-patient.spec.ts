import { test } from '@playwright/test';
import { PatientPage } from '../../pages/patient/PatientPage';
import { Navigation } from '../../utils/navigation';
import { DataFactory } from '../../utils/dataFactory';

test('Edit Patient Flow', async ({ page }) => {

  const patientPage = new PatientPage(page);

  const patient = DataFactory.buildPatient();

  await Navigation.goToPatients(page);

  await patientPage.createPatient(patient);

  await patientPage.editPatient(patient.email, '45');

});