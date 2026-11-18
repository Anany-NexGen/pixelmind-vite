import { useState } from 'react';

export function Loans() {
  const [principal, setPrincipal] = useState('500000');
  const [tenureMonths, setTenureMonths] = useState('60');
  const [calculatedEmi, setCalculatedEmi] = useState<string | null>(null);

  const handleCalculateEmi = () => {
    // Sanitize inputs and compute EMI using amortization formula
    const P = Number(principal);
    const n = Number(tenureMonths);
    const annualRate = 10.5;
    const r = annualRate / 12 / 100;

    if (!Number.isFinite(P) || !Number.isFinite(n) || P <= 0 || n <= 0) {
      setCalculatedEmi('Please enter a valid principal and tenure.');
      return;
    }

    const pow = Math.pow(1 + r, n);
    const emi = Math.round((P * r * pow) / (pow - 1));
    setCalculatedEmi(`Estimated Monthly EMI: ₹${emi.toLocaleString('en-IN')}`);
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
              style={{ backgroundColor: '#1e40af', color: '#ffffff', border: '1px solid #1e3a8a' }}
            >
              Instant Pre-Approved Personal Loan Offer
            </span>
            <h1>Personal & Home Loans</h1>
            <p className="subtitle">
              Flexible repayment tenures from 12 to 84 months. Representative APR 10.50%. No hidden charges; foreclosure as per policy.
            </p>
          </div>
        </div>

        <div className="calculator-box">
          <h3>Loan EMI Calculator</h3>
          {/* Align form controls using CSS class without inline overrides to prevent layout shifts */}
          <div className="form-row">
            <label htmlFor="loan-principal-input">
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
            <label htmlFor="loan-tenure-input">
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
              type="button"
              onClick={handleCalculateEmi}
            >
              Calculate EMI
            </button>
          </div>

          {calculatedEmi && (
            <div id="emi-result" data-testid="emi-result" className="result-callout" aria-live="polite" role="status">
              {calculatedEmi}
            </div>
          )}
        </div>

        {/* Regulatory disclosure: RBI Fair Practices Code and representative APR */}
        <div className="regulatory-footnote">
          Representative APR: 10.50%. Example: Borrow ₹5,00,000 over 60 months at 10.50% p.a.; your monthly EMI will depend on eligibility. All loans are offered as per the RBI Fair Practices Code and are subject to verification. Please refer to our Fair Practices Code and Key Facts Statement.
        </div>
      </div>
    </div>
  );
}
