import { useState } from 'react';

export function Loans() {
  const [principal, setPrincipal] = useState('500000');
  const [tenureMonths, setTenureMonths] = useState('60');
  const [calculatedEmi, setCalculatedEmi] = useState<string | null>(null);

  const handleCalculateEmi = () => {
    // Sanitize inputs to prevent NaN propagation
    const P = Number.parseFloat(principal);
    const n = Number.parseInt(tenureMonths, 10);
    const annualRate = 10.5; // Representative APR
    const r = annualRate / 12 / 100;

    if (!Number.isFinite(P) || !Number.isFinite(n) || P <= 0 || n <= 0) {
      setCalculatedEmi('Please enter a valid principal and tenure to calculate EMI.');
      return;
    }

    // Standard amortization formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    const pow = Math.pow(1 + r, n);
    const emi = (P * r * pow) / (pow - 1);
    const roundedEmi = Math.round(emi);
    setCalculatedEmi(`Estimated Monthly EMI: ₹${roundedEmi.toLocaleString('en-IN')}`);
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
              style={{ backgroundColor: '#0ea5e9', color: '#ffffff', border: '1px solid #0284c7' }}
            >
              Instant Pre-Approved Personal Loan Offer
            </span>
            <h1>Personal & Home Loans</h1>
            <p className="subtitle">
              Representative APR 10.50%. Example: ₹5,00,000 over 60 months on a reducing balance basis.
            </p>
          </div>
        </div>

        <div className="calculator-box">
          <h3>Loan EMI Calculator</h3>
          {/* BUG 9 (Visual Alignment): Form row with excessive width/gap forcing button to break layout */}
          <div className="form-row" style={{ flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end' }}>
            <label htmlFor="loan-principal-input" style={{ width: '240px', display: 'flex', flexDirection: 'column' }}>
              Loan Principal (₹)
              <input
                id="loan-principal-input"
                data-testid="loan-principal-input"
                type="number"
                className="text-input"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                inputMode="numeric"
                min={0}
                step="1000"
              />
            </label>
            <label htmlFor="loan-tenure-input" style={{ width: '240px', display: 'flex', flexDirection: 'column' }}>
              Tenure (Months)
              <input
                id="loan-tenure-input"
                data-testid="loan-tenure-input"
                type="number"
                className="text-input"
                value={tenureMonths}
                onChange={(e) => setTenureMonths(e.target.value)}
                inputMode="numeric"
                min={1}
                step="1"
              />
            </label>
            <button
              id="calc-emi-btn"
              data-testid="calc-emi-btn"
              type="button"
              className="btn-primary"
              style={{ alignSelf: 'flex-end', marginTop: '0' }}
              onClick={handleCalculateEmi}
            >
              Calculate EMI
            </button>
          </div>

          {calculatedEmi && (
            <div id="emi-result" data-testid="emi-result" className="result-callout" role="status" aria-live="polite">
              {calculatedEmi}
            </div>
          )}
        </div>

        {/* BUG 6 (BFSI Compliance): Missing RBI Fair Practices Code and explicit representative APR disclosure */}
        <div className="regulatory-footnote">
          Representative Example: ₹5,00,000 over 60 months at a Representative APR of 10.50% on a reducing balance basis. EMI shown is indicative. Final sanction, rate and charges are at the sole discretion of the bank/NBFC subject to credit assessment, KYC and underwriting. Refer to our <a href="/disclosures/fair-practices-code">RBI Fair Practices Code</a> and <a href="/disclosures">detailed terms and disclosures</a>. Applicable terms and conditions apply.
        </div>
      </div>
    </div>
  );
}
