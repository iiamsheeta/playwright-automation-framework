import { test } from "@playwright/test";
import { Navigation } from "../../utils/navigation";
import { AppointmentPage } from "../../pages/appointment/AppointmentPage";

test("Create Appointment - New Case Flow", async ({ page }) => {

  await Navigation.goToAppointments(page);

  const appointment = new AppointmentPage(page);

  await appointment.clickAddIcon();

  // ✅ Select New Case
  await appointment.selectNewCaseCheckbox();

  // 🔥 Continue full flow
  await appointment.selectPatientFromDropdown();

  await appointment.selectRandomDateTime();

  await appointment.openDoctorDropdown();
  await appointment.selectDoctor();

  await appointment.openColourDropdown();
  await appointment.selectColour();

  await appointment.openChairDropdown();
  await appointment.selectChair();

  // ✅ REQUIRED FOR NEW CASE FLOW
  await appointment.openModeOfPaymentDropdown();
  await appointment.selectModeOfPayment();

  await appointment.fillConsultationFees();

  await appointment.saveAppointment();
});