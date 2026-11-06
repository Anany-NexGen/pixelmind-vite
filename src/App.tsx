import { Link, Route, Routes } from 'react-router-dom';
import { isBugEnabled } from './bugs/bugConfig';
import { RatesTicker } from './components/RatesTicker';
import { Cards } from './pages/Cards';
import { Dashboard } from './pages/Dashboard';
import { Loans } from './pages/Loans';
import { Login } from './pages/Login';

export function App() {
  const brokenNavBug = isBugEnabled('BUG_09_BROKEN_NAV');

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
          <Link to={'/cards'} data-testid="nav-cards">Cards</Link>
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
              <div className="page-container" data-testid="not-found-page">
                <div className="panel-card">
                  <h1>404 — Route Not Found</h1>
                  <p className="subtitle">
                    The requested banking module could not be loaded. Please check the navigation link.
                  </p>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

