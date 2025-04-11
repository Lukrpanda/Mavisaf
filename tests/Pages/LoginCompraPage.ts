import { expect, type Locator, type Page } from '@playwright/test';

export class LoginCompraPage {
    readonly page: Page;
    readonly txtUsuario: Locator;
    readonly txtPassword: Locator;
    
   


    constructor(page: Page){

        this.page = page;
        this.txtUsuario = page.locator('[data-test="username"]');
        this.txtPassword = page.locator('[data-test="password"]');
        

    }

    async ingresarUsuario(usuario: string){
        await this.txtUsuario.fill(usuario);
    }

    async ingresarPassword(password: string){
        await this.txtPassword.fill(password);
    }

}
