import { test, expect } from '@playwright/test';
import { BillingPage } from '../../pages/billing/BillingPage';

test('Create Billing and Download Invoice', async ({ page }) => {

  const billingPage = new BillingPage(page);

  await billingPage.navigateToBilling();

  await billingPage.verifyBillingPageLoaded();

  await billingPage.createBilling();

  await billingPage.completePayment();

  await billingPage.downloadBillingInvoice();

});