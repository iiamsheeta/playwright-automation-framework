import { Page, Locator, expect } from "@playwright/test";

export interface Patient {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  address: string;
  gender: "MALE" | "FEMALE" | "OTHER";
}

export class PatientPage {
  readonly page: Page;

  // Sidebar
  readonly menuToggle: Locator;
  readonly patientManagementMenu: Locator;
  readonly allPatientsMenu: Locator;

  // Table
  readonly patientTableRows: Locator;

  // Add patient icon
  readonly addPatientButton: Locator;

  // Form fields
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly age: Locator;
  readonly address: Locator;

  readonly genderDropdown: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Sidebar toggle
    this.menuToggle = page.locator("button.navbar-toggle");

    // Patient Management
    this.patientManagementMenu = page.locator("span.menu-text", {
      hasText: "Patient Management",
    });

    // All Patients
    this.allPatientsMenu = page.getByText("All Patients", { exact: true });

    // Table rows
    this.patientTableRows = page.locator("table tbody tr");

    // Add patient icon
    this.addPatientButton = page.locator(
      'mat-icon:has-text("add_circle_outline")',
    );

    // Form fields
    this.firstName = page.getByRole("textbox", { name: /first name/i });
    this.lastName = page.getByRole("textbox", { name: /last name/i });
    this.email = page.getByRole("textbox", { name: /email/i });
    this.phone = page.getByRole("textbox", { name: /phone/i });
    this.age = page.getByRole("textbox", { name: /age/i });
    this.address = page.getByRole("textbox", { name: /address/i });

    // Dropdown
    this.genderDropdown = page.getByRole("combobox", { name: /gender/i });

    // Save button
    this.saveButton = page.getByRole("button", { name: /save/i });
  }

  async navigateToPatientModule() {
    await this.menuToggle.click();

    await this.patientManagementMenu.click();

    await this.allPatientsMenu.click();

    await expect(this.patientTableRows.first()).toBeVisible();
  }

  async openCreatePatientDialog() {
    // Check if dialog already open
    const dialog = this.page.getByRole("heading", {
      name: "Patient Registration",
    });

    if (await dialog.isVisible().catch(() => false)) {
      return; // dialog already open
    }

    await this.addPatientButton.waitFor({ state: "visible" });

    await this.addPatientButton.click();

    await expect(this.firstName).toBeVisible();
  }

  async createPatient(patient: Patient) {
    await this.openCreatePatientDialog();

    await this.firstName.fill(patient.firstName);
    await this.lastName.fill(patient.lastName);
    await this.email.fill(patient.email);
    await this.phone.fill(patient.phone);
    await this.age.fill(patient.age);
    await this.address.fill(patient.address);

    await this.genderDropdown.click();

    await this.page
      .getByRole("option", {
        name: patient.gender,
        exact: true,
      })
      .click();

    await this.saveButton.click();

    await this.page.waitForLoadState("networkidle");
  }

  async verifyPatientCreated(email: string) {
    const row = this.page.locator("table tbody tr", {
      hasText: email,
    });

    await expect(row).toBeVisible();
  }

  async editPatient(email: string, newAge: string) {
    // Find the patient row using email
    const row = this.patientTableRows.filter({ hasText: email }).first();

    // Click 3-dot action menu
    await row.locator('mat-icon:has-text("drag_indicator")').click();

    // Wait for menu to appear
    await this.page.getByRole("menu").waitFor();

    // Click Edit Patient
    await this.page.getByText("Edit Patient").click();

    // Wait for Update dialog
    await expect(this.age).toBeVisible();

    // Update age
    await this.age.fill(newAge);

    // Click Update button
    await this.page.getByRole("button", { name: /update/i }).click();

    // Verify updated age appears in table
    await expect(row).toContainText(newAge);
  }
}
