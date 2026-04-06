import { Page, Locator, expect } from "@playwright/test";

export class TreatmentPlanPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly addTreatmentStepBtn: Locator;
  readonly procedureDropdown: Locator;
  readonly priceInput: Locator;
  readonly dateInput: Locator;
  readonly addSpecialistBtn: Locator;
  readonly specialistDropdown: Locator;
  readonly specialistAmountInput: Locator;
  readonly nextStepButton: Locator;
  readonly calendarButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole("heading", { name: /Treatment Steps/i });

    this.addTreatmentStepBtn = page.getByRole("button", {
      name: /add treatment step/i,
    });

    this.procedureDropdown = page.locator("table tbody tr select").first();
    this.priceInput = page.locator('input[type="number"]').first();

    this.dateInput = page.locator('input[placeholder="Date"]');
    this.calendarButton = page.getByRole("button", { name: /open calendar/i });

    this.addSpecialistBtn = page.getByRole("button", {
      name: /add specialist/i,
    });

    this.specialistDropdown = page.locator("select").nth(1);

    this.specialistAmountInput = page.locator('input[type="number"]').nth(1);
    this.nextStepButton = page
  .getByRole('tabpanel', { name: /treatment planning/i })
  .getByRole('button', { name: /next step/i });
  }

  // ✅ Verify page
  async verifyPageLoaded() {
    await expect(this.heading).toBeVisible();
  }

  // ✅ Add Treatment Step
  async clickAddTreatmentStep() {
    await this.addTreatmentStepBtn.click();
  }

  // ✅ Select Procedure (Scaling)
  async selectProcedure() {
    await this.procedureDropdown.selectOption({ label: "Scaling" });
  }

  // ✅ Enter Price
  async enterPrice(value: string = "800") {
    await this.priceInput.fill(value);
  }

  // ✅ Select Date (Today or Future)
  async selectDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();

    const fullDate = `${month} ${day}, ${year}`;

    await this.calendarButton.click();

    const calendar = this.page.locator(".mat-datepicker-content-container");
    await calendar.waitFor({ state: "visible" });

    await calendar.getByRole("button", { name: fullDate }).click();
  }

  // ✅ Add Specialist
  async clickAddSpecialist() {
    await this.addSpecialistBtn.click();
  }

  // ✅ Select Specialist
  async selectSpecialist(name: string = "dhruv Kumar") {
    await this.specialistDropdown.selectOption({ label: name });
  }

  // ✅ Enter Specialist Amount
  async enterSpecialistAmount(value: string = "20") {
    await this.specialistAmountInput.fill(value);
  }

  // ✅ Go to Next Step (Prescription page)
 async goToNextStep() {
  await this.nextStepButton.waitFor({ state: 'visible' });
  await this.nextStepButton.click();
}

  // ✅ FULL FLOW (🔥 BEST PRACTICE)
  async completeTreatmentPlanFlow() {
    await this.verifyPageLoaded();

    await this.clickAddTreatmentStep();

    await this.selectProcedure();

    await this.enterPrice();

    await this.selectDate();

    await this.clickAddSpecialist();

    await this.selectSpecialist();

    await this.enterSpecialistAmount();

    await this.goToNextStep();
  }
}
