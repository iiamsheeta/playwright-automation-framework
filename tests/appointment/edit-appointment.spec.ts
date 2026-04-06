import { test } from '@playwright/test';

import { PatientPage } from '../../pages/patient/PatientPage';
import { AppointmentPage } from '../../pages/appointment/AppointmentPage';
import { Navigation } from '../../utils/navigation';
import { DataFactory } from '../../utils/dataFactory';

test('Edit Appointment Flow', async ({ page }) => {

  const patientPage = new PatientPage(page);
  const appointmentPage = new AppointmentPage(page);

  const patient = DataFactory.buildPatient();

  //  Go to Patient Module
  await Navigation.goToPatients(page);

  //  Create Patient
  await patientPage.createPatient(patient);

  await patientPage.verifyPatientCreated(patient.email);

  //  Create Appointment
  await appointmentPage.openCreateAppointment();

  await appointmentPage.fillAppointmentForm();

  await appointmentPage.saveAppointment();

  //  Navigate to Appointment List
  await Navigation.goToAppointments(page);

  //  Edit Appointment
  await appointmentPage.openEditAppointment();

  await appointmentPage.changeAppointmentDateToNextDay();

  await appointmentPage.updateAppointment();

});