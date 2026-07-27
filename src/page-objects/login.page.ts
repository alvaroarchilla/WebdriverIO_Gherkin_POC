import { $, browser } from '@wdio/globals';

class LoginPage {
    // Selectores (fundamento: usar data-testid es mejor que clases CSS)
    get inputUsername() { return $('#username'); } // O $('[data-test="username"]')
    get inputPassword() { return $('#password'); }
    get btnSubmit() { return $('button[type="submit"]'); }
    get flashMessage() { return $('#flash'); }

    // Acciones básicas
    async open() {
        await browser.url('https://the-internet.herokuapp.com/login');
    }

    async setCredentials(username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
    }

    async clickLogin() {
        await this.btnSubmit.click();
    }

    async getFlashMessageText(): Promise<string> {
        // Espera explícita para que el mensaje sea visible
        await this.flashMessage.waitForDisplayed({ timeout: 5000 });
        return await this.flashMessage.getText();
    }
}

export default new LoginPage();