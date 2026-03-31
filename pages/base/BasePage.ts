import { Page, expect } from '@playwright/test';

export class BasePage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async click(locator: string) {
    await this.page.locator(locator).click();
  }

  async fill(locator: string, value: string) {
    await this.page.locator(locator).fill(value);
  }

  async getText(locator: string) {
    return await this.page.locator(locator).textContent();
  }

}