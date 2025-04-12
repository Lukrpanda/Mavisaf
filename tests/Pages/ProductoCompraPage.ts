import { expect, type Locator, type Page } from '@playwright/test';

export class ProductoCompraPage {
    readonly page: Page;
    readonly eproducto: Locator;
    readonly producto1: Locator;
    readonly producto2: Locator;
    readonly producto3: Locator;

    constructor(page:Page){
        this.page = page;
        this.eproducto = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.producto1 = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.producto2 = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
        this.producto3 = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    }

    async elegirProducto(){
        await this.eproducto.click();
    }

    async elegirVariosProductos() {
        await this.producto1.click();
        await this.producto2.click();
        await this.producto3.click();
    }

    
}