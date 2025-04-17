class CartPage {
    constructor(page) {
      this.page = page;
      this.cartItems = page.locator('.cart_item');
      this.checkoutBtn = page.locator('#checkout');
    }
  
    async getCartItems() {
        const items = [];
        const count = await this.cartItems.count();
      
        for (let i = 0; i < count; i++) {
          const item = this.cartItems.nth(i);
          const name = (await item.locator('.inventory_item_name').textContent()).trim();
          const price = parseFloat((await item.locator('.inventory_item_price').textContent()).replace('$', ''));
          const qty = parseInt(await item.locator('.cart_quantity').textContent());
      
          items.push({ name, price, quantity: qty });
        }
      
        return items;
      }
      
    async proceedToCheckout() {
      await this.checkoutBtn.click();
    }

  }

module.exports = CartPage;