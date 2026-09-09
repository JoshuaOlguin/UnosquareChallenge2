import { Page, Locator } from '@playwright/test';

export class Home {

  private readonly page: Page;

  private readonly searchButton: Locator;
  private readonly searchTextBox: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchButton = page.locator('#nav-search-submit-button');
    this.searchTextBox = page.locator('#twotabsearchtextbox');
    this.continueShoppingButton = page.locator(
      "//button[@class='a-button-text' and text()='Continue shopping']"
    );
  }

  async searchForProduct(inputParameter: string): Promise<void> {
    await this.searchTextBox.fill(inputParameter);
    await this.searchButton.click();
  }

  async continueShopping(): Promise<void> {
    if (await this.continueShoppingButton.isVisible()) {
        await this.continueShoppingButton.click();
    }
  }
  async clickOnSelectedItem(item: Locator): Promise<void> {

  await item
    .locator("[class*='a-size-medium a-spacing-none a-color-base a-text-normal']")
    .click();
  }
}