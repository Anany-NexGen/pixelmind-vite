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
            Card Number: XXXX-XXXX-XXXX-8842 · Credit Limit: ₹12,00,000 · Billing Cycle: 15th of every month (36.00% APR on revolving credit)
          </p>

          <div className="card-visual">
            <div className="card-chip" />
            {/* Fixed Accessibility: provide accessible label for card digits */}
            <div className="card-number" aria-label="Card number ending in 8842" role="text">•••• •••• •••• 8842</div>
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
            <span id="card-status-badge" data-testid="card-status-badge" className="status-badge">
              Status: {isFrozen ? 'Card Frozen — Temporary Lock Active' : 'Active — Tap & Online Enabled'}
            </span>
          </div>
        </div>

        <div className="panel-card" data-testid="credit-score-widget">
          <h2>CIBIL Credit Health</h2>
          {/* Fixed: Accessible credit score summary with meter */}
          <div
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#0f172a',
              color: '#e5e7eb',
              borderRadius: '8px',
            }}
            aria-labelledby="cibil-score-title"
          >
            <div id="cibil-score-title" style={{fontWeight: 600, marginBottom: '8px'}}>Your CIBIL Score</div>
            <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
              <meter min={300} max={900} low={580} high={750} optimum={800} value={780} aria-label="CIBIL score meter showing 780 out of 900" style={{width:'60%'}} />
              <div>
                <div style={{fontSize: '18px'}}>780 / 900</div>
                <div style={{opacity: 0.85}}>Status: Excellent</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
