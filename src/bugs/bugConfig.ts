/**
 * PixelBank 10-Bug Benchmark Configuration.
 *
 * Each flag toggles a realistic bug across the 6 PixelMind detection layers:
 *  - BUG_01_APR_TEXT:       Missing "APR" disclosure on /loans (Layer 5: BFSI_APR_DISCLOSURE)
 *  - BUG_02_CTA_OVERLAP:    Negative margin on primary Transfer CTA overlapping adjacent button on / (Layer 1: Visual/Layout)
 *  - BUG_03_CURRENCY_SYM:   Mixed $ and ₹ currency symbols on / (Layer 5: BFSI_CURRENCY_MISMATCH)
 *  - BUG_04_DEAD_CLICK:     "Freeze Card" button on /cards has no-op click handler (Layer 6: DEAD_CLICK)
 *  - BUG_05_LOAN_MATH:      EMI calculator on /loans uses wrong formula (Layer 6: ASSERT_TEXT_VISIBLE)
 *  - BUG_06_CONSOLE_CRASH:  Uncaught TypeError thrown during render/filter on / (Layer 2: JS_PAGE_ERROR)
 *  - BUG_07_INFINITE_POLL:  Missing dependency array in RatesTicker useEffect firing >25 /api/rates calls (Layer 3: NET_REQUEST_SPAM)
 *  - BUG_08_LOW_CONTRAST:   Low-contrast #cbd5e1 text on #f8fafc badge on /loans (Layer 4: AXE_COLOR_CONTRAST)
 *  - BUG_09_BROKEN_NAV:     "Cards" nav link points to /cardz instead of /cards (Layer 6: Navigation 404)
 *  - BUG_10_PRESENCE_BLANK: Credit score gauge on /cards renders empty box (Layer 1: Presence Zone Blank)
 */

export interface BugFlags {
  BUG_01_APR_TEXT: boolean;
  BUG_02_CTA_OVERLAP: boolean;
  BUG_03_CURRENCY_SYM: boolean;
  BUG_04_DEAD_CLICK: boolean;
  BUG_05_LOAN_MATH: boolean;
  BUG_06_CONSOLE_CRASH: boolean;
  BUG_07_INFINITE_POLL: boolean;
  BUG_08_LOW_CONTRAST: boolean;
  BUG_09_BROKEN_NAV: boolean;
  BUG_10_PRESENCE_BLANK: boolean;
}

export const DEFAULT_BUGS: BugFlags = {
  BUG_01_APR_TEXT: false,
  BUG_02_CTA_OVERLAP: false,
  BUG_03_CURRENCY_SYM: false,
  BUG_04_DEAD_CLICK: false,
  BUG_05_LOAN_MATH: false,
  BUG_06_CONSOLE_CRASH: false,
  BUG_07_INFINITE_POLL: false,
  BUG_08_LOW_CONTRAST: false,
  BUG_09_BROKEN_NAV: false,
  BUG_10_PRESENCE_BLANK: false,
};

let _activeVariant = 'stable';

export async function initBugConfig(): Promise<void> {
  try {
    const res = await fetch('/api/variant', { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json();
      if (data?.variant) {
        _activeVariant = data.variant;
        return;
      }
    }
  } catch {
    // fallback
  }

  try {
    const backendRes = await fetch('http://localhost:8000/api/v1/visual/demo-site/variant', {
      signal: AbortSignal.timeout(2000),
    });
    if (backendRes.ok) {
      const bData = await backendRes.json();
      if (bData?.variant) {
        _activeVariant = bData.variant;
      }
    }
  } catch {
    // ignore
  }
}

export function isBugEnabled(key: keyof BugFlags): boolean {
  try {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('bugs');
    if (q) {
      if (q === 'none') return false;
      if (q === 'all') return true;
      const parts = q.split(',').map((s) => s.trim().toUpperCase());
      if (parts.includes(key) || parts.includes(key.slice(0, 6))) return true;
    }
  } catch {
    // ignore
  }
  if (_activeVariant === 'broken') {
    return true;
  }
  return Boolean(DEFAULT_BUGS[key]);
}

