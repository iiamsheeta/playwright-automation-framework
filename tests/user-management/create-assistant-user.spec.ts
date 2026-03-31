import { test } from "@playwright/test";
import { UserManagementPage } from "../../pages/user-management/UserManagementPage";
import { DataFactory } from "../../utils/dataFactory";
import { Navigation } from "../../utils/navigation";

test("Create Assistant User", async ({ page }) => {

  const userPage = new UserManagementPage(page);

  const user = DataFactory.generateAssistantUser();

  await Navigation.goToUserManagement(page);

  await userPage.openAddUserDialog();

  await userPage.selectSalutation("MR.");

await userPage.fillUserDetails(user);

await userPage.fillAge(Number(DataFactory.generateAge()));

await userPage.fillSecurity();

await userPage.selectGender();

await userPage.fillAddress(user.address);

await userPage.selectRole("Doctor Assistant");

await userPage.saveUser();

await userPage.verifyUserCreated(user.username);

});