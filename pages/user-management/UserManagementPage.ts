import { Page, expect } from "@playwright/test";

export class UserManagementPage {
  readonly page: Page;

  // navigation
  readonly addUserBtn;

  // form fields
  readonly salutationDropdown;
  readonly usernameInput;
  readonly specialistInput;
  readonly licenseInput;
  readonly firstNameInput;
  readonly lastNameInput;
  readonly emailInput;
  readonly phoneInput;
  readonly ageInput;
  readonly passwordInput;
  readonly genderDropdown;
  readonly addressInput;
  readonly roleDropdown;

  // buttons
  readonly saveBtn;
  readonly updateBtn;

  // table
  readonly actionMenuBtn;

  // filters
  readonly byStatusBtn;
  readonly doctorStatusOption;

  constructor(page: Page) {
    this.page = page;

    // filters
    this.byStatusBtn = page.getByRole("button", { name: "By Status" });

    this.doctorStatusOption = page.getByRole("menuitem", { name: "Doctor" });

    // buttons
    this.addUserBtn = page.locator('mat-icon:has-text("add_circle_outline")');
    // form fields
    this.salutationDropdown = page.getByRole("combobox", {
      name: "Salutation",
    });

    this.usernameInput = page.getByRole("textbox", { name: "User Name" });

    this.specialistInput = page.getByRole("textbox", { name: "Specialist" });

    this.licenseInput = page.getByRole("textbox", { name: "License Number" });

    this.firstNameInput = page.getByRole("textbox", { name: "First Name" });

    this.lastNameInput = page.getByRole("textbox", { name: "Last Name" });

    this.emailInput = page.getByRole("textbox", { name: "Email" });

    this.phoneInput = page.locator('input[formcontrolname="phoneNumber"]');

    this.ageInput = page.locator('input[formcontrolname="age"]');

    this.passwordInput = page.locator('input[formcontrolname="password"]');

    this.genderDropdown = page.locator('mat-select[formcontrolname="gender"]');

    this.addressInput = page.locator('input[formcontrolname="address"]');

    this.roleDropdown = page.locator('mat-select[formcontrolname="role"]');

    // buttons
    this.saveBtn = page.getByRole("button", { name: "Save" });

    this.updateBtn = page.getByRole("button", { name: "Update" });

    // table action menu
    this.actionMenuBtn = page.locator("button.mat-mdc-menu-trigger").first();

    this.byStatusBtn = page.getByRole("button", { name: "By Status" });

    this.doctorStatusOption = page.getByRole("menuitem", { name: "Doctor" });
  }

  // ======================
  // Navigation
  // ======================

  async openUserManagement() {
    await this.page.goto("/user/manage/list");

    const firstRow = this.page.locator("table tbody tr").first();

    await expect(firstRow).toBeVisible();
  }

  async openAddUserDialog() {
    await this.page.waitForURL("**/user/manage/list");

    await expect(this.addUserBtn).toBeVisible();

    await this.addUserBtn.click();

    await expect(this.page.getByText("Add User")).toBeVisible();
  }

  // ======================
  // Create User Methods
  // ======================

  async selectSalutation(value: string) {
    await this.salutationDropdown.click();

    await this.page
      .getByRole("option", { name: value.toUpperCase(), exact: true })
      .click();
  }

  async fillUserDetails(user: any) {
    await this.usernameInput.fill(user.username);

    await this.firstNameInput.fill(user.firstName);

    await this.lastNameInput.fill(user.lastName);

    await this.emailInput.fill(user.email);

    await this.phoneInput.fill(user.phone);

    // Doctor-only fields
    if (user.specialist && (await this.specialistInput.isVisible())) {
      await this.specialistInput.fill(user.specialist);
    }

    if (user.license && (await this.licenseInput.isVisible())) {
      await this.licenseInput.fill(user.license);
    }
  }

  async fillAge(age: number) {
    await this.ageInput.fill(age.toString());
  }

  async fillSecurity() {
    await this.passwordInput.fill("12345678");
  }

  async selectGender() {
    await this.genderDropdown.click();

    const genders = ["MALE", "FEMALE", "OTHER"];
    const randomGender = genders[Math.floor(Math.random() * genders.length)];

    const genderOption = this.page
      .getByRole("listbox", { name: "Gender" })
      .getByRole("option", { name: randomGender, exact: true });

    await genderOption.click();
  }

  async fillAddress(address: string) {
    await this.addressInput.fill(address);
  }

  async selectRole(role: string) {
    await this.roleDropdown.click();

    await this.page.getByRole("option", { name: role, exact: true }).click();
  }

  async saveUser() {
    await this.saveBtn.click();

    await this.page.waitForSelector("table tbody tr");
  }

  // ======================
  // Action Menu
  // ======================

  async openUserActionMenu() {
    const actionBtn = this.page
      .locator("table tbody tr")
      .first()
      .locator("td button")
      .last();

    await expect(actionBtn).toBeVisible();

    await actionBtn.click();
  }

  async clickEditUser() {
    const editBtn = this.page.getByRole("menuitem", { name: "Edit User" });

    await expect(editBtn).toBeVisible();

    await editBtn.click();
  }
  // ======================
  // Edit User
  // ======================
  async filterDoctorStatus() {
    await this.byStatusBtn.click();

    await this.doctorStatusOption.click();

    await this.page.waitForLoadState("networkidle");
  }
  async updatePhoneNumber(newPhone: string) {
    await this.phoneInput.clear();

    await this.phoneInput.fill(newPhone);
  }

  async clickUpdate() {
    await this.updateBtn.click();

    await this.page.waitForLoadState("networkidle");
  }

  async verifyPhoneUpdated(phone: string) {
    const phoneCell = this.page
      .locator("table tbody tr")
      .first()
      .locator("td")
      .nth(3); // phone column

    await expect(phoneCell).toContainText(phone);
  }

  // =============================
  // Delete User
  // =============================

  async deleteFirstUser() {
    // click 3 dot action menu
    const actionBtn = this.page.locator("button.mat-mdc-menu-trigger").first();
    await actionBtn.click();

    // click Delete User
    await this.page.getByRole("menuitem", { name: "Delete User" }).click();

    // confirm delete in dialog
    await this.page.getByRole("button", { name: "Delete" }).click();
  }

  async verifyUserDeleted(username: string) {
    await this.page.waitForTimeout(1000);

    const deletedUser = this.page.getByText(username);

    await expect(deletedUser).toHaveCount(0);
  }

  async verifyUserCreated(username: string) {
    const usernameCell = this.page
      .locator("table tbody tr")
      .locator("td")
      .nth(1)
      .filter({ hasText: username });

    await expect(usernameCell).toBeVisible({ timeout: 10000 });
  }
}
