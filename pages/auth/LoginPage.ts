import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  readonly tenantInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.tenantInput = page.getByRole("textbox", { name: "Tenant-ID" });
    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });

    this.loginButton = page.getByRole("button", { name: /login/i });
  }

  async navigate() {
    await this.page.goto("http://localhost:4200/login");
  }


  async login(tenant: string, username: string, password: string) {
    if (!tenant || !username || !password) {
      throw new Error("Login credentials are missing");
    }

    await expect(this.tenantInput).toBeVisible();

    await this.tenantInput.fill(tenant);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    await expect(this.page.getByText("Business Insights")).toBeVisible();
  }
}
