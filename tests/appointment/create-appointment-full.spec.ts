import { test, expect } from "@playwright/test";
import { Navigation } from "../../utils/navigation";
import {
  AppointmentPage,
  PaymentType,
} from "../../pages/appointment/AppointmentPage";

test.describe("📅 Appointment Tests", () => {

  const flows: PaymentType[] = ["FULL", "LATER", "NA", "NEW_CASE"];

  for (const type of flows) {

    test(`Create Appointment - ${type}`, async ({ page }) => {

      await Navigation.goToAppointments(page);

      const appointment = new AppointmentPage(page);

      await appointment.clickAddIcon();   // ✅ FIXED
      await appointment.createAppointmentFlow(type);

      await expect(
        page.getByText(/appointment created successfully/i)
      ).toBeVisible();

    });

  }

});