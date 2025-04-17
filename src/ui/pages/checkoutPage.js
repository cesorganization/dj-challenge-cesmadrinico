class CheckoutPage {
    constructor(page) {
      this.page = page;
      this.firstName = page.locator('#first-name');
      this.lastName = page.locator('#last-name');
      this.zip = page.locator('#postal-code');
      this.continueBtn = page.locator('#continue');
      this.finishBtn = page.locator('#finish');
      this.itemTotal = page.locator('.summary_subtotal_label');
      this.successMsg = page.locator('.complete-header');
    }
  
    async fillDetails(first, last, zip) {
      await this.firstName.fill(first);
      await this.lastName.fill(last);
      await this.zip.fill(zip);
      await this.continueBtn.click();
    }
  
    async getItemSubtotal() {
        const actualText = await this.itemTotal.textContent();
        return parseFloat(actualText.replace('Item total: $', ''));
    }      
  
    async finishCheckout() {
      await this.finishBtn.click();
    }
  
    async isCheckoutSuccessful() {
      return (await this.successMsg.textContent()).trim() === 'Thank you for your order!';
    }

}

module.exports = CheckoutPage;
  