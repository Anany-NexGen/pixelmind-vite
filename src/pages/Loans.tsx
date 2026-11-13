import { useState } from 'react';

export function Loans() {
  const [principal, setPrincipal] = useState('500000');
  const [tenureMonths, setTenureMonths] = useState('60');
  const [calculatedEmi, setCalculatedEmi] = useState<string | null>(null);

  const handleCalculateEmi = () => {
    // BUG 10 (State/NaN): NaN propagating if input is wiped without sanitization
    const P = Number(principal);
    const n = Number(tenureMonths);
    const annualRate = 10.5;
    const r = annualRate / 12 / 100;

    // BUG 8 (Journey Math): Naive multiplication instead of real amortization formula
    const wrongEmi = Math.round(P * r * n);
    setCalculatedEmi(`Estimated Monthly EMI: ₹${wrongEmi.toLocaleString('en-IN')}`);
  };

  return (
    <div className="page-container" data-testid="loans-page">
      <div className="panel-card">
        <div className="panel-header">
          <div>
            {/* BUG 7 (Accessibility/Contrast): #cbd5e1 on #f8fafc fails WCAG AA minimum 4.5:1 */}
            <span
              id="loan-promo-badge"
              data-testid="loan-promo-badge"
              className="promo-badge"
              style={{ backgroundColor: '#f8fafc', color: '#cbd5e1', border: '1px solid #e2e8f0' }}
            >
              Instant Pre-Approved Personal Loan Offer
            </span>
            <h1>Personal & Home Loans</h1>
            <p className="subtitle">
              Flexible repayment tenures from 12 to 84 months at 10.50% nominal rate.
            </p>
          </div>
        </div>

        <div className="calculator-box">
          <h3>Loan EMI Calculator</h3>
          {/* BUG 9 (Visual Alignment): Form row with excessive width/gap forcing button to break layout */}
          <div className="form-row" style={{ flexWrap: 'wrap', gap: '28px' }}>
            <label htmlFor="loan-principal-input" style={{ minWidth: '280px' }}>
              Loan Principal (₹)
              <input
                id="loan-principal-input"
                data-testid="loan-principal-input"
                type="number"
                className="text-input"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </label>
            <label htmlFor="loan-tenure-input" style={{ minWidth: '280px' }}>
              Tenure (Months)
              <input
                id="loan-tenure-input"
                data-testid="loan-tenure-input"
                type="number"
                className="text-input"
                value={tenureMonths}
                onChange={(e) => setTenureMonths(e.target.value)}
              />
            </label>
            <button
              id="calc-emi-btn"
              data-testid="calc-emi-btn"
              className="btn-primary"
              style={{ alignSelf: 'flex-end', marginTop: '14px' }}
              onClick={handleCalculateEmi}
            >
              Calculate EMI
            </button>
          </div>

          {calculatedEmi && (
            <div id="emi-result" data-testid="emi-result" className="result-callout">
              {calculatedEmi}
            </div>
          )}
        </div>

        {/* BUG 6 (BFSI Compliance): Missing RBI Fair Practices Code and explicit representative APR disclosure */}
        <div className="regulatory-footnote">
          Terms and conditions apply. Subject to credit bureau verification.
        </div>
      </div>
    </div>
  );
}
