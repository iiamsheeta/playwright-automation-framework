import { Page, Locator, expect } from '@playwright/test';

export class TreatmentPlanPage {

  readonly page: Page;
  readonly heading: Locator;
  readonly nextStepButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading', {
      name: /Treatment Plan/i
    });

    // target the Next Step button inside Treatment Planning tabpanel
    this.nextStepButton = page
      .getByRole('tabpanel', { name: /Treatment Planning/i })
      .getByRole('button', { name: 'Next Step' });
  }

  async verifyPageLoaded() {
    await expect(this.heading).toBeVisible();
  }

  async goToMedicineStep() {
    await this.nextStepButton.click();
  }
}