import { type Locator, type Page } from '@playwright/test';

export class LoginCompraPage {
    readonly page: Page;
    readonly txtUsuario: Locator;
    readonly txtPassword: Locator;
    readonly btnLogin: Locator;
    
   


    constructor(page: Page){

        this.page = page;
        this.txtUsuario = page.locator('[data-test="username"]');
        this.txtPassword = page.locator('[data-test="password"]');
        this.btnLogin = page.locator('[data-test="login-button"]');
        

    }

    async ingresarUsuario(usuario: string){
        await this.txtUsuario.fill(usuario);
    }

    async ingresarPassword(password: string){
        await this.txtPassword.fill(password);
    }

    async login(usuario: string, password: string) {
        await this.ingresarUsuario(usuario);
        await this.ingresarPassword(password);
        await this.btnLogin.click();
    }

}
