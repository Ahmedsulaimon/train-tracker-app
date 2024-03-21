// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./setupTests.js'], // If you have a setup file for jest-dom, etc.
        transformMode: {
            web: [/.[tj]sx?$/], // Transform JS and TS files
        },
    },
});
