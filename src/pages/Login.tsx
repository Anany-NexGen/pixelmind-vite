import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEMO_PASSWORD = 'pixelbank-demo';

export function isPixelBankAuthed(): boolean {
  return Boolean(
    localStorage.getItem('pb_token') ||
      localStorage.getItem('token') ||
      sessionStorage.getItem('token'),
  );
}

export function Login({ onLogin }: { onLogin?: () => void }) {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId.trim()) {
      setStatusMsg('Please enter your Customer ID.');
      return;
    }
    if (password !== DEMO_PASSWORD) {
      setStatusMsg('Invalid PIN / Password. Demo password is "pixelbank-demo".');
      return;
    }
    localStorage.setItem('pb_token', `pb-session-${customerId.trim()}`);
    localStorage.setItem('pb_user', customerId.trim());
    onLogin?.();
    navigate('/', { replace: true });
  };

  return (
    <div className="page-container" data-testid="login-page">
      <div className="panel-card" style={{ maxWidth: '480px', margin: '24px auto' }}>
        <h1>NetBanking Secure Sign-In</h1>
        <p className="subtitle">
          256-bit TLS encrypted session · Demo: Customer ID <code>PB904821</code>, Password{' '}
          <code>pixelbank-demo</code>
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
          <label htmlFor="password-input">
            Password / PIN
            <input
              id="password-input"
              data-testid="password-input"
              type="password"
              className="text-input"
              placeholder="pixelbank-demo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button id="login-submit-btn" data-testid="login-submit-btn" type="submit" className="btn-primary">
            Sign In
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
