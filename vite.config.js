// @ts-check

import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { renameExtension } from './vite/renameExtension';

import precss from 'precss';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // vite has an opinionated view of how files should be named, we use a custom plugin to remove the format from the file extension
        // without this the develop mode of the playground does not work
        renameExtension('.umd.js', '.js'),
    ],
    resolve: {
        // and example of setting up custom import paths, note that you need to edit tsconfig.json#paths to reflect these
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    css: {
        postcss: {
            plugins: [
                // basic post css plugin, feel free to add more
                precss()
            ]
        }
    },
    build: {
        sourcemap: true,
        // TODO: preferably have vite running its dev server, but its very vague
        // prefer false since it messes with the dev server
        emptyOutDir: false,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            // the name is not relevant, but required for the umd format
            name: 'typescript-playground-plugin-vue',
            // The playground needs the file to be named index.ts
            fileName: 'index',
            // Vite does not support amd directly so we need the umd format
            formats: [
                'umd',
            ],
        },
        // these configuration settings allow us to import the playground typescript
        rollupOptions: {
            output: {
                paths: {
                    'typescript': 'typescript-sandbox/index',
                },
                globals: {
                    'typescript': 'window.ts',
                },
            },
            external: [
                'typescript',
            ],
        },
    },
});
