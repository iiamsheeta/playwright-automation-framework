import { PatientDashboardPage } from "../../pages/patient-management/PatientDashboardPage";
import { AppointmentPage } from "../../pages/appointment/AppointmentPage";
import { test, expect } from "@playwright/test";
import { Navigation } from "../../utils/navigation";

test(`Create Appointment from Dashboard`, async ({ page }) => {

  // Navigate to patient dashboard
  await Navigation.goToPatientDashboard(page);

  const dashboard = new PatientDashboardPage(page);
  const appointment = new AppointmentPage(page);

  await dashboard.verifyDashboardLoaded();

  // 🔥 New Step
  await dashboard.clickCreateAppointment();

  // Now appointment form opens
  await appointment.createAppointmentFlow("FULL");

  await expect(
    page.getByText(/appointment created successfully/i)
  ).toBeVisible();
});