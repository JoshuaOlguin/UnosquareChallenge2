import { Page, Locator } from '@playwright/test';

export class DetailProduct {
    private readonly page: Page;

    // Locators
    private readonly addToCartButton: Locator;
    private readonly priceOfProduct: Locator;
    private readonly cartIconButton: Locator;
    private readonly goToCartButton: Locator;
    private readonly refuseCoverageButton: Locator;
    private readonly cartItemsCount: Locator;

    constructor(page: Page) {
        this.page = page;

        this.addToCartButton = page.locator("input#add-to-cart-button.a-button-input");
        this.priceOfProduct = page.locator("[class*='apex-pricetopay-value']");
        this.cartIconButton = page.locator("[class*='nav-a nav-a-2 nav-progressive-attribute']");
        this.goToCartButton = page.locator("span.a-button.a-button-span11.a-button-base.a-button-small span.a-button-inner a.a-button-text");

        this.refuseCoverageButton = page.locator(
            "input.a-button-input[aria-labelledby='attachSiNoCoverage-announce']"
        );

        this.cartItemsCount = page.locator(
            "#nav-cart-count"
        );
    }

    async addToCartSelectedItem(): Promise<void> {
        await this.addToCartButton.click();
    }

    async verifyCartCounter(): Promise<boolean> {
        try {
            await this.cartItemsCount.waitFor({
                state: 'visible',
                timeout: 10000
            });

            const text = await this.cartItemsCount.textContent();

            if (!text || text.trim() === '') {
                return false;
            }

            const count = Number.parseInt(text.trim(), 10);

            return !Number.isNaN(count) && count > 0;
        } catch {
            return false;
        }
    }

    async refuseCoverageForAccidentalDamageProduct(): Promise<void> {
        if (await this.refuseCoverageButton.isVisible()) {
            await this.refuseCoverageButton.click();
        }
    }

    async clickOnGoToCartButton(): Promise<void> {
        await this.goToCartButton.click();
    }

    async clickOnCartIcon(): Promise<void> {
        await this.cartIconButton.click();
    }

    async getPriceOfProductValue(): Promise<number> {

        const strPrice = await this.priceOfProduct
        .locator(".a-offscreen")
        .first()
        .innerText();

        const price = Number(strPrice.replace(/[^0-9.-]+/g, ''));
        return Number.isNaN(price) ? 0 : price;
    }
}