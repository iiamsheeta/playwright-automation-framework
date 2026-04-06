import { Page, Locator, expect } from '@playwright/test';

export class BillingPage {

  readonly page: Page;

  // Buttons
  readonly addBillBtn: Locator;
  readonly nextBtn: Locator;
  readonly submitBtn: Locator;

  // Bill Details
  readonly patientCaseField: Locator;
  readonly appointmentDateField: Locator;
  readonly treatmentNameField: Locator;
  readonly amountField: Locator;

  // Payment Step
  readonly discountField: Locator;
  readonly amountPaidField: Locator;
  readonly paymentModeField: Locator;
  readonly amountAfterDiscount: Locator;

  // Billing Table
  readonly firstBillRow: Locator;
  readonly actionButton: Locator;
  readonly downloadBillOption: Locator;

  constructor(page: Page) {

    this.page = page;

    // Buttons

    this.addBillBtn = page.locator('mat-icon:has-text("add_circle_outline")');

    this.nextBtn = page
      .locator('mat-dialog-container')
      .getByRole('button', { name: 'Next' })
      .first();

    this.submitBtn = page.getByRole('button', { name: /Submit/i });

    // Bill Details

    this.patientCaseField = page.locator('input[formcontrolname="patientName"]');

    this.appointmentDateField = page.locator('input[formcontrolname="appointmentDate"]');

    this.treatmentNameField = page.getByPlaceholder('Enter Treatment Name');

    this.amountField = page.getByPlaceholder('Enter Amount');

   
    // Payment Step

    this.discountField = page.locator('input[formcontrolname="discount"]');

    this.amountAfterDiscount = page
      .getByRole('tabpanel', { name: 'Payment' })
      .locator('.values-column .grid-item')
      .nth(1);

    this.amountPaidField = page.getByRole('textbox', {
      name: 'Amount Paid by Patient'
    });

    this.paymentModeField = page.locator(
      'mat-select[formcontrolname="modeOfPayment"]'
    );


    // Billing Table

    this.firstBillRow = page.locator('table tbody tr').first();

    this.actionButton =
      this.firstBillRow.locator('button').last();

    this.downloadBillOption =
      page.getByRole('menuitem').filter({ hasText: 'Download' });
  }

  
  // Navigation

 async navigateToBilling() {

  await this.page.goto('/user/billing');

  await this.page.waitForLoadState('networkidle');

}

  async verifyBillingPageLoaded() {

  await expect(
    this.page.locator('app-billing')
  ).toBeVisible();

}

 
  // Create Billing

  async createBilling() {

    await this.addBillBtn.click();

    // open autosuggestion
    await this.patientCaseField.click();

    const options = this.page.locator('mat-option');

    await expect(options.first()).toBeVisible();

    // select latest case
    await options.first().click();

    // appointment date
    await this.appointmentDateField.click();
    await this.page.locator('mat-option').first().click();

    // treatment
    await this.treatmentNameField.fill('Treatment');

    // amount
    await this.amountField.fill('100');

    await this.nextBtn.click();
  }

  
  // Payment Steps

  async goToPaymentStep() {

    const nextBtn = this.page
      .getByRole('tabpanel', { name: 'Additional Charges' })
      .getByRole('button', { name: 'Next' });

    await nextBtn.click();
  }

  async completePayment() {

    await this.goToPaymentStep();

    await this.discountField.fill('0');

    // wait for calculated amount
    await expect(this.amountAfterDiscount).toHaveText(/\d+/);

    const amount =
      (await this.amountAfterDiscount.textContent())?.trim() ?? '0';

    await this.amountPaidField.fill(amount);

    await this.paymentModeField.click();

    await this.page.getByRole('option', { name: 'CASH' }).click();

    await this.submitBtn.click();

    await this.page.waitForLoadState('networkidle');
  }

  // Download Invoice

  async downloadBillingInvoice() {

    await expect(this.firstBillRow).toBeVisible();

    await this.actionButton.click();

    await this.page.locator('[role="menu"]').waitFor();

    const downloadPromise = this.page.waitForEvent('download');

    await this.downloadBillOption.click();

    const download = await downloadPromise;

    const fileName = download.suggestedFilename();

    const filePath = `downloads/${fileName}`;

    await download.saveAs(filePath);

    console.log(`Invoice downloaded: ${filePath}`);
  }
}