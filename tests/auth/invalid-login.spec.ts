import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/auth/LoginPage";

test("login-invalid-password", async ({ browser }) => {

  const context = await browser.newContext({ storageState: undefined });
  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login("smile", "admin", "wrongpassword");

  await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();

});