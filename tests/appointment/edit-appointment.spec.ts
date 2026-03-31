import { test } from '@playwright/test';

import { PatientPage } from '../../pages/patient/PatientPage';
import { AppointmentPage } from '../../pages/appointment/AppointmentPage';
import { Navigation } from '../../utils/navigation';
import { DataFactory } from '../../utils/dataFactory';

test('Edit Appointment Flow', async ({ page }) => {

  const patientPage = new PatientPage(page);
  const appointmentPage = new AppointmentPage(page);

  const patient = DataFactory.buildPatient();

  // 1️⃣ Go to Patient Module
  await Navigation.goToPatients(page);

  // 2️⃣ Create Patient
  await patientPage.createPatient(patient);

  await patientPage.verifyPatientCreated(patient.email);

  // 3️⃣ Create Appointment
  await appointmentPage.openCreateAppointment();

  await appointmentPage.fillAppointmentForm();

  await appointmentPage.saveAppointment();

  // 4️⃣ Navigate to Appointment List
  await Navigation.goToAppointments(page);

  // 5️⃣ Edit Appointment
  await appointmentPage.openEditAppointment();

  await appointmentPage.changeAppointmentDateToNextDay();

  await appointmentPage.updateAppointment();

});