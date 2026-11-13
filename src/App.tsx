import { Link, Route, Routes } from 'react-router-dom';
import { RatesTicker } from './components/RatesTicker';
import { Cards } from './pages/Cards';
import { Dashboard } from './pages/Dashboard';
import { Loans } from './pages/Loans';
import { Login } from './pages/Login';

export function App() {
  return (
    <div className="app-shell">
      <RatesTicker />
      <header className="top-nav">
        <div className="brand">
          <span className="brand-dot" />
          <strong>PixelBank</strong>
          <span className="brand-tag">Enterprise BFSI Portal</span>
        </div>
        <nav className="nav-links" data-testid="main-nav">
          <Link to="/" data-testid="nav-dashboard">Accounts</Link>
          <Link to="/loans" data-testid="nav-loans">Loans</Link>
          {/* BUG 15 (Journey Navigation): Nav link typo pointing to /cardz instead of /cards */}
          <Link to="/cardz" data-testid="nav-cards">Cards</Link>
          <Link to="/login" data-testid="nav-login">NetBanking Login</Link>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <div className="page-container">
                <div className="panel-card">
                  <h2>404 — Page Not Found</h2>
                  <p className="subtitle">The requested route does not exist.</p>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
