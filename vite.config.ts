import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

let currentVariant = 'stable';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'pixelbank-mock-api',
      configureServer(server) {
        server.middlewares.use('/api/rates', (_req, res) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              usd_inr: 83.42,
              eur_inr: 90.18,
              repo_rate: '6.50%',
              updated: '2026-11-04T09:00:00Z',
            }),
          );
        });

        server.middlewares.use('/api/variant', (req, res) => {
          res.setHeader('Content-Type', 'application/json');
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body);
                if (parsed.variant === 'broken' || parsed.variant === 'stable') {
                  currentVariant = parsed.variant;
                }
              } catch {
                // keep current
              }
              res.end(JSON.stringify({ variant: currentVariant }));
            });
          } else {
            res.end(JSON.stringify({ variant: currentVariant }));
          }
        });
      },
    },
  ],
  server: {
    host: '0.0.0.0',
    port: 5179,
  },
});

