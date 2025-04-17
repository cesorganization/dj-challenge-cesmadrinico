class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = page.locator('#user-name');
      this.passwordInput = page.locator('#password');
      this.loginButton = page.locator('#login-button');
    }
  
    async open() {
      await this.page.goto('/');
    }
  
    async login(username, password) {
      console.log(`Logging in with username: ${username}`);
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }

  }
  
module.exports = LoginPage;   