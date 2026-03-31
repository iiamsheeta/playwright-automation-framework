import { Page } from '@playwright/test';

export async function waitForAngular(page: Page) {

  await page.waitForFunction(() => {
    return (window as any).getAllAngularTestabilities
      ? (window as any)
          .getAllAngularTestabilities()
          .every((x: any) => x.isStable())
      : true;
  });

}