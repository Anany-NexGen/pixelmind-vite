import { useState } from 'react';
import { isBugEnabled } from '../bugs/bugConfig';

export function Cards() {
  const [isFrozen, setIsFrozen] = useState(false);

  const deadClickBug = isBugEnabled('BUG_04_DEAD_CLICK');
  const presenceBlankBug = isBugEnabled('BUG_10_PRESENCE_BLANK');

  const handleFreezeToggle = () => {
    // BUG_04 dead-click healed
    setIsFrozen((prev) => !prev);
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
          {false ? null : (
            <div className="score-gauge">
              <div className="score-number">792</div>
              <div className="score-band">Excellent · Top 15% of Borrowers</div>
              <p className="subtitle">
                0 late payments across 6 active credit accounts. Updated 04 Nov 2026.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

