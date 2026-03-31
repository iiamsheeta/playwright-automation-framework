import { test } from '@playwright/test';
import { LoginPage } from '../../pages/auth/LoginPage';
import { DataFactory } from '../../utils/dataFactory';

test('User should login successfully', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login(
    DataFactory.loginData.tenant,
    DataFactory.loginData.username,
    DataFactory.loginData.password
  );

  await loginPage.verifyLoginSuccess();

});