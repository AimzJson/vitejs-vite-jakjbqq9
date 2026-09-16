import { test, expect } from "@playwright/test";

test.describe("Toggle", () => {
  test("click moves the inner square to the top-right and reveals the purple overlay", async ({
    page,
  }) => {
    await page.goto("/");
    const el = page.getByRole("switch", { name: /toggle active state/i });
    const containerBox = await el.boundingBox();

    await el.click();

    const inner = page.locator(".inner");

    await expect
      .poll(() =>
        inner.evaluate((node) => getComputedStyle(node, "::before").opacity),
      )
      .toBe("1");

    const innerBox = await inner.boundingBox();
    expect(innerBox!.x).toBeGreaterThan(
      containerBox!.x + containerBox!.width / 2,
    );
    expect(innerBox!.y).toBeLessThan(
      containerBox!.y + containerBox!.height / 2,
    );
  });

  test("auto-reverts at 2000ms", async ({ page }) => {
    await page.clock.install();
    await page.goto("/");

    const el = page.getByRole("switch", { name: /toggle active state/i });
    await el.click();
    await expect(el).toBeChecked();

    await page.clock.fastForward(2000);
    await expect(el).not.toBeChecked();
  });

  test("keyboard activation toggles state", async ({ page }) => {
    await page.goto("/");
    const el = page.getByRole("switch", { name: /toggle active state/i });

    await el.focus();
    await page.keyboard.press("Space");

    await expect(el).toBeChecked();
  });

  test("respects prefers-reduced-motion", async ({ browser }) => {
    const page = await browser.newPage({ reducedMotion: "reduce" });
    await page.goto("/");
    const el = page.getByRole("switch", { name: /toggle active state/i });

    await el.click();

    await expect(page.locator(".inner")).toHaveCSS("transition-duration", "0s");

    const beforeTransition = await page
      .locator(".inner")
      .evaluate(
        (node) => getComputedStyle(node, "::before").transitionDuration,
      );
    expect(beforeTransition).toBe("0s");

    await page.close();
  });
});
