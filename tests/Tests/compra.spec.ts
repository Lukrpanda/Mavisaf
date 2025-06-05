import { test, expect } from '@playwright/test';
import { LoginCompraPage } from '../Pages/LoginCompraPage';
import { CheckOutCompraPage } from '../Pages/CheckOutCompraPage';
import { ProductoCompraPage } from '../Pages/ProductoCompraPage';
import { BASE_URL, USERS, CHECKOUT_INFO, MESSAGES } from '../utils/constants';

const loginStandard = async (page) => {
  const loginPage = new LoginCompraPage(page);
  await loginPage.login(USERS.standard.username, USERS.standard.password);
};

test.describe('Flujo de compra', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('Realizar la compra de un producto exitosa', async ({ page }) => {
    await loginStandard(page);
    const productoPage = new ProductoCompraPage(page);
    await productoPage.elegirProducto();
    await productoPage.irAlCarrito();

    const checkoutPage = new CheckOutCompraPage(page);
    await page.locator('[data-test="checkout"]').click();
    await checkoutPage.completarFormulario(CHECKOUT_INFO.firstName, CHECKOUT_INFO.lastName, CHECKOUT_INFO.postalCode);
    await checkoutPage.finalizarCompra();

    await expect(page.locator('[data-test="complete-header"]')).toHaveText(MESSAGES.orderSuccess);
  });

  test('Realizar la compra de varios productos exitosa', async ({ page }) => {
    await loginStandard(page);
    const productoPage = new ProductoCompraPage(page);
    await productoPage.elegirVariosProductos();
    await productoPage.irAlCarrito();

    const checkoutPage = new CheckOutCompraPage(page);
    await page.locator('[data-test="checkout"]').click();
    await checkoutPage.completarFormulario(CHECKOUT_INFO.firstName, CHECKOUT_INFO.lastName, CHECKOUT_INFO.postalCode);
    await checkoutPage.finalizarCompra();

    await expect(page.locator('[data-test="complete-header"]')).toHaveText(MESSAGES.orderSuccess);
  });

  test('Realizar la compra sin elegir productos', async ({ page }) => {
    await loginStandard(page);
    const productoPage = new ProductoCompraPage(page);
    await productoPage.irAlCarrito();

    const checkoutPage = new CheckOutCompraPage(page);
    await page.locator('[data-test="checkout"]').click();
    await checkoutPage.completarFormulario(CHECKOUT_INFO.firstName, CHECKOUT_INFO.lastName, CHECKOUT_INFO.postalCode);
    await checkoutPage.finalizarCompra();

    await expect(page.locator('[data-test="complete-header"]')).toHaveText(MESSAGES.orderSuccess);
  });

  test('Checkout con campo nombre vacío', async ({ page }) => {
    await loginStandard(page);
    const productoPage = new ProductoCompraPage(page);
    await productoPage.elegirProducto();
    await productoPage.irAlCarrito();

    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText(MESSAGES.errorFirstName);
  });

  test('Checkout con campo apellido vacío', async ({ page }) => {
    await loginStandard(page);
    const productoPage = new ProductoCompraPage(page);
    await productoPage.elegirProducto();
    await productoPage.irAlCarrito();

    const checkoutPage = new CheckOutCompraPage(page);
    await page.locator('[data-test="checkout"]').click();
    await checkoutPage.faltaapellido(CHECKOUT_INFO.firstName);
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText(MESSAGES.errorLastName);
  });

  test('Checkout con código postal vacío', async ({ page }) => {
    await loginStandard(page);
    const productoPage = new ProductoCompraPage(page);
    await productoPage.elegirProducto();
    await productoPage.irAlCarrito();

    const checkoutPage = new CheckOutCompraPage(page);
    await page.locator('[data-test="checkout"]').click();
    await checkoutPage.faltacodigo(CHECKOUT_INFO.firstName, CHECKOUT_INFO.lastName);
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText(MESSAGES.errorPostalCode);
  });
});
