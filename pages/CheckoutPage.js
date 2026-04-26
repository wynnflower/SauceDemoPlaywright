class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.finishBtn = page.locator('[data-test="finish"]');
    this.successMessage = page.locator('[data-test="complete-header"]');
  }

  async fillInformation(fName, lName, pCode) {
    await this.firstName.fill(fName);
    await this.lastName.fill(lName);
    await this.postalCode.fill(pCode);
    await this.continueBtn.click();
  }

  async finishCheckout() {
    await this.finishBtn.click();
  }
}
module.exports = { CheckoutPage };