import { test,expect } from "@playwright/test";
import { PatientDashboardPage } from "../../pages/patient-management/PatientDashboardPage";
import { Navigation } from "../../utils/navigation";

test.describe("Patient Dashboard Module", () => {

  test("verify patient data from list matches dashboard", async ({ page }) => {

    await Navigation.goToPatients(page);

    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();

    const row = rows.first();

    const patientData = {
      id: (await row.locator("td").nth(0).innerText()).trim(),
      name: (await row.locator("td").nth(2).innerText()).trim(),
      age: (await row.locator("td").nth(5).innerText()).trim(),
    };

    await Promise.all([
      page.waitForURL(/patient/),
      row.click()
    ]);

    const dashboard = new PatientDashboardPage(page);

    await dashboard.verifyDashboardLoaded();

    await dashboard.verifyPatientDetails(patientData);
  });

});