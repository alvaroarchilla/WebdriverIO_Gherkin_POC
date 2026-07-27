import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import DropdownPage from '../page-objects/dropdown.page.js';

Given('que estoy en la página de dropdown', async () => {
    await DropdownPage.open();
});

When('selecciono {string} del dropdown', async (option: string) => {
    await DropdownPage.selectOption(option);
});

Then('el dropdown debería tener seleccionado {string}', async (expectedOption: string) => {
    const selected = await DropdownPage.getSelectedOption();
    expect(selected).toBe(expectedOption);
});