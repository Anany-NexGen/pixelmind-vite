import { useEffect, useState } from 'react';

interface Transaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: string;
  status: 'Settled' | 'Pending';
}

const TRANSACTIONS: Transaction[] = [
  { id: 'TXN-901', date: '04 Nov 2026', merchant: 'NEFT Salary Credit · NexGen Corp', category: 'Income', amount: '+₹1,85,000.00', status: 'Settled' },
  { id: 'TXN-902', date: '03 Nov 2026', merchant: 'HDFC Home Loan Auto-Debit', category: 'EMI', amount: '-₹42,500.00', status: 'Settled' },
  { id: 'TXN-903', date: '02 Nov 2026', merchant: 'UPI · Apollo Pharmacy', category: 'Healthcare', amount: '-₹1,240.00', status: 'Settled' },
  { id: 'TXN-904', date: '01 Nov 2026', merchant: 'IMPS · Mutual Fund SIP', category: 'Investment', amount: '-₹25,000.00', status: 'Settled' },
];

export function Dashboard() {
  const [transferNotice, setTransferNotice] = useState<string | null>(null);
  const [filterText, setFilterText] = useState('');

  // Fixed BUG 3: Guard against null user metadata to prevent runtime errors
  useEffect(() => {
    const timer = setTimeout(() => {
      const userMeta: any = null;
      // No-op when userMeta is null; avoid accessing nested properties
      if (userMeta && userMeta.kycProfile) {
        console.log(userMeta.kycProfile.tier);
      }
    }, 40);
    return () => clearTimeout(timer);
  }, []);

  // Fixed BUG 2: Use consistent INR symbol to avoid currency mix on the same screen
  const primaryBalance = '₹14,82,450.00';

  const visibleTxns = TRANSACTIONS.filter((t) =>
    t.merchant.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <div className="page-container" data-testid="dashboard-page">
      <div className="hero-banner">
        <div>
          <span className="badge-pill">Savings Account · XXXX-4821</span>
          <h1>Welcome back, Monkey.D.Luffy</h1>
          <p className="subtitle">
            Available Savings Balance · Interest 7.00% p.a. (7.25% APR equivalent) · Subject to RBI guidelines.
          </p>
          <div className="balance-figure" data-testid="primary-balance">
            {primaryBalance}
          </div>
        </div>

        <div className="cta-group">
          {/* BUG 1 (Visual/Layout): Negative margin & translation causing Transfer Money to overlap Download Statement */}
          <button
            id="transfer-money-btn"
            data-testid="transfer-money-btn"
            className="btn-primary"
            style={{ marginRight: '12px', zIndex: 1, position: 'relative', transform: 'none' }}
            onClick={() => setTransferNotice('Instant IMPS/NEFT Transfer modal initialized.')}
          >
            Transfer Money
          </button>
          <button
            id="download-stmt-btn"
            data-testid="download-stmt-btn"
            className="btn-secondary"
            onClick={() => setTransferNotice('Statement PDF queued for download.')}
          >
            Download Statement
          </button>
        </div>
      </div>

      {transferNotice && (
        <div className="alert-banner" data-testid="transfer-notice" role="status" aria-live="polite">
          {transferNotice}
        </div>
      )}

      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Fixed Deposits</span>
          <strong className="kpi-value">₹8,50,000.00</strong>
          <span className="kpi-meta">Maturity: 18 Mar 2027 · 7.40% APR</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Monthly Outflow</span>
          <strong className="kpi-value">₹68,740.00</strong>
          <span className="kpi-meta">4 settled transactions this month</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Investments</span>
          <strong className="kpi-value">₹14,20,000.00</strong>
          <span className="kpi-meta">Mutual Funds & Equities · +14.2% p.a.</span>
        </div>
      </div>

      <div className="panel-card">
        <div className="panel-header">
          <h3>Recent Transactions</h3>
          {/* Fixed BUG 4: Added accessible label for filter input */}
          <input
            id="txn-filter-input"
            data-testid="txn-filter-input"
            type="text"
            aria-label="Filter transactions by merchant"
            placeholder="Filter merchant..."
            className="text-input"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <table className="data-table" data-testid="transactions-table" aria-label="Recent transactions table">
          <thead>
            {/* Fixed BUG 5: Use standard table layout without clipping or flex */}
            <tr>
              <th scope="col">Ref ID</th>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Status</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {visibleTxns.map((txn) => (
              <tr key={txn.id}>
                <td>{txn.id}</td>
                <td>{txn.date}</td>
                <td>{txn.merchant}</td>
                <td>{txn.category}</td>
                <td><span className="status-settled">{txn.status}</span></td>
                <td className="amount-cell">{txn.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
