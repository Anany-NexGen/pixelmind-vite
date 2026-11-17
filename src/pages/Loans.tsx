import { useState } from 'react';

export function Loans() {
  const [principal, setPrincipal] = useState('500000');
  const [tenureMonths, setTenureMonths] = useState('60');
  const [calculatedEmi, setCalculatedEmi] = useState<string | null>(null);

  const handleCalculateEmi = () => {
    // Sanitize inputs and validate
    const P = Number(String(principal).replace(/[,\s]/g, ''));
    const n = Number(String(tenureMonths).replace(/[,\s]/g, ''));
    const annualRate = 10.5;
    const r = annualRate / 12 / 100;

    if (!Number.isFinite(P) || !Number.isFinite(n) || P <= 0 || n <= 0) {
      setCalculatedEmi('Please enter a valid principal amount and tenure in months.');
      return;
    }

    // Correct amortization formula for EMI
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
              style={{ backgroundColor: '#f8fafc', color: '#0f172a', border: '1px solid #e2e8f0' }}
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
          <div className="form-row" style={{ flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
            <label htmlFor="loan-principal-input" style={{ minWidth: '220px' }}>
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
            <label htmlFor="loan-tenure-input" style={{ minWidth: '220px' }}>
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
            <div id="emi-result" data-testid="emi-result" className="result-callout" role="status" aria-live="polite">
              {calculatedEmi}
            </div>
          )}
        </div>

        {/* BUG 6 (BFSI Compliance): Missing RBI Fair Practices Code and explicit representative APR disclosure */}
        <div className="regulatory-footnote">
          Representative example: For a loan of ₹5,00,000 at a fixed rate of 10.50% p.a. over 60 months, the monthly EMI is approximately ₹10,757. Total repayment amount is ₹6,45,420, including interest of ₹1,45,420. Representative APR: 10.50% p.a. Subject to eligibility, verification, and approval. We adhere to the RBI Fair Practices Code. Terms and conditions apply.
        </div>
      </div>
    </div>
  );
}
