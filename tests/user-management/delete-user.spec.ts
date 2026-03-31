import { test } from "@playwright/test";
import { UserManagementPage } from "../../pages/user-management/UserManagementPage";

test("Delete User", async ({ page }) => {

  const userPage = new UserManagementPage(page);

  await userPage.openUserManagement();

  // capture first user username before deleting
  const username = await page
    .locator("table tbody tr td:nth-child(2)")
    .first()
    .textContent();

  await userPage.deleteFirstUser();

  await page.waitForLoadState("networkidle");

  await userPage.verifyUserDeleted(username!);

});