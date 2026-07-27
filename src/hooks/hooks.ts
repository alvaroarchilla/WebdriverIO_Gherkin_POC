import { After, Before, Status } from '@wdio/cucumber-framework';
import { browser } from '@wdio/globals';

Before(async () => {
    await browser.deleteAllCookies();
});

After(async function (scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const screenshot = await browser.takeScreenshot();
        // Esto lo guarda en el reporte de Allure automáticamente
        await this.attach(screenshot, 'image/png');
    }
});
