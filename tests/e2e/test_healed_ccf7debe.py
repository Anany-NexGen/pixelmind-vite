"""Auto-generated PixelMind Self-Healing Regression Test (run ccf7debe).

Project: pv
Devices: desktop-1440
Verified Resolved Findings: data; content; layout; content; content; content; state; JS_PAGE_ERROR
"""

import pytest
from playwright.async_api import async_playwright

BASE_URL = "http://127.0.0.1:33163"
ROUTES = ["/", "/cards", "/loans", "/login"]
DEVICES = [{"id": "desktop-1440", "width": 1440, "height": 900, "is_mobile": false, "has_touch": false}]


@pytest.mark.asyncio
@pytest.mark.parametrize("device", DEVICES, ids=[d["id"] for d in DEVICES])
async def test_pixelmind_healed_ccf7debe(device):
    console_errors = []
    page_errors = []

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": device["width"], "height": device["height"]},
            is_mobile=device.get("is_mobile", False),
            has_touch=device.get("has_touch", False),
        )
        page = await context.new_page()

        page.on("console", lambda m: console_errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda err: page_errors.append(str(err)))

        for route in ROUTES:
            target = f"{BASE_URL}/{route.lstrip('/')}" if route != "/" else f"{BASE_URL}/"
            resp = await page.goto(target, wait_until="domcontentloaded")
            assert resp is not None and resp.status < 400, f"Unexpected HTTP status on {route} ({device['id']}): {resp.status if resp else 'none'}"
            await page.wait_for_timeout(400)
            body_text = (await page.inner_text("body")).strip()
            assert body_text, f"Expected non-empty rendered content on {route} ({device['id']})"

        assert page_errors == [], f"Expected zero uncaught pageerrors on {device['id']}, got: {page_errors}"
        assert console_errors == [], f"Expected zero console errors on {device['id']}, got: {console_errors}"
        await context.close()
        await browser.close()
