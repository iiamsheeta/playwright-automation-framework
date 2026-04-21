import { Page, Locator, expect } from "@playwright/test";

export class ProvisionalDiagnosisPage {
  readonly page: Page;

  // Form Fields

  readonly chiefComplaint: Locator;
  readonly extraOralFinding: Locator;
  readonly pastMedicalHistory: Locator;
  readonly additionalComment: Locator;

  // Tooth Selection

  readonly tooth: (toothNumber: string) => Locator;

  // Dialog (Clinical Findings)

  readonly dialog: Locator;
  readonly findingCheckbox: (finding: string) => Locator;
  readonly dialogSubmitBtn: Locator;

  // Navigation

  readonly nextStepButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Form fields
    this.chiefComplaint = page.getByRole("textbox", {
      name: /Chief Complaint/i,
    });
    this.extraOralFinding = page.getByRole("textbox", {
      name: /Extra Oral Findings/i,
    });
    this.pastMedicalHistory = page.getByRole("textbox", {
      name: /Past History/i,
    });
    this.additionalComment = page.getByRole("textbox", {
      name: /Additional Comment/i,
    });

    // Tooth selector (dynamic)
    this.tooth = (toothNumber: string) =>
      page.locator(`text="${toothNumber}"`).locator("..");

    // Dialog
    this.dialog = page.getByRole("dialog");

    this.findingCheckbox = (finding: string) =>
      page.getByRole("checkbox", { name: new RegExp(finding, "i") });

    this.dialogSubmitBtn = page.getByRole("button", { name: /^Submit$/ });

    // Navigation
    this.nextStepButton = page.getByRole("button", { name: "Next Step" });
  }

  //  COMMON HELPERS

  async waitForNoOverlay() {
    const overlay = this.page.locator(".cdk-overlay-backdrop");

    if (await overlay.isVisible().catch(() => false)) {
      await this.page.keyboard.press("Escape");
      await overlay.waitFor({ state: "hidden" }).catch(() => {});
    }
  }

  async safeClick(locator: Locator) {
    await this.waitForNoOverlay();
    await expect(locator).toBeVisible();
    await locator.click();
  }

  //  PAGE VALIDATION

  async verifyPageLoaded() {
    await expect(
      this.page.getByRole("heading", { name: /Provisional Diagnosis/i }),
    ).toBeVisible();
  }

  // FORM ACTIONS

  async fillForm() {
    await this.chiefComplaint.fill("Patient has tooth pain");
    await this.extraOralFinding.fill("Swelling near gum");
    await this.pastMedicalHistory.fill("No major history");
  }

  // TOOTH + FINDINGS FLOW

  async selectToothAndFinding(
    toothNumber: string,
    finding: string = "Bleeding From Gums",
  ) {
    const tooth = this.tooth(toothNumber);

    await expect(tooth).toBeVisible();
    await this.safeClick(tooth);

    // Wait for dialog
    await this.dialog.waitFor({ state: "visible" });

    // ✅ Step 1: Open dropdown
    const dropdown = this.dialog.getByRole("combobox", {
      name: /Clinical Findings/i,
    });

    await expect(dropdown).toBeVisible();
    await dropdown.click();

    // ✅ Step 2: Select option from overlay
    const option = this.page.locator(".cdk-overlay-pane").getByRole("option", {
      name: new RegExp(finding, "i"),
    });

    await expect(option).toBeVisible();
    await option.click();

    // ✅ Step 3: Submit
    await this.safeClick(this.dialogSubmitBtn);

    await this.dialog.waitFor({ state: "hidden" });
  }

  async addComment() {
    await this.additionalComment.fill("Initial diagnosis recorded");
  }
   
  
  // NAVIGATION

  async goToNextStep() {
    await this.nextStepButton.scrollIntoViewIfNeeded();

    await this.waitForNoOverlay();

    await expect(this.nextStepButton).toBeVisible();

    await this.nextStepButton.click();
  }
  async clickMenuItem(optionName: string) {
    const menu = this.page.locator(".cdk-overlay-pane").getByRole("menu");
    await expect(menu).toBeVisible();

    const item = menu.getByRole("menuitem", {
      name: new RegExp(optionName, "i"),
    });

    await expect(item).toBeVisible();
    await item.click();

    // optional: wait overlay close
    await this.page
      .locator(".cdk-overlay-backdrop")
      .waitFor({ state: "hidden" })
      .catch(() => {});
  }
}
