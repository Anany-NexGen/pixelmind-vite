import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
      },
    },
  ],
  server: {
    host: '0.0.0.0',
    port: 5179,
  },
});

