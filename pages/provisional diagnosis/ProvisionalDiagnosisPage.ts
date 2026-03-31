import { Page, Locator, expect } from '@playwright/test';

export class ProvisionalDiagnosisPage {

  readonly page: Page;

  readonly chiefComplaint: Locator;
  readonly extraOralFinding: Locator;
  readonly pastMedicalHistory: Locator;

  readonly dentalChartDropdown: Locator;
  readonly clinicalFindingsDropdown: Locator;

  readonly additionalComment: Locator;
  readonly tooth55: Locator;

  readonly nextStepButton: Locator;

  constructor(page: Page) {

    this.page = page;

    this.chiefComplaint = page.getByRole('textbox', { name: 'Chief Complaint' });

    this.extraOralFinding = page.getByRole('textbox', { name: 'Extraoral Finding' });

    this.pastMedicalHistory = page.getByRole('textbox', { name: 'Past Medical History' });

    this.dentalChartDropdown = page.getByRole('combobox', {
      name: /Select Dental Chart/i
    });

    this.clinicalFindingsDropdown = page.locator(
  'mat-select[formcontrolname="selectedProblem"]'
);

    this.additionalComment = page.getByRole('textbox', {
      name: 'Additional comment'
    });

    this.tooth55 = page.getByRole('img', { name: '55' });

    this.nextStepButton = page.getByRole('button', { name: 'Next Step' });

  }

  async verifyPageLoaded() {

    await expect(
      this.page.getByRole('heading', { name: 'Provisional Diagnosis' })
    ).toBeVisible();

  }

  async fillDiagnosisForm() {

    await this.chiefComplaint.fill('Patient has tooth pain');

    await this.extraOralFinding.fill('Swelling near gum');

    await this.pastMedicalHistory.fill('No major medical history');

  }

  async selectDentalChart() {

    await this.dentalChartDropdown.click();

    await this.page.getByRole('option').first().click();

  }

  async selectClinicalFinding() {

  await expect(this.clinicalFindingsDropdown).toBeEnabled();

  await this.clinicalFindingsDropdown.click();

  const option = this.page.locator('.cdk-overlay-pane mat-option').first();

  await option.click();

  // close dropdown safely
  await this.page.keyboard.press('Escape');

  await expect(this.page.locator('.cdk-overlay-backdrop:visible')).toHaveCount(0);

}

  async selectTooth(tooth: string) {
  await this.page.getByRole('img', { name: tooth }).click();
}

  async addComment() {

    await this.additionalComment.fill('Initial diagnosis recorded');

  }

  async goToNextStep() {

  // wait until no overlay is visible
  await this.page.locator('.cdk-overlay-backdrop:visible').waitFor({ state: 'hidden' });

  await this.nextStepButton.click();

}

}