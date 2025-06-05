import { type Locator, type Page } from '@playwright/test';


export class CheckOutCompraPage {
    readonly page: Page;
    readonly txtnombre: Locator;
    readonly txtapellido: Locator;
    readonly txtcodigo: Locator;
    readonly btnContinue: Locator;
    readonly btnFinish: Locator;

    constructor(page:Page){
        this.page = page;
        this.txtnombre = page.locator('[data-test="firstName"]');
        this.txtapellido = page.locator('[data-test="lastName"]');
        this.txtcodigo = page.locator('[data-test="postalCode"]');
        this.btnContinue = page.locator('[data-test="continue"]');
        this.btnFinish = page.locator('[data-test="finish"]');

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

    async completarFormulario(nombre: string, apellido: string, codigo: string) {
        await this.ingresarNombre(nombre);
        await this.ingresarApellido(apellido);
        await this.ingresarCodigo(codigo);
        await this.btnContinue.click();
    }

    async finalizarCompra() {
        await this.btnFinish.click();
    }

    async faltaapellido(nombre: string){
        await this.txtnombre.fill(nombre);


    }

    async faltacodigo(nombre: string, apellido: string){

        await this.txtnombre.fill(nombre);
        await this.txtapellido.fill(apellido);
    }
        
}