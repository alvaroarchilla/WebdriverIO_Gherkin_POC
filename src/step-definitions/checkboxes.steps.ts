import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import CheckboxesPage from '../page-objects/checkboxes.page.js';

Given('que estoy en la página de checkboxes', async () => {
    await CheckboxesPage.open();
});

When('marco el primer checkbox', async () => {
    await CheckboxesPage.setCheckbox('first', true);
});

When('desmarco el segundo checkbox', async () => {
    await CheckboxesPage.setCheckbox('second', false);
});

Then('el primer checkbox debería estar marcado', async () => {
    const isChecked = await CheckboxesPage.isCheckboxChecked('first');
    expect(isChecked).toBe(true);
});

Then('el segundo checkbox debería estar desmarcado', async () => {
    const isChecked = await CheckboxesPage.isCheckboxChecked('second');
    expect(isChecked).toBe(false);
});