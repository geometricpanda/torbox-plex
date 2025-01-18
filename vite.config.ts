import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(async () => {
  return {
    server: {
      port: 3000,
    },
    plugins: [
      tsconfigPaths(),
      ...VitePluginNode({
        adapter: 'fastify',
        appPath: './src/app.ts',
        initAppOnBoot: true,
      }),
    ],
  };
});
