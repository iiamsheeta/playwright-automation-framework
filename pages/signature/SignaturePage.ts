import { Page, Locator, expect } from '@playwright/test';

export class SignaturePage {

  readonly page: Page;

  readonly addSignatureBtn: Locator;
  readonly signatureCanvas: Locator;
  readonly submitSignatureBtn: Locator;
  readonly saveDiagnosisBtn: Locator;

  constructor(page: Page) {

    this.page = page;

    this.addSignatureBtn = page.getByText('Add Signature');

    this.signatureCanvas = page.locator('canvas');

    this.submitSignatureBtn = page.getByRole('button', {
      name: /Submit Signature/i
    });

    this.saveDiagnosisBtn = page.getByRole('button', {
      name: /Save Diagnosis/i
    });
  }

  async verifyPageLoaded() {
    await expect(this.addSignatureBtn).toBeVisible();
  }

  async openSignaturePad() {
    await this.addSignatureBtn.click();
  }

  async drawSignature() {

    const canvas = this.signatureCanvas;

    await expect(canvas).toBeVisible();

    const box = await canvas.boundingBox();

    if (!box) throw new Error('Canvas not found');

    const startX = box.x + 50;
    const startY = box.y + 50;

    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();

    await this.page.mouse.move(startX + 100, startY + 20);
    await this.page.mouse.move(startX + 200, startY + 60);
    await this.page.mouse.move(startX + 300, startY + 30);

    await this.page.mouse.up();
  }

  async submitSignature() {
    await this.submitSignatureBtn.click();
  }

  async saveDiagnosis() {
    await this.saveDiagnosisBtn.click();
  }

}