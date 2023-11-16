/// <reference types="vitest" />
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    viteTsconfigPaths(),
  ],
  server: {
    port: 8080,
    host: "0.0.0.0",
  },
  test: {
    globals: true,
    // For compatibility with our old Jest tests... the default is:
    //     ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
    include: [
      "**/__tests__/**/*.{js,jsx,ts,tsx}",
      "**/*.{spec,test}.{js,jsx,ts,tsx}",
    ],
    environment: "jsdom",
    // For debugging:
    // singleThread: true,
  },
});
