import { expect, type Locator, type Page } from '@playwright/test';


export class ProductoCompraPage {

    readonly eproducto: Locator;
    constructor(page:Page){

        this.eproducto = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    }
}