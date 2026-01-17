
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // 讓 process.env.API_KEY 在前端可以被讀取
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
