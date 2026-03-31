import { test } from "@playwright/test";
import { Navigation } from "../../utils/navigation";
import { AppointmentPage } from "../../pages/appointment/AppointmentPage";

test("Create Appointment - Later Checkbox Flow", async ({ page }) => {

  await Navigation.goToAppointments(page);

  const appointment = new AppointmentPage(page);

  await appointment.clickAddIcon();

  await appointment.selectPatientFromDropdown();

  await appointment.openCaseIdDropdown();
  await appointment.selectCaseId();

  await appointment.selectRandomDateTime();

  await appointment.openDoctorDropdown();
  await appointment.selectDoctor();

  await appointment.openColourDropdown();
  await appointment.selectColour();

  await appointment.openChairDropdown();
  await appointment.selectChair();

  // ✅ KEY STEP
  await appointment.selectLaterCheckbox();

  // ❌ SKIP Mode of Payment
  // ❌ SKIP Consultation Fees

  await appointment.saveAppointment();
});