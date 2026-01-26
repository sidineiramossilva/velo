import { test, expect } from '@playwright/test'

/// AAA - Arrange, Act, Assert

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-KU5BCG');
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  // Assert
  await expect(page.getByText('VLO-KU5BCG')).toBeVisible({ timeout: 10_000 })
  await expect(page.locator('#root')).toContainText('VLO-KU5BCG');

  await expect(page.getByText('APROVADO')).toBeVisible()
  await expect(page.locator('#root')).toContainText('APROVADO'); 
})