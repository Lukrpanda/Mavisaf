import { test, expect } from '@playwright/test';
import { products, userInfo } from './test-data';

test.describe('Compra de multiples productos', () => {
  test('Flujo completo de compra de tres productos', async ({ page }) => {
    await page.goto('/');

    for (const product of products) {
      await page.getByRole('link', { name: product.name }).click();
      if (product.variant) {
        await page.getByLabel('Seleccionar').selectOption(product.variant);
      }
      await page.getByRole('spinbutton', { name: 'Cantidad' }).fill(String(product.quantity));
      await page.getByRole('button', { name: 'Agregar al carrito' }).click();
      await page.goBack();
    }

    await page.getByRole('link', { name: 'Carrito' }).click();
    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.getByLabel('Nombre').fill(userInfo.firstName);
    await page.getByLabel('Apellido').fill(userInfo.lastName);
    await page.getByLabel('Correo electrónico').fill(userInfo.email);
    await page.getByLabel('Dirección').fill(userInfo.address);
    await page.getByLabel('Ciudad').fill(userInfo.city);
    await page.getByLabel('Código postal').fill(userInfo.postalCode);
    await page.getByLabel('País').selectOption(userInfo.country);
    await page.getByRole('button', { name: 'Continuar con el envío' }).click();

    await page.getByRole('button', { name: `Pagar con ${userInfo.paymentMethod}` }).click();

    await expect(page.getByText('Gracias por su compra')).toBeVisible();
  });
});
