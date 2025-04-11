import { expect, type Locator, type Page } from '@playwright/test';


export class CheckOutCompraPage {
    readonly page: Page;
    readonly txtnombre: Locator;
    readonly txtapellido: Locator;
    readonly txtcodigo: Locator;

    constructor(page:Page){
        this.page = page;
        this.txtnombre = page.locator('[data-test="firstName"]');
        this.txtapellido = page.locator('[data-test="lastName"]');
        this.txtcodigo = page.locator('[data-test="postalCode"]');

    }

    async ingresarNombre(nombre: string){
        await this.txtnombre.fill(nombre);
    }

    async ingresarApellido(apellido: string){
        await this.txtapellido.fill(apellido);
    }

    async ingresarCodigo(codigo: string){
        await this.txtcodigo.fill(codigo);
    }
}