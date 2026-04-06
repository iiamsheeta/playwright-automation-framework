import { test } from "@playwright/test";
import { Navigation } from "../../utils/navigation";
import { AppointmentPage } from "../../pages/appointment/AppointmentPage";

test("Create Appointment - Sidebar Flow", async ({ page }) => {

  await Navigation.goToAppointments(page);

  const appointment = new AppointmentPage(page);

  await appointment.clickAddIcon();

  await appointment.selectPatientFromDropdown();

  await appointment.openCaseIdDropdown();
  await appointment.selectCaseId();

  const dateTime = await appointment.selectRandomDateTime();

  await appointment.openDoctorDropdown();
  await appointment.selectDoctor();

  await appointment.openColourDropdown();
  await appointment.selectColour();

  //  NEW PART
  await appointment.openChairDropdown();
  await appointment.selectChair();

  await appointment.openModeOfPaymentDropdown();
  await appointment.selectModeOfPayment();

  await appointment.fillConsultationFees();

  await appointment.saveAppointment();
});