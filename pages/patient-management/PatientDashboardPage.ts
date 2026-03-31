import { Page, Locator, expect } from "@playwright/test";

export class PatientDashboardPage {

  readonly page: Page;

  readonly pageTitle: Locator;
  readonly patientName: Locator;
  readonly patientId: Locator;

  readonly labels: Locator;
  readonly values: Locator;

  readonly editButton: Locator;
  readonly ageInput: Locator;
  readonly cardNumberInput: Locator;
  readonly updateButton: Locator;

  // ✅ Cached label mapping
  private labelMap: Map<string, Locator> = new Map();

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.getByRole("heading", { name: "Patient Dashboard" });

    this.patientName = page.getByText("Name:")
      .locator("xpath=following-sibling::*[1]");

    this.patientId = page.getByText("Patient ID:")
      .locator("xpath=following-sibling::*[1]");

    const section = page.locator("app-personal-details");

    this.labels = section.locator(".headings-column .grid-item.heading");
    this.values = section.locator(".values-column .grid-item.value");

    this.editButton = page.locator('mat-icon:has-text("edit")');

    this.ageInput = page.locator('input[formcontrolname="age"]');
    this.cardNumberInput = page.locator('input[formcontrolname="cardNumber"]');

    this.updateButton = page.getByRole("button", { name: "Update" });
  }

  async verifyDashboardLoaded() {
    await expect(this.pageTitle).toBeVisible();

    // ✅ Ensure grid is loaded
    await expect(this.labels.first()).toBeVisible();
  }

  // 🔥 Build label map once
  private async buildLabelMap() {
    const count = await this.labels.count();

    for (let i = 0; i < count; i++) {
      const label = (await this.labels.nth(i).innerText()).trim();
      this.labelMap.set(label, this.values.nth(i));
    }
  }

  async getValueByLabel(label: string): Promise<Locator> {

    if (this.labelMap.size === 0) {
      await this.buildLabelMap();
    }

    const locator = this.labelMap.get(label);

    if (!locator) {
      throw new Error(`Label "${label}" not found`);
    }

    return locator;
  }

  async openEditForm() {
    await this.editButton.click();
    await expect(this.ageInput).toBeVisible();
  }

  async updatePatientDetails(age: string, cardNumber: string) {

    await this.ageInput.fill(age);
    await this.ageInput.press("Tab");

    await this.cardNumberInput.fill(cardNumber);
    await this.cardNumberInput.press("Tab");

    await expect(this.cardNumberInput).toHaveValue(cardNumber);

    await this.updateButton.click();

    // ✅ Wait for modal close
    await expect(this.ageInput).toBeHidden();

    // ✅ Validate UI update
    await expect(await this.getValueByLabel("Age:"))
      .toContainText(age);
  }

  async verifyPatientDetails(expected: {
    name?: string;
    id?: string;
    age?: string;
    cardNumber?: string;
  }) {

    if (expected.name)
      await expect(this.patientName).toContainText(expected.name);

    if (expected.id)
      await expect(this.patientId).toContainText(expected.id);

    if (expected.age)
      await expect(await this.getValueByLabel("Age:"))
        .toContainText(expected.age);

    if (expected.cardNumber)
      await expect(await this.getValueByLabel("Card Number:"))
        .toContainText(expected.cardNumber);
  }
}