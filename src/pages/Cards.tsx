import { useState } from 'react';

export function Cards() {
  const [isFrozen, setIsFrozen] = useState(false);

  // BUG 11 (Journey Functional): Dead click handler, state is never updated
  const handleFreezeToggle = () => {
    console.log("Card freeze requested for card 8842");
    setIsFrozen((prev) => !prev);
  };

  return (
    <div className="page-container" data-testid="cards-page">
      <div className="cards-grid">
        <div className="panel-card">
          <h2>PixelBank Sapphire Visa Infinite</h2>
          <p className="subtitle">
            Card Number: XXXX-XXXX-XXXX-8842 · Credit Limit: $120,000 · Billing Cycle: 15th of every month (36.00% APR on revolving credit)
          </p>

          <div className="card-visual">
            <div className="card-chip" aria-hidden="true" />
            {/* Accessibility: Provide screen-reader label for the card number */}
            <div className="card-number" aria-label="Card number, ending in 8842">•••• •••• •••• 8842</div>
            <div className="card-footer">
              <span>MONKEY.D.LUFFY</span>
              <span>VALID THRU 08/29</span>
            </div>
          </div>

          <div className="card-controls">
            <button
              id="freeze-card-btn"
              data-testid="freeze-card-btn"
              className="btn-primary"
              type="button"
              aria-pressed={isFrozen}
              onClick={handleFreezeToggle}
            >
              {isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
            </button>
            <span id="card-status-badge" data-testid="card-status-badge" className="status-badge" aria-live="polite">
              Status: {isFrozen ? 'Card Frozen — Temporary Lock Active' : 'Active — Tap & Online Enabled'}
            </span>
          </div>
        </div>

        <div className="panel-card" data-testid="credit-score-widget">
          <h2>CIBIL Credit Health</h2>
          <div
            role="region"
            aria-labelledby="credit-health-heading"
            style={{
              width: '100%',
              height: '220px',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '16px'
            }}
          >
            <div>
              <h3 id="credit-health-heading" style={{margin: 0}}>Your Credit Score</h3>
              <p style={{fontSize: '2rem', margin: '4px 0'}} aria-live="polite" aria-atomic="true">789 / 900 — Excellent</p>
              <p style={{margin: 0, opacity: 0.85}}>Last updated: Today</p>
            </div>
            <div
              role="img"
              aria-label="Credit score gauge showing Excellent range"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'conic-gradient(#22c55e 0 260deg, #374151 260deg 360deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{fontWeight: 700}}>789</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
