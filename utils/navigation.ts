import { Page, expect } from "@playwright/test";

export class Navigation {

  static async goToPatients(page: Page) {
    await page.goto("/user/patient-management");

    // ✅ Ensure table is loaded
    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();

    // ✅ Extra safety
    await expect(page).toHaveURL(/patient-management/);
  }

  static async goToAppointments(page: Page) {
    await page.goto("/user/appointment");

    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();
  }

  static async goToBilling(page: Page) {
    await page.goto("/user/billing");

    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();
  }

  static async goToDiagnosis(page: Page) {
    await this.goToAppointments(page);

    // 👉 Add UI interaction if needed later
    // await page.getByRole("tab", { name: "Diagnosis" }).click();

    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();
  }

  static async goToUserManagement(page: Page) {
    await page.goto("/user/manage/list");

    const rows = page.locator("table tbody tr");
    await expect(rows.first()).toBeVisible();
  }
}