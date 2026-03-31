import { test, expect } from "@playwright/test";
import { Navigation } from "../../utils/navigation";
import {
  AppointmentPage,
  PaymentType,
} from "../../pages/appointment/AppointmentPage";

const flows: PaymentType[] = ["FULL", "LATER", "NA", "NEW_CASE"];

flows.forEach((type) => {
  test(`✅ Create Appointment - ${type}`, async ({ page }) => {
    
    // ✅ Navigate
    await Navigation.goToAppointments(page);

    const appointment = new AppointmentPage(page);

    // ✅ Execute reusable flow (already handles NEW_CASE internally)
    await appointment.createAppointmentFlow(type);

    // ✅ Better validation (more stable than just text)
    await expect(page.getByRole("button", { name: "Save" })).not.toBeVisible();

    // OR if toast exists
    await expect(
  page.getByText(/appointment created successfully/i)
).toBeVisible();
  });
});