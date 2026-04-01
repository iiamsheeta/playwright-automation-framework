import { Page, expect } from "@playwright/test";

export class Navigation {

  // 🔹 Generic wait for table pages
  private static async waitForTable(page: Page) {
    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();
  }

  // 🔹 Patients List
  static async goToPatients(page: Page) {
    await page.goto("/user/patient-management");

    await this.waitForTable(page);
    await expect(page).toHaveURL(/patient-management/);
  }

  // 🔥 NEW: Patient Dashboard
  static async goToPatientDashboard(page: Page) {

  // Step 1: Go to patient list
  await this.goToPatients(page);

  // Step 2: Click first patient row
  const firstRow = page.locator("table tbody tr").first();
  await expect(firstRow).toBeVisible();

  await firstRow.click();

  // Step 3: Wait for dashboard (use reliable locator)
  await expect(
    page.locator("app-personal-details")
  ).toBeVisible();
}
  // 🔹 Appointments
  static async goToAppointments(page: Page) {
    await page.goto("/user/appointment");

    await this.waitForTable(page);
  }

  // 🔹 Billing
  static async goToBilling(page: Page) {
    await page.goto("/user/billing");

    await this.waitForTable(page);
  }

  // 🔹 Diagnosis
  static async goToDiagnosis(page: Page) {
    await this.goToAppointments(page);

    // Future UI interaction (tab switch)
    // await page.getByRole("tab", { name: "Diagnosis" }).click();

    await this.waitForTable(page);
  }

  // 🔹 User Management
  static async goToUserManagement(page: Page) {
    await page.goto("/user/manage/list");

    await this.waitForTable(page);
  }
}