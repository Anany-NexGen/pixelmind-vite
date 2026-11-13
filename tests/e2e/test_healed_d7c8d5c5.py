"""Auto-generated PixelMind Self-Healing Regression Test (run d7c8d5c5).

Project: pv
Verified Resolved Findings: data, data, layout, content, data
"""

import pytest
from playwright.async_api import async_playwright

BASE_URL = "http://127.0.0.1:46671"
ROUTES = ["/"]


@pytest.mark.asyncio
async def test_pixelmind_healed_d7c8d5c5():
    console_errors = []
    page_errors = []

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 900})
        page = await context.new_page()

        page.on("console", lambda m: console_errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda err: page_errors.append(str(err)))

        for route in ROUTES:
            target = f"{BASE_URL}/{route.lstrip('/')}" if route != "/" else f"{BASE_URL}/"
            resp = await page.goto(target, wait_until="domcontentloaded")
            assert resp is not None and resp.status < 400, f"Unexpected HTTP status on {route}: {resp.status if resp else 'none'}"
            await page.wait_for_timeout(400)
            body_text = (await page.inner_text("body")).strip()
            assert body_text, f"Expected non-empty rendered content on {route}"

        assert page_errors == [], f"Expected zero uncaught pageerrors, got: {page_errors}"
        assert console_errors == [], f"Expected zero console errors, got: {console_errors}"
        await context.close()
        await browser.close()
