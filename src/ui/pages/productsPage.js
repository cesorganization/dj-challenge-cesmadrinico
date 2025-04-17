class ProductsPage {
    constructor(page) {
      this.page = page;
      this.products = page.locator('.inventory_item');
      this.cartBadge = page.locator('.shopping_cart_badge');
      this.cartLink = page.locator('.shopping_cart_link');
    }
  
    async addRandomProducts(count) {
      const total = await this.products.count();
      const indices = new Set();
      while (indices.size < count) {
        indices.add(Math.floor(Math.random() * total));
      }
  
      const added = [];
      for (let index of indices) {
        const product = this.products.nth(index);
        const name = (await product.locator('.inventory_item_name').textContent()).trim();
        const priceText = await product.locator('.inventory_item_price').textContent();
        const price = parseFloat(priceText.replace('$', ''));
        console.log(`Adding product: ${name} - $${price}`);
        await product.locator('.btn_inventory').click();
        added.push({ name, price, quantity: 1 });
      }
  
      return added;
    }
  
    async getCartIconCount() {
        return parseInt(await this.cartBadge.textContent());
    }

    async goToCart() {
      await this.cartLink.click();
    }

}

module.exports = ProductsPage;