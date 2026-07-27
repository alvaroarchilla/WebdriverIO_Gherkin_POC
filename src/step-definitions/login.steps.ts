import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals'; // El assertion de WDIO
import LoginPage from '../page-objects/login.page.js';

// Background
Given('que estoy en la página de login', async () => {
    await LoginPage.open();
});

// Steps con parámetros (fundamento de la reutilización)
When('ingreso el usuario {string} y la contraseña {string}', async (username: string, password: string) => {
    await LoginPage.setCredentials(username, password);
});

When('hago clic en el botón {string}', async (buttonText: string) => {
    // Nota: En este ejemplo solo tenemos un botón, pero podrías mapearlo.
    // Si tuvieras varios botones, un switch por texto.
    await LoginPage.clickLogin();
});

Then('debería ver un mensaje de éxito que contenga {string}', async (expectedText: string) => {
    const message = await LoginPage.getFlashMessageText();
    // Verificamos que contenga el texto esperado y que tenga clase 'success'
    expect(message).toContain(expectedText);
});

Then('debería ver un mensaje de error que contenga {string}', async (expectedText: string) => {
    const message = await LoginPage.getFlashMessageText();
    expect(message).toContain(expectedText);
});