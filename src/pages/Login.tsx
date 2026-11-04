import { useState } from 'react';

export function Login() {
  const [customerId, setCustomerId] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId.trim()) {
      setStatusMsg('Please enter your 8-digit Customer ID.');
      return;
    }
    setStatusMsg(`OTP dispatched to registered mobile for Customer ID ${customerId}.`);
  };

  return (
    <div className="page-container" data-testid="login-page">
      <div className="panel-card" style={{ maxWidth: '480px', margin: '24px auto' }}>
        <h1>NetBanking Secure Sign-In</h1>
        <p className="subtitle">
          256-bit TLS encrypted session · Never share your OTP or PIN with anyone.
        </p>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="customer-id-input">
            Customer ID / User ID
            <input
              id="customer-id-input"
              data-testid="customer-id-input"
              type="text"
              className="text-input"
              placeholder="e.g. PB904821"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </label>
          <button id="login-submit-btn" data-testid="login-submit-btn" type="submit" className="btn-primary">
            Request Secure OTP
          </button>
        </form>
        {statusMsg && (
          <div id="login-status-msg" data-testid="login-status-msg" className="result-callout">
            {statusMsg}
          </div>
        )}
      </div>
    </div>
  );
}

