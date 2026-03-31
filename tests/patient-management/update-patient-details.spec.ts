import { test, expect } from "@playwright/test";
import { PatientDashboardPage } from "../../pages/patient-management/PatientDashboardPage";
import { DataFactory } from "../../utils/dataFactory";
import { Navigation } from "../../utils/navigation";

test.describe("Update Patient Details", () => {

  test("should update patient age and card number successfully", async ({ page }) => {

    // ✅ Navigation abstraction
    await Navigation.goToPatients(page);

    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();

    const row = rows.first();

    await Promise.all([
      page.waitForURL(/patient/),
      row.click()
    ]);

    const dashboard = new PatientDashboardPage(page);

    await dashboard.verifyDashboardLoaded();

    // 🔥 Dynamic test data
    const newAge = DataFactory.generateAge();
    const newCardNumber = DataFactory.generateCardNumber();

    console.log("Updating with:", { newAge, newCardNumber });

    await dashboard.openEditForm();

    await dashboard.updatePatientDetails(newAge, newCardNumber);

    await dashboard.verifyPatientDetails({
      age: newAge,
      cardNumber: newCardNumber
    });

  });

});