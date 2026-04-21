import { Page, Locator, expect } from "@playwright/test";

export class TreatmentPlanPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly addTreatmentStepBtn: Locator;
  readonly nextStepButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page
      .getByRole("tabpanel", { name: /treatment planning/i })
      .getByRole("heading", { name: /treatment steps/i })
      .first();

    this.addTreatmentStepBtn = page
      .getByRole("tabpanel", { name: /treatment planning/i })
      .locator("button")
      .filter({ hasText: "Treatment Step" });

    this.nextStepButton = page
      .getByRole("tabpanel", { name: /treatment planning/i })
      .getByRole("button", { name: /next step/i });
  }

  // =========================
  // PAGE VALIDATION
  // =========================

  async verifyPageLoaded() {
    await expect(this.heading).toBeVisible();
  }

  // =========================
  // ADD STEP
  // =========================

  async clickAddTreatmentStep() {
    await expect(this.addTreatmentStepBtn).toBeVisible();
    await expect(this.addTreatmentStepBtn).toBeEnabled();
    await this.addTreatmentStepBtn.click();
  }

  async getFirstRow() {
    const table = this.page
      .getByRole("tabpanel", { name: /treatment planning/i })
      .locator("table")
      .first();

    const row = table.locator("tbody tr").first();

    await expect(row).toBeVisible();
    return row;
  }

  // =========================
  // TOOTH SELECTION (Autocomplete)
  // =========================

  async selectTooth(tooth: string = "55") {
    const row = await this.getFirstRow();

    const toothInput = row.getByRole("combobox", {
      name: /teeth/i,
    });

    await expect(toothInput).toBeVisible();
    await toothInput.click();

    const option = this.page
      .locator(".cdk-overlay-pane")
      .getByRole("option", { name: new RegExp(`^${tooth}$`) });

    await expect(option).toBeVisible();
    await option.click();
  }

  // =========================
  // PROCEDURE SELECTION (Autocomplete)
  // =========================

  async selectProcedure(value: string = "Entra") {
    const row = await this.getFirstRow();

    const procedureInput = row.getByRole("combobox", {
      name: /search procedure/i,
    });

    await expect(procedureInput).toBeVisible();

    await procedureInput.click();
    await procedureInput.fill(value); // 🔥 IMPORTANT

    const option = this.page
      .locator(".cdk-overlay-pane")
      .getByRole("option", { name: new RegExp(value, "i") });

    await expect(option).toBeVisible();
    await option.click();
  }

  // =========================
  // PRICE INPUT
  // =========================

  async enterPrice(value: string = "1000") {
    const row = await this.getFirstRow();

    const priceInput = row.locator('input[type="number"]').first();

    await expect(priceInput).toBeVisible();
    await priceInput.fill(value);
  }

  // =========================
  // NEXT STEP
  // =========================

  async goToNextStep() {
    await expect(this.nextStepButton).toBeVisible();
    await expect(this.nextStepButton).toBeEnabled(); // 🔥 important
    await this.nextStepButton.click();
  }

  // =========================
  // FULL FLOW (CLEAN)
  // =========================

  async completeTreatmentPlanFlow() {
    await this.verifyPageLoaded();

    await this.clickAddTreatmentStep();

    await this.selectTooth("55");

    await this.selectProcedure("Entra");

    await this.enterPrice("1000");

    await this.goToNextStep();
  }
}
