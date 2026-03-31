import { Page, Locator, expect } from '@playwright/test';

export class PrescriptionPage {

  readonly page: Page;

  readonly medicineBtn: Locator;
  readonly medicationInput: Locator;
  readonly formInput: Locator;
  readonly dosageInput: Locator;
  readonly quantityInput: Locator;
  readonly daysInput: Locator;
  readonly frequencyInput: Locator;
  readonly remarksInput: Locator;
  readonly nextStepBtn: Locator;

  constructor(page: Page) {

    this.page = page;

    this.medicineBtn = page.getByRole('button', { name: /Medicine/i });

    this.medicationInput = page.locator('input[placeholder="Medications"]');
    this.formInput = page.locator('input[placeholder="Form"]');
    this.dosageInput = page.locator('input[placeholder="Dosage"]');
    this.quantityInput = page.locator('input[placeholder="Quantity"]');
    this.daysInput = page.locator('input[placeholder="Days"]');
    this.frequencyInput = page.locator('input[placeholder="Frequency"]');
    this.remarksInput = page.locator('input[placeholder="Remarks"]');

    this.nextStepBtn = page.getByRole('button', { name: /Next Step/i });
  }

  async verifyPageLoaded() {
    await expect(
      this.page.getByRole('heading', { name: /Prescribe Medicine/i })
    ).toBeVisible();
  }

  async addMedicine() {

    await this.medicineBtn.click();

    await this.medicationInput.click();
    await this.page.getByRole('option', { name: 'ASPIRIN' }).click();

    await this.formInput.click();
    await this.page.getByRole('option', { name: 'CAPSULE' }).click();

    await this.dosageInput.click();
    await this.page.getByRole('option', { name: '200MG' }).click();

    await this.quantityInput.click();

await this.page
  .getByRole('option', { name: '2', exact: true })
  .click();

    await this.daysInput.click();
    await this.page.getByRole('option', { name: '2 DAYS' }).click();

    await this.frequencyInput.click();
    await this.page.getByRole('option', { name: '1-0-0-1 / MORNING/NIGHT' }).click();

    await this.remarksInput.click();
    await this.page.getByRole('option', { name: 'AFTER BRUSHING' }).click();
  }

  async goToNextStep() {
    await this.nextStepBtn.click();
  }
}