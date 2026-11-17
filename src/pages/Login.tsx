import { useState } from 'react';

export function Login() {
  const [customerId, setCustomerId] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = customerId.trim();
    const isValid = /^\d{8}$/.test(id);
    if (!isValid) {
      setStatusType('error');
      setStatusMsg('Enter your 8-digit Customer ID (numbers only).');
      return;
    }
    setStatusType('success');
    // Do not echo the Customer ID back to avoid exposing PII in the UI.
    setStatusMsg('OTP dispatched to your registered mobile number.');
  };

  const isError = statusType === 'error';

  return (
    <div className="page-container" data-testid="login-page">
      <div className="panel-card" style={{ maxWidth: '480px', margin: '24px auto' }}>
        <h1>NetBanking Secure Sign-In</h1>
        <p className="subtitle">
          256-bit TLS encrypted session · Never share your OTP or PIN with anyone.
        </p>
        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <label htmlFor="customer-id-input">
            Customer ID (8 digits)
            <input
              id="customer-id-input"
              data-testid="customer-id-input"
              type="text"
              className="text-input"
              placeholder="e.g. 90482173"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              required
              inputMode="numeric"
              pattern="[0-9]{8}"
              aria-invalid={isError || undefined}
              aria-describedby="customer-id-hint"
            />
          </label>
          <div id="customer-id-hint" className="field-hint">Enter your 8-digit numeric Customer ID.</div>
          <button id="login-submit-btn" data-testid="login-submit-btn" type="submit" className="btn-primary">
            Request Secure OTP
          </button>
        </form>
        {statusMsg && (
          <div
            id="login-status-msg"
            data-testid="login-status-msg"
            className="result-callout"
            role={isError ? 'alert' : 'status'}
            aria-live={isError ? 'assertive' : 'polite'}
          >
            {statusMsg}
          </div>
        )}
      </div>
    </div>
  );
}

