import { useState } from 'react';
import { isBugEnabled } from '../bugs/bugConfig';

export function Loans() {
  const [principal, setPrincipal] = useState('500000');
  const [tenureMonths, setTenureMonths] = useState('60');
  const [calculatedEmi, setCalculatedEmi] = useState<string | null>(null);

  const missingAprBug = isBugEnabled('BUG_01_APR_TEXT');
  const loanMathBug = isBugEnabled('BUG_05_LOAN_MATH');

  const handleCalculateEmi = () => {
    const P = Math.max(1000, Number(principal) || 500000);
    const n = Math.max(6, Number(tenureMonths) || 60);
    const annualRate = 10.5;
    const r = annualRate / 12 / 100;

    if (loanMathBug) {
      // BUG_05_LOAN_MATH: broken formula multiplying principal by tenure instead of amortizing
      const wrongEmi = Math.round(P * r * n);
      setCalculatedEmi(`Estimated Monthly EMI: ₹${wrongEmi.toLocaleString('en-IN')}`);
      return;
    }

    const factor = Math.pow(1 + r, n);
    const emi = Math.round((P * r * factor) / (factor - 1));
    setCalculatedEmi(`Estimated Monthly EMI: ₹${emi.toLocaleString('en-IN')}`);
  };

  return (
    <div className="page-container" data-testid="loans-page">
      <div className="panel-card">
        <div className="panel-header">
          <div>
            <span
              id="loan-promo-badge"
              data-testid="loan-promo-badge"
              className="promo-badge"
              style={{ backgroundColor: '#1e3a8a', color: '#ffffff' }}
            >
              Instant Pre-Approved Personal Loan Offer
            </span>
            <h1>Personal & Home Loans</h1>
            <p className="subtitle">
              {missingAprBug
                ? 'Flexible repayment tenures from 12 to 84 months at 10.50% nominal rate.'
                : 'Flexible repayment tenures from 12 to 84 months · Representative 10.50% APR (Annual Percentage Rate) · Zero foreclosure charges.'}
            </p>
          </div>
        </div>

        <div className="calculator-box">
          <h3>Loan EMI Calculator</h3>
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

        <div className="regulatory-footnote">
          {missingAprBug
            ? 'Terms and conditions apply. Subject to credit bureau verification.'
            : 'Regulatory Disclosure: All retail loan products carry a fixed 10.50% APR inclusive of processing fees. Subject to RBI Fair Practices Code.'}
        </div>
      </div>
    </div>
  );
}

