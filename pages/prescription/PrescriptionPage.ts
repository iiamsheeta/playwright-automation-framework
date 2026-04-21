import { Page, Locator, expect } from "@playwright/test";

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

    this.medicineBtn = page.getByRole("button", { name: /Add Medicine/i });

    const row = page.locator("table tbody tr").first();
    const overlay = this.page.locator(".cdk-overlay-pane").last();

    this.medicationInput = row.getByRole("combobox").nth(0);
    this.formInput = row.getByRole("combobox").nth(1);
    this.dosageInput = row.getByRole("combobox").nth(2);
    this.quantityInput = row.getByRole("combobox").nth(3);
    this.daysInput = row.getByRole("combobox").nth(4);
    this.frequencyInput = row.getByRole("combobox").nth(5);
    this.remarksInput = row.getByRole("combobox").nth(6);

    this.nextStepBtn = page.getByRole("button", { name: /Next Step/i });
  }

  async verifyPageLoaded() {
    await expect(
      this.page.getByRole("heading", { name: /Prescribe Medicine/i }),
    ).toBeVisible();
  }
  async selectRandomOption(field: Locator): Promise<string> {
    // Step 1: Open dropdown
    await field.click();

    // Step 2: Wait for overlay
    const overlay = this.page.locator(".cdk-overlay-pane").last();
    await expect(overlay).toBeVisible();

    // Step 3: Get all options
    const options = overlay.locator("mat-option");

    const count = await options.count();
    expect(count).toBeGreaterThan(0);

    // Step 4: Pick random index
    const randomIndex = Math.floor(Math.random() * count);

    const selectedOption = options.nth(randomIndex);

    // Step 5: Get text (optional but useful)
    const text = await selectedOption.innerText();

    // Step 6: Click option
    await selectedOption.click();

    console.log(`✅ Selected Random Option: ${text}`);

    return text.trim();
  }
  async selectFromDropdown(field: Locator, value: string) {
    // Step 1: Click field
    await expect(field).toBeVisible();
    await expect(field).toBeEnabled();
    await field.click();

    // Step 2: Wait for overlay
    const overlay = this.page.locator(".cdk-overlay-pane").last();
    await expect(overlay).toBeVisible();

    // Step 3: Click option inside overlay
    const option = overlay.getByRole("option", {
      name: new RegExp(value, "i"),
    });

    await expect(option).toBeVisible();
    await option.click();
  }

  async addMedicine() {
  await this.medicineBtn.click();

  // Wait for comboboxes globally (not from row)
  const fields = this.page.getByRole('combobox');

  await expect(fields.first()).toBeVisible();

  const medicationInput = fields.nth(0);
  const formInput = fields.nth(1);
  const dosageInput = fields.nth(2);
  const quantityInput = fields.nth(3);
  const daysInput = fields.nth(4);
  const frequencyInput = fields.nth(5);
  const remarksInput = fields.nth(6);

  await this.selectRandomOption(medicationInput);
  await this.selectRandomOption(formInput);
  await this.selectRandomOption(dosageInput);
  await this.selectRandomOption(quantityInput);
  await this.selectRandomOption(daysInput);
  await this.selectRandomOption(frequencyInput);
  await this.selectRandomOption(remarksInput);
}

  async goToNextStep() {
    await this.nextStepBtn.click();
  }
}
