import { test, Browser, Page, expect } from '@playwright/test';
import { LoginCompraPage } from '../Pages/LoginCompraPage';
import { CheckOutCompraPage } from '../Pages/CheckOutCompraPage';


(async() => {

let browser:Browser;
let page:Page;

test.describe('Realizar la compra de un producto productos', () => {

    test('Realizar la compra de un producto exitosa', async ({ page }) => {

        await test.step('Cargando la pagina', async() => {
        await page.goto('https://www.saucedemo.com/');
        })

        await test.step('Lleno texto en el campo usuario ,contraseña e ingresamos ', async() => {

            const logincomprapage = new LoginCompraPage(page);
            await logincomprapage.ingresarUsuario('standard_user');
            await logincomprapage.ingresarPassword('secret_sauce');
        
        //await page.locator('[data-test="username"]').fill('standard_user')
        //await page.locator('[data-test="password"]').fill('secret_sauce')
        await page.locator('[data-test="login-button"]').click()

        })

        await test.step('Elegir producto', async() => {

            await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
            await page.locator('[data-test="shopping-cart-link"]').click();

        })

        await test.step('Hacemos el checkout', async() => {

            const checkoutcomprapage = new CheckOutCompraPage(page);
            await page.locator('[data-test="checkout"]').click();
            await checkoutcomprapage.ingresarNombre('Luis Carlos')
            await checkoutcomprapage.ingresarApellido('Rios Chumbiauca')
            await checkoutcomprapage.ingresarCodigo('15066')


            
            //await page.locator('[data-test="firstName"]').fill('Luis Carlos')
            //await page.locator('[data-test="lastName"]').fill('Rios Chumbiauca')
            //await page.locator('[data-test="postalCode"]').fill('15066')
            await page.locator('[data-test="continue"]').click()
            await page.locator('[data-test="finish"]').click()

        })

        await test.step('Validar mensaje de compra exitosa', async() => {
            await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!')
        })
     
    })
})

})();