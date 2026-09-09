import { Page, Locator } from '@playwright/test';

export class Cart {
    private readonly page: Page;
    private readonly proceedToCheckoutButton: Locator;
    private readonly cartSubtotal: Locator;
    private readonly linkButtons: Locator;
    private readonly emptyCartMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.proceedToCheckoutButton = page.locator('#proceed-to-checkout-action');
        this.cartSubtotal = page.locator('#sc-subtotal-amount-buybox');
        this.linkButtons = page.locator('input.a-color-link');
        this.emptyCartMessage = page.locator("[class*='a-size-large a-spacing-top-base sc-your-amazon-cart-is-empty']");
    }

    async verifyEmptyCartOperation(): Promise<boolean> {
        try {
            await this.emptyCartMessage.waitFor({
                state: 'visible',
                timeout: 10000
            });

            return true;
        } 
        catch {
            return false;
        }
    }

    async clickOnDeleteItemLink(): Promise<void> {
        const deleteLink = this.linkButtons.first();
        await deleteLink.click();
    }

    async clickOnProceedToCheckoutButton(): Promise<void> {
        await this.proceedToCheckoutButton.click();
    }

    async proceedToCheckoutButtonIsVisibleAndClickable(): Promise<boolean> {
        return (await this.proceedToCheckoutButton.isVisible() && await this.proceedToCheckoutButton.isEnabled());
    }

    async getCartSubtotal(): Promise<number> {
        const priceText = await this.cartSubtotal.textContent();
    
        if (!priceText) {
            return 0;
        }

        const numericPrice = priceText.replace(/[^0-9.]/g, '');
        const price = Number.parseFloat(numericPrice);
        return Number.isNaN(price) ? 0 : price;
    }
}