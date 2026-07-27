import { $, browser } from '@wdio/globals';

class CheckboxesPage {
    // Los checkboxes están dentro de un form, el segundo es el índice 3 porque hay un <br> entre medias.
    get checkbox1() { return $('form#checkboxes input:nth-child(1)'); }
    get checkbox2() { return $('form#checkboxes input:nth-child(3)'); }

    async open() {
        await browser.url('https://the-internet.herokuapp.com/checkboxes');
    }

    // Método genérico para marcar/desmarcar según estado deseado
    async setCheckbox(checkbox: 'first' | 'second', state: boolean) {
        let element;
        if (checkbox === 'first') element = this.checkbox1;
        else element = this.checkbox2;

        const isCurrentlyChecked = await element.isSelected();
        if (state !== isCurrentlyChecked) {
            await element.click();
        }
    }

    async isCheckboxChecked(checkbox: 'first' | 'second'): Promise<boolean> {
        if (checkbox === 'first') return await this.checkbox1.isSelected();
        else return await this.checkbox2.isSelected();
    }
}

export default new CheckboxesPage();