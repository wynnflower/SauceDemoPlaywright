class InventoryPage {
    constructor(page) {
        this.page = page;
        this.backpackAddToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.checkoutBtn = page.locator('[data-test="checkout"]');
    }

    async addItemToCart() {
        await this.backpackAddToCartBtn.click();
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async clickCheckout() {
        await this.checkoutBtn.click();
    }
    async addItemByName(itemName) {
        const itemLocator = this.page.locator('.inventory_item', { hasText: itemName });
        await itemLocator.getByRole('button', { name: 'Add to cart' }).click();
    }
}
module.exports = { InventoryPage };