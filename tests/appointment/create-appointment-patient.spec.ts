import { test } from '@playwright/test';

import { PatientPage } from '../../pages/patient/PatientPage';
import { AppointmentPage } from '../../pages/appointment/AppointmentPage';
import { Navigation } from '../../utils/navigation';

test('Create Appointment via Patient Table (Old Flow)', async ({ page }) => {

  const patientPage = new PatientPage(page);
  const appointmentPage = new AppointmentPage(page);

  // Navigate directly to patient module (already logged in)
  await Navigation.goToPatients(page);

  // Open create appointment
  await appointmentPage.openCreateAppointment();

  // Fill appointment form
  await appointmentPage.fillAppointmentForm();

  // Save appointment
  await appointmentPage.saveAppointment();

  // Verify appointment page loaded
  await page.waitForURL(/appointment/);

});