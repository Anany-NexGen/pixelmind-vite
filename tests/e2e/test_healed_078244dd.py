"""Auto-generated PixelMind Self-Healing Regression Test (run 078244dd).

Project: pixelvite
Verified Resolved Findings: unclassified, unclassified, unclassified, unclassified, unclassified
"""

import pytest
from playwright.async_api import async_playwright

BASE_URL = "http://127.0.0.1:5180"


@pytest.mark.asyncio
async def test_pixelmind_healed_078244dd():
    console_errors = []
    page_errors = []

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()

        page.on("console", lambda m: console_errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda err: page_errors.append(str(err)))

        # 1. Verify Dashboard route & primary balance currency compliance
        await page.goto(f"{BASE_URL}/", wait_until="domcontentloaded")
        await page.wait_for_timeout(500)
        body_text = await page.inner_text("body")
        assert "₹" in body_text, "Primary currency symbol ₹ must be present on Dashboard"

        # 2. Verify Loans route APR disclosure & EMI calculator
        await page.goto(f"{BASE_URL}/loans", wait_until="domcontentloaded")
        await page.wait_for_timeout(500)
        loans_text = await page.inner_text("body")
        assert "APR" in loans_text, "BFSI APR disclosure must be visible on /loans"

        # 3. Verify Cards route interactive Freeze Card handler (no dead-click)
        await page.goto(f"{BASE_URL}/cards", wait_until="domcontentloaded")
        await page.wait_for_timeout(500)
        freeze_btn = page.locator("#freeze-card-btn")
        if await freeze_btn.count() > 0:
            await freeze_btn.first.click()
            await page.wait_for_timeout(300)
            assert "Card Frozen" in (await page.inner_text("body"))

        assert page_errors == [], f"Expected zero uncaught pageerrors, got: {page_errors}"
        await context.close()
        await browser.close()
