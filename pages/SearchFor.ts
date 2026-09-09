import { Page, Locator } from '@playwright/test';

export class SearchFor {
    private readonly page: Page;
    private readonly results: Locator;

    constructor(page: Page) {
        this.page = page;
        this.results = page.locator(
        'div.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20:has(span.a-price-whole):has(span.a-price-fraction)'
        );
    }

    async selectFirstAvailableItemOfSearchResult(): Promise<Locator | null> {
        await this.results.first().waitFor({ state: 'visible', timeout: 60000 });
        const count = await this.results.count();

        for (let i = 0; i < count; i++) {
            const item = this.results.nth(i);
            const priceWhole = item.locator('.a-price-whole');
            const priceFraction = item.locator('.a-price-fraction');

            if ( await priceWhole.count() > 0 && await priceFraction.count() > 0 ) {
                return item;
            }
        }

        return null;
    }

    async getPriceOfFirstItemOfSearchResult(firstItemWithPrice: Locator): Promise<number> {
        const strPrice = await firstItemWithPrice
        .locator('[data-cy="price-recipe"] .a-price .a-offscreen')
        .innerText();

        const price = Number(strPrice.replace(/[^0-9.-]+/g, ''));
        return Number.isNaN(price) ? 0 : price;
    }

    async clickOnSelectedItem(item: Locator): Promise<void> {
        await item.locator("[class*='a-size-medium a-spacing-none a-color-base a-text-normal']").click();
    }
}