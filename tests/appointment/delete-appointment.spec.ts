import { test } from '@playwright/test';
import { AppointmentPage } from '../../pages/appointment/AppointmentPage';
import { Navigation } from '../../utils/navigation';

test('Delete Appointment Flow', async ({ page }) => {

  const appointmentPage = new AppointmentPage(page);

  await Navigation.goToAppointments(page);

  await appointmentPage.deleteAppointment();

});