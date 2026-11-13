import { useEffect, useState } from 'react';

interface RatesData {
  usd_inr: number;
  eur_inr: number;
  repo_rate: string;
}

export function RatesTicker() {
  const [rates, setRates] = useState<RatesData>({
    usd_inr: 83.42,
    eur_inr: 90.18,
    repo_rate: '6.50%',
  });
  const [pollCount, setPollCount] = useState(0);

  // BUG 14 (Network Health): Infinite polling loop caused by state dependency
  useEffect(() => {
    let active = true;
    fetch('/api/rates')
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        setRates(data);
        if (pollCount < 40) {
          setPollCount((c) => c + 1);
        }
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [pollCount]);

  return (
    <div className="rates-ticker" data-testid="rates-ticker">
      <span>RBI Repo Rate: <strong>{rates.repo_rate}</strong></span>
      <span>USD/INR: <strong>₹{rates.usd_inr.toFixed(2)}</strong></span>
      <span>EUR/INR: <strong>₹{rates.eur_inr.toFixed(2)}</strong></span>
      <span>DICGC Insured up to ₹5,00,000 · RBI Regulated Entity</span>
    </div>
  );
}
