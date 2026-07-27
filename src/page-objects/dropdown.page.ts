import { $, browser } from '@wdio/globals';

class DropdownPage {
    // Selector del dropdown
    get dropdown() { return $('#dropdown'); }

    async open() {
        await browser.url('https://the-internet.herokuapp.com/dropdown');
    }

    // Método para seleccionar por texto visible
    async selectOption(optionText: string) {
        await this.dropdown.selectByVisibleText(optionText);
    }

    // Método para obtener la opción seleccionada actualmente
    async getSelectedOption(): Promise<string> {
        const dropdown = await this.dropdown;
        // Busca la opción que tiene el atributo 'selected'
        const selectedOption = await dropdown.$('option[selected="selected"]');
        return await selectedOption.getText();
    }
}

export default new DropdownPage();