import { Page } from '@playwright/test';

export class MaterialDropdown {

  constructor(private page: Page) {}

  async selectByText(label: string, option: string) {

    await this.page.getByLabel(label).click();

    const optionLocator = this.page
      .locator('cdk-overlay-container')
      .getByRole('option', { name: option });

    await optionLocator.waitFor({ state: 'visible' });

    await optionLocator.click();
  }

  async selectFirst(label: string) {

    await this.page.getByLabel(label).click();

    const option = this.page
      .locator('cdk-overlay-container')
      .getByRole('option')
      .first();

    await option.waitFor({ state: 'visible' });

    await option.click();
  }
}