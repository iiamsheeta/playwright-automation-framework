import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/auth/LoginPage';
import { DataFactory } from '../../utils/dataFactory';

test('login setup', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.navigate();

  await loginPage.login(
    DataFactory.loginData.tenant,
    DataFactory.loginData.username,
    DataFactory.loginData.password
  );

  // Wait for redirect after login
  await page.waitForURL('**/user/**');

  // Verify dashboard loaded
  await expect(
    page.getByRole('heading', { name: 'Business Insights' })
  ).toBeVisible();

  // Save authenticated session
  await page.context().storageState({ path: 'storageState.json' });

});