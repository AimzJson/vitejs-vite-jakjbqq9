import { test, expect } from '@playwright/test'

test.describe('Toggle', () => {
  test('click moves the inner square to the top-right and reveals the purple overlay', async ({ page }) => {
    await page.goto('/')
    const el = page.getByRole('switch', { name: /toggle active state/i })
    const containerBox = await el.boundingBox()

    await el.click()

    const inner = page.locator('.inner')
    const innerBox = await inner.boundingBox()
    expect(innerBox!.x).toBeGreaterThan(containerBox!.x + containerBox!.width / 2)
    expect(innerBox!.y).toBeLessThan(containerBox!.y + containerBox!.height / 2)

    const beforeOpacity = await inner.evaluate(
      (node) => getComputedStyle(node, '::before').opacity
    )
    expect(beforeOpacity).toBe('1')
  })

  test('auto-reverts at 2000ms', async ({ page }) => {
    await page.clock.install()
    await page.goto('/')

    const el = page.getByRole('switch', { name: /toggle active state/i })
    await el.click()
    await expect(el).toHaveAttribute('aria-checked', 'true')

    await page.clock.fastForward(2000)
    await expect(el).toHaveAttribute('aria-checked', 'false')
  })

  test('keyboard activation toggles state', async ({ page }) => {
    await page.goto('/')
    const el = page.getByRole('switch', { name: /toggle active state/i })

    await el.focus()
    await page.keyboard.press('Enter')

    await expect(el).toHaveAttribute('aria-checked', 'true')
  })

  test('respects prefers-reduced-motion', async ({ browser }) => {
    const page = await browser.newPage({ reducedMotion: 'reduce' })
    await page.goto('/')
    const el = page.getByRole('switch', { name: /toggle active state/i })

    await el.click()
    await expect(page.locator('.inner')).toHaveCSS('transition-duration', '0s')

    await page.close()
  })
})