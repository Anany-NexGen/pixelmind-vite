import { useEffect, useState } from 'react';
import { isBugEnabled } from '../bugs/bugConfig';

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

  const ctaOverlapBug = isBugEnabled('BUG_02_CTA_OVERLAP');
  const currencyMismatchBug = isBugEnabled('BUG_03_CURRENCY_SYM');
  const consoleCrashBug = isBugEnabled('BUG_06_CONSOLE_CRASH');

  useEffect(() => {
    if (consoleCrashBug) {
      // Uncaught runtime error during dashboard telemetry hook
      setTimeout(() => {
        const brokenAccountMeta: any = null;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(brokenAccountMeta.kycProfile.tier);
      }, 50);
    }
  }, [consoleCrashBug]);

  const primaryBalance = currencyMismatchBug ? '$14,82,450.00' : '₹14,82,450.00';

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
          <button
            id="transfer-money-btn"
            data-testid="transfer-money-btn"
            className="btn-primary"
            style={
              ctaOverlapBug
                ? { marginRight: '-78px', zIndex: 5, position: 'relative', transform: 'translateY(8px)' }
                : undefined
            }
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
        <div className="alert-banner" data-testid="transfer-notice">
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
          <span className="kpi-label">Reward Points</span>
          <strong className="kpi-value">18,420 pts</strong>
          <span className="kpi-meta">Redeemable for statement credit</span>
        </div>
      </div>

      <div className="panel-card">
        <div className="panel-header">
          <h2>Recent Account Transactions</h2>
          <input
            id="txn-filter-input"
            data-testid="txn-filter-input"
            type="text"
            placeholder="Filter merchant..."
            className="text-input"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <table className="data-table" data-testid="transactions-table">
          <thead>
            <tr>
              <th>Ref ID</th>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Status</th>
              <th>Amount</th>
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

