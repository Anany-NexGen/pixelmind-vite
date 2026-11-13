import { useState } from 'react';

export function Cards() {
  const [isFrozen, setIsFrozen] = useState(false);

  // BUG 11 (Journey Functional): Dead click handler, state is never updated
  const handleFreezeToggle = () => {
    console.log("Card freeze requested for card 8842");
    setIsFrozen(prev => !prev);
  };

  return (
    <div className="page-container" data-testid="cards-page">
      <div className="cards-grid">
        <div className="panel-card">
          <h2>PixelBank Sapphire Visa Infinite</h2>
          <p className="subtitle">
            Card Number: XXXX-XXXX-XXXX-8842 · Credit Limit: $1,200,000.00 · Billing Cycle: 15th of every month (36.00% APR on revolving credit)
          </p>

          <div className="card-visual" role="group" aria-label="Credit card ending in 8842 for MONKEY D LUFFY, valid thru 08/29">
            <div className="card-chip" aria-hidden="true" />
            {/* BUG 13 (Accessibility): Card digits without aria-label or accessible text representation */}
            <div className="card-number" aria-label="Card number ending in 8842">•••• •••• •••• 8842</div>
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
            <span id="card-status-badge" data-testid="card-status-badge" className="status-badge" role="status" aria-live="polite">
              Status: {isFrozen ? 'Card Frozen — Temporary Lock Active' : 'Active — Tap & Online Enabled'}
            </span>
          </div>
        </div>

        <div className="panel-card" data-testid="credit-score-widget">
          <h2 id="cibil-widget-title">CIBIL Credit Health</h2>
          {/* BUG 12 (Presence Zone Blank): Empty dark box rendered instead of gauge widget */}
          <div
            role="region"
            aria-labelledby="cibil-widget-title"
            style={{
              width: '100%',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              borderRadius: '8px',
              padding: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <strong aria-label="CIBIL score">782</strong>
              <span>Good</span>
            </div>
            <p style={{ marginTop: '8px' }}>
              Your credit usage is healthy. On-time payments and low utilization help maintain your score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
