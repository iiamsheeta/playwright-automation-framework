import { Page } from '@playwright/test';
import { AppointmentPage } from '../pages/appointment/AppointmentPage';
import { BillingPage } from '../pages/billing/BillingPage';

export class AppHelper {

  readonly appointment: AppointmentPage;
  readonly billing: BillingPage;

  constructor(page: Page) {

    this.appointment = new AppointmentPage(page);
    this.billing = new BillingPage(page);

  }

}