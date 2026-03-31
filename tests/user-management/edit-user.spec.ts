import { test } from "@playwright/test";
import { UserManagementPage } from "../../pages/user-management/UserManagementPage";
import { Navigation } from "../../utils/navigation";

test("Edit User Phone Number", async ({ page }) => {

  const userPage = new UserManagementPage(page);

  const newPhone = "9998887776";

  await Navigation.goToUserManagement(page);

  // Step 1: Filter Doctor users
  await userPage.filterDoctorStatus();

  // Step 2: Open action menu
  await userPage.openUserActionMenu();

  // Step 3: Click Edit User
  await userPage.clickEditUser();

  // Step 4: Update phone
  await userPage.updatePhoneNumber(newPhone);

  // Step 5: Click Update
  await userPage.clickUpdate();

  // Step 6: Verify update
  await userPage.verifyPhoneUpdated(newPhone);

});