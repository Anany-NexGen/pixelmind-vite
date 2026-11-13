import { useState } from 'react';

export function Cards() {
  const [isFrozen, setIsFrozen] = useState(false);

  // BUG 11 (Journey Functional): Dead click handler, state is never updated
  const handleFreezeToggle = () => {
    console.log("Card freeze requested for card 8842");
    // Developer omitted setIsFrozen(!isFrozen)
  };

  return (
    <div className="page-container" data-testid="cards-page">
      <div className="cards-grid">
        <div className="panel-card">
          <h2>PixelBank Sapphire Visa Infinite</h2>
          <p className="subtitle">
            Card Number: XXXX-XXXX-XXXX-8842 · Credit Limit: ₹12,00,000 · Billing Cycle: 15th of every month (36.00% APR on revolving credit)
          </p>

          <div className="card-visual">
            <div className="card-chip" />
            {/* BUG 13 (Accessibility): Card digits without aria-label or accessible text representation */}
            <div className="card-number">•••• •••• •••• 8842</div>
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
              onClick={handleFreezeToggle}
            >
              {isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
            </button>
            <span id="card-status-badge" data-testid="card-status-badge" className="status-badge">
              Status: {isFrozen ? 'Card Frozen — Temporary Lock Active' : 'Active — Tap & Online Enabled'}
            </span>
          </div>
        </div>

        <div className="panel-card" data-testid="credit-score-widget">
          <h2>CIBIL Credit Health</h2>
          {/* BUG 12 (Presence Zone Blank): Empty dark box rendered instead of gauge widget */}
          <div
            style={{
              width: '100%',
              height: '220px',
              backgroundColor: '#0f172a',
            }}
          />
        </div>
      </div>
    </div>
  );
}
