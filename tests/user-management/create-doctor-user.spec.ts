import { test } from "@playwright/test";
import { UserManagementPage } from "../../pages/user-management/UserManagementPage";
import { DataFactory } from "../../utils/dataFactory";
import { Navigation } from "../../utils/navigation";

test("create-doctor-user", async ({ page }) => {
  
  const userPage = new UserManagementPage(page);
  const user = DataFactory.generateDoctorUser();

  await Navigation.goToUserManagement(page);

  await userPage.openAddUserDialog();

  await userPage.selectSalutation("DR.");

  await userPage.fillUserDetails(user);

  await userPage.specialistInput.fill("Dentist"); 

  await userPage.licenseInput.fill(user.license); // ✅ required

  await userPage.fillAge(28);

  await userPage.fillSecurity();

  await userPage.selectGender();

  await userPage.fillAddress(user.address);

  await userPage.selectRole("Doctor");

  await userPage.saveUser();

  await userPage.verifyUserCreated(user.username);
});
