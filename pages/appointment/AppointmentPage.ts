import { Page, Locator, expect } from "@playwright/test";

export type PaymentType = "FULL" | "LATER" | "NA" | "NEW_CASE";
export class AppointmentPage {
  readonly page: Page;

  // =========================
  // Patient Table
  // =========================

  readonly firstRow: Locator;
  readonly actionButton: Locator;
  readonly createAppointmentOption: Locator;

  // =========================
  // Appointment Table
  // =========================

  readonly latestAppointmentRow: Locator;
  readonly latestActionButton: Locator;

  // =========================
  // Filters
  // =========================

  readonly todayFilter: Locator;
  readonly allFilterOption: Locator;

  // =========================
  // Edit Appointment
  // =========================

  readonly editAppointmentOption: Locator;
  readonly updateButton: Locator;

  // =========================
  // Delete Appointment
  // =========================

  readonly deleteAppointmentOption: Locator;
  readonly confirmDeleteButton: Locator;

  // =========================
  // Form Fields
  // =========================

  readonly appointmentDate: Locator;
  readonly doctorField: Locator;
  readonly colourField: Locator;
  readonly chairField: Locator;

  readonly modeOfPayment: Locator;
  readonly consultationFees: Locator;

  readonly saveButton: Locator;
  readonly dateTimeInput: Locator;

  // =========================
  // Diagnosis
  // =========================

  readonly provisionalDiagnosisOption: Locator;

  // =========================
  // 🔥 NEW FLOW (ADDED ONLY)
  // =========================

  readonly allAppointmentsLink: Locator;
  readonly addIcon: Locator;
  readonly dialogTitle: Locator;

  readonly patientInput: Locator;
  readonly caseIdInput: Locator;

  readonly dropdownOptions: Locator;

  readonly laterCheckbox: Locator;
  readonly naCheckbox: Locator;

  readonly newCaseCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;

    // =========================
    // EXISTING CODE (UNCHANGED)
    // =========================

    this.firstRow = page.locator("table tbody tr").first();

    this.actionButton = this.firstRow.locator("button").last();

    this.createAppointmentOption = page
      .locator('[role="menuitem"]')
      .filter({ hasText: "Create Appointment" });

    this.latestAppointmentRow = page.locator("table tbody tr").first();

    this.latestActionButton = this.latestAppointmentRow
      .locator("button")
      .last();

    this.todayFilter = page.getByRole("button", { name: "TODAY" });

    this.allFilterOption = page
      .locator('[role="menuitem"]')
      .filter({ hasText: "ALL" });

    this.editAppointmentOption = page
      .locator('[role="menuitem"]')
      .filter({ hasText: "Edit Appointment" });

    this.updateButton = page.getByRole("button", { name: /update/i });

    this.deleteAppointmentOption = page
      .getByRole("menuitem")
      .filter({ hasText: "Delete Appointment" });

    this.confirmDeleteButton = page.getByRole("button", { name: "Delete" });

    this.newCaseCheckbox = page.getByRole("checkbox", { name: "New Case" });

    this.appointmentDate = page.getByLabel("Appointment Date & Time");

    this.doctorField = page.getByRole("combobox", {
      name: "Select Doctor For Treatment",
    });

    this.colourField = page.getByRole("combobox", {
      name: "Select Colour For Appointment",
    });

    this.chairField = page.getByRole("combobox", {
      name: "Select Chair For Patient",
    });

    this.modeOfPayment = page.getByRole("combobox", {
      name: "Mode Of Payment",
    });

    this.consultationFees = page.locator(
      'input[formcontrolname="consultingFees"]',
    );

    this.saveButton = page.getByRole("button", { name: "Save" });

    this.provisionalDiagnosisOption = page
      .locator('[role="menuitem"]')
      .filter({ hasText: "Provisional Diagnosis" });

    // =========================
    // 🔥 NEW FLOW LOCATORS (ADDED)
    // =========================

    this.allAppointmentsLink = page.getByRole("link", {
      name: "All Appointments",
    });

    this.addIcon = page.locator('mat-icon:has-text("add_circle_outline")');

    this.dialogTitle = page.getByRole("heading", {
      name: "Appointment Registration",
    });

    this.patientInput = page.getByLabel("Patient Name");
    this.caseIdInput = page.getByLabel("Select CaseId For Appointment");

    // Angular overlay dropdown
    this.dropdownOptions = page.locator(
      "mat-option .mdc-list-item__primary-text",
    );
    this.dateTimeInput = this.page.getByRole("textbox", {
      name: "Appointment Date & Time",
    });

    this.laterCheckbox = this.page.getByRole("checkbox", { name: "Later" });

    this.naCheckbox = this.page.getByRole("checkbox", { name: "N/A" });

    this.newCaseCheckbox = this.page.getByRole("checkbox", {
      name: "New Case",
    });
  }

  // =========================
  // EXISTING METHODS (UNCHANGED)
  // =========================

  async openCreateAppointment() {
    await this.firstRow.waitFor();

    await this.actionButton.click();

    await this.page.locator('[role="menu"]').waitFor();

    await this.createAppointmentOption.click();

    await this.page
      .getByRole("heading", {
        name: "Appointment Registration",
      })
      .waitFor();
  }

  async fillAppointmentForm() {
    await this.page.locator(".ngx-overlay").waitFor({ state: "hidden" });

    await this.newCaseCheckbox.check();

    const calendarButton = this.page
      .getByRole("textbox", { name: "Appointment Date & Time" })
      .locator("xpath=following::button[1]");

    await calendarButton.click();

    await this.page.waitForSelector(".owl-dt-container");

    await this.page
      .locator(
        ".owl-dt-calendar-cell-content:not(.owl-dt-calendar-cell-disabled)",
      )
      .first()
      .click();

    await this.page.getByRole("button", { name: "Set" }).click();

    await expect(this.appointmentDate).toHaveValue(/.+/);

    await this.doctorField.fill("Neeru");
    await this.page.getByRole("option", { name: "Dr. Neeru Kiran" }).click();

    await this.page
      .getByText("Select Colour For Appointment")
      .locator("..")
      .click();

    await this.page.getByRole("option").first().click();

    await this.page.getByText("Select Chair For Patient").locator("..").click();

    await this.page.getByRole("option").first().click();

    await this.modeOfPayment.click();

    await this.page
      .locator(".cdk-overlay-pane mat-option")
      .filter({ hasText: "CASH" })
      .click();

    const randomFees = Math.floor(Math.random() * 200) + 100;

    await this.consultationFees.fill(randomFees.toString());
  }

  async saveAppointment() {
    await this.saveButton.click();
  }

  async showAllAppointments() {
    await this.page.locator("table tbody tr").first().waitFor();

    await this.todayFilter.click();

    await this.page.locator('[role="menu"]').waitFor();

    await this.allFilterOption.click();

    await this.page.locator("table tbody tr").first().waitFor();
  }

  async openEditAppointment() {
    await this.showAllAppointments();

    const latestRow = this.page.locator("table tbody tr").first();

    await expect(latestRow).toBeVisible();

    await latestRow.locator("button").last().click();

    await this.page.locator('[role="menu"]').waitFor();

    await this.editAppointmentOption.click();

    await expect(
      this.page.getByRole("heading", { name: /appointment/i }),
    ).toBeVisible();
  }

  async changeAppointmentDateToNextDay() {
    const calendarButton = this.page
      .getByRole("textbox", { name: "Appointment Date & Time" })
      .locator("xpath=following::button[1]");

    await calendarButton.click();

    await this.page.waitForSelector(".owl-dt-container");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const day = tomorrow.getDate().toString();

    await this.page
      .locator(".owl-dt-calendar-cell-content")
      .filter({ hasText: day })
      .first()
      .click();

    await this.page.getByRole("button", { name: "Set" }).click();

    await this.page.locator("body").click({ position: { x: 0, y: 0 } });
  }

  async updateAppointment() {
    await this.updateButton.click();

    await this.page.waitForLoadState("networkidle");

    await expect(
      this.page.getByRole("heading", { name: "Update Appointment" }),
    ).toBeHidden();
  }

  async deleteAppointment() {
    await this.showAllAppointments();

    const row = this.page.locator("table tbody tr").first();

    await expect(row).toBeVisible();

    const caseId = await row.locator("td").first().innerText();

    await row.locator("button").last().click();

    await this.page
      .getByRole("menuitem")
      .filter({ hasText: "Delete Appointment" })
      .click();

    await this.page.getByText("Are You Sure?").waitFor();

    await this.page.getByRole("button", { name: "Delete" }).click();

    await this.page.waitForLoadState("networkidle");

    await expect(
      this.page.locator("table tbody").getByText(caseId),
    ).not.toBeVisible();
  }

  async openProvisionalDiagnosisFlow() {
    await this.page.locator("table tbody tr").first().waitFor();

    await this.todayFilter.click();
    await this.page.locator('[role="menu"]').waitFor();
    await this.allFilterOption.click();

    await this.page.getByRole("button", { name: "By Status" }).click();
    await this.page.getByRole("menuitem", { name: "Confirm" }).first().click();

    const row = this.page.locator("table tbody tr").first();

    await row.locator("button").last().click();

    await this.provisionalDiagnosisOption.click();

    await this.page
      .getByRole("heading", {
        name: "Provisional Diagnosis",
      })
      .waitFor();
  }
  // =========================
  // 🔥 MISSING METHODS (ADD THIS)
  // =========================

  async clickAddIcon() {

  // 🔥 FIX: wait for loader & overlay
  await this.waitForNoOverlay();

  // ✅ Ensure icon is visible
  await expect(this.addIcon).toBeVisible();

  // ✅ Scroll (extra safety)
  await this.addIcon.scrollIntoViewIfNeeded();

  // ✅ Click
  await this.addIcon.click();

  // ✅ Wait for dialog
  await expect(this.dialogTitle).toBeVisible();
}

  async selectPatientFromDropdown() {
    await this.patientInput.click();
    await expect(this.dropdownOptions.first()).toBeVisible();

    return await this.selectRandomDropdownOption();
  }

  async openCaseIdDropdown() {
    await this.page
      .getByText("Select CaseId For Appointment")
      .locator("..")
      .click();

    await expect(this.dropdownOptions.first()).toBeVisible();
  }
  // =========================
  // 🔥 NEW FLOW METHODS (MISSING)
  // =========================
  async selectRandomDropdownOption() {
    const count = await this.dropdownOptions.count();

    if (count === 0) {
      throw new Error("No dropdown options found");
    }

    const randomIndex = Math.floor(Math.random() * count);

    const selectedOption = this.dropdownOptions.nth(randomIndex);

    const value = await selectedOption.innerText();

    await selectedOption.click();

    console.log(`✅ Selected option: ${value}`);

    return value; // useful for validation later
  }

  async selectRandomDateTime() {
    const now = new Date();

    now.setDate(now.getDate() + Math.floor(Math.random() * 5) + 1);
    now.setHours(10 + Math.floor(Math.random() * 8));
    now.setMinutes(Math.random() > 0.5 ? 0 : 30);

    const formatted = now.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // ✅ WAIT for input properly
    await expect(this.dateTimeInput).toBeVisible();

    // ✅ Clear before fill (Angular sometimes keeps stale value)
    await this.dateTimeInput.fill("");
    await this.dateTimeInput.fill(formatted);

    await this.dateTimeInput.press("Tab");

    console.log(`📅 Selected DateTime: ${formatted}`);

    return formatted;
  }

  async selectCaseId() {
    return await this.selectRandomDropdownOption();
  }

  async selectAppointmentDateTime() {
    await this.page.getByText("Appointment Date & Time").locator("..").click();

    await this.page.locator(".owl-dt-calendar").waitFor();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const day = tomorrow.getDate().toString();

    await this.page
      .locator(".owl-dt-calendar-cell-content")
      .filter({ hasText: day })
      .first()
      .click();

    await this.page.getByRole("button", { name: "Set" }).click();
  }

  async openDoctorDropdown() {
    await this.page
      .getByText("Select Doctor For Treatment")
      .locator("..")
      .click();

    await expect(this.dropdownOptions.first()).toBeVisible();
  }

  async selectDoctor() {
    return await this.selectRandomDropdownOption();
  }

  async openColourDropdown() {
    await this.page
      .getByText("Select Colour For Appointment")
      .locator("..")
      .click();

    await expect(this.dropdownOptions.first()).toBeVisible();
  }

  async selectColour() {
    const options = this.page.locator("mat-option");

    const count = await options.count();
    const randomIndex = Math.floor(Math.random() * count);

    const option = options.nth(randomIndex);
    const value = await option.innerText();

    await option.click();

    console.log(`🎨 Selected colour: ${value}`);

    return value;
  }

  async openChairDropdown() {
    await this.page.getByText("Select Chair For Patient").locator("..").click();

    await expect(this.dropdownOptions.first()).toBeVisible();
  }

  async selectChair() {
    return await this.selectRandomDropdownOption();
  }

  async openModeOfPaymentDropdown() {
    await this.page.getByText("Mode Of Payment").locator("..").click();

    await expect(this.dropdownOptions.first()).toBeVisible();
  }

  async selectModeOfPayment() {
    return await this.selectRandomDropdownOption();
  }

  async fillConsultationFees() {
    const randomFees = Math.floor(Math.random() * 200) + 100;

    await this.consultationFees.fill(randomFees.toString());
  }

  // =========================
  // 🔥 NEW CHECKBOX METHODS
  // =========================

  async selectLaterCheckbox() {
    if (!(await this.laterCheckbox.isChecked())) {
      await this.laterCheckbox.check();
    }
  }

  async selectNACheckbox() {
    if (!(await this.naCheckbox.isChecked())) {
      await this.naCheckbox.check();
    }
  }

  // =========================
  // 🔥 NEW CASE CHECKBOX
  // =========================

  async selectNewCaseCheckbox() {
    await expect(this.newCaseCheckbox).toBeVisible();
    await this.newCaseCheckbox.check();
  }

  // =========================
  // 🔥 REUSABLE CREATE APPOINTMENT FLOW
  // =========================

  async createAppointmentFlow(paymentType: PaymentType = "FULL") {

  console.log(`🚀 Creating appointment with type: ${paymentType}`);

  // ❌ Removed patient selection

  // Optional validation
  await expect(this.patientInput).toHaveValue(/.+/);

  if (paymentType !== "NEW_CASE") {
    await this.openCaseIdDropdown();
    await this.selectCaseId();
  }

  await this.selectRandomDateTime();

  await this.openDoctorDropdown();
  await this.selectDoctor();

  await this.openColourDropdown();
  await this.selectColour();

  await this.openChairDropdown();
  await this.selectChair();

  switch (paymentType) {
    case "LATER":
      await this.selectLaterCheckbox();
      break;

    case "NA":
      await this.selectNACheckbox();
      break;

    case "FULL":
    case "NEW_CASE":
      await this.openModeOfPaymentDropdown();
      await this.selectModeOfPayment();
      await this.fillConsultationFees();
      break;
  }

  await this.page.getByRole("button", { name: "Save" }).click();


// Optional: wait for dialog close
await this.page.waitForTimeout(1000);
  }
async waitForNoOverlay() {
  // Wait for loader
  await this.page.locator(".ngx-overlay").waitFor({ state: "hidden" }).catch(() => {});

  // Wait for Angular backdrop (if exists)
  await this.page.locator(".cdk-overlay-backdrop")
    .waitFor({ state: "detached" })
    .catch(() => {});
}
}
