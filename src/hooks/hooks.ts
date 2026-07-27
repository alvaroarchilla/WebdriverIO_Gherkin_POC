import { Before, After, Status } from '@wdio/cucumber-framework';
import { browser } from '@wdio/globals';

Before(async () => {
    // Limpiar cookies entre escenarios
    await browser.deleteAllCookies();
});

// IMPORTANTE: Usa 'function' en lugar de arrow function '() =>'
After(async function (scenario) {
    // Si el escenario falla, sacamos captura de pantalla
    if (scenario.result?.status === Status.FAILED) {
        // Tomamos la captura
        const screenshot = await browser.takeScreenshot();
        
        // ✅ En lugar de browser.attach, usamos this.attach (el World de Cucumber)
        await this.attach(screenshot, 'image/png');
    }
});
