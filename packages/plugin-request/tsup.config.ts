import { copySync } from 'fs-extra/esm';
import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts', 'src/client.js'],
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: false,
    shims: true,
    format: ['esm'],
    onSuccess() {
        copySync('src/template', 'dist/template');
    },
});
