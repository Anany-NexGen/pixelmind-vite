import { useState, type ReactNode } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { RatesTicker } from './components/RatesTicker';
import { Cards } from './pages/Cards';
import { Dashboard } from './pages/Dashboard';
import { Loans } from './pages/Loans';
import { isPixelBankAuthed, Login } from './pages/Login';

function RequirePbAuth({ authed, children }: { authed: boolean; children: ReactNode }) {
  if (!authed) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export function App() {
  const [authed, setAuthed] = useState(() => isPixelBankAuthed());
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('pb_token');
    localStorage.removeItem('pb_user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setAuthed(false);
    navigate('/login', { replace: true });
  };

  return (
    <div className="app-shell">
      <RatesTicker />
      <header className="top-nav">
        <div className="brand">
          <span className="brand-dot" />
          <strong>PixelBank</strong>
          <span className="brand-tag">Enterprise BFSI Portal</span>
        </div>
        {authed && (
          <nav className="nav-links" data-testid="main-nav">
            <Link to="/" data-testid="nav-dashboard">Accounts</Link>
            <Link to="/loans" data-testid="nav-loans">Loans</Link>
            {/* BUG 15 (Journey Navigation): Nav link typo pointing to /cardz instead of /cards */}
            <Link to="/cardz" data-testid="nav-cards">Cards</Link>
            <button
              type="button"
              data-testid="logout-btn"
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '1px solid currentColor',
                borderRadius: 6,
                padding: '4px 10px',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              Sign Out
            </button>
          </nav>
        )}
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setAuthed(true)} />} />
          <Route path="/" element={<RequirePbAuth authed={authed}><Dashboard /></RequirePbAuth>} />
          <Route path="/loans" element={<RequirePbAuth authed={authed}><Loans /></RequirePbAuth>} />
          <Route path="/cards" element={<RequirePbAuth authed={authed}><Cards /></RequirePbAuth>} />
          <Route
            path="*"
            element={
              <RequirePbAuth authed={authed}>
                <div className="page-container">
                  <div className="panel-card">
                    <h2>404 — Page Not Found</h2>
                    <p className="subtitle">The requested route does not exist.</p>
                  </div>
                </div>
              </RequirePbAuth>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
