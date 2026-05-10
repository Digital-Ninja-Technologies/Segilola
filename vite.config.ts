// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // This is a single public marketing page, so emit static HTML that Netlify
    // and Vercel can serve directly from dist/client without an SSR adapter.
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
      failOnError: true,
    },
    // Make published SSR use src/server.ts so the production worker gets the
    // lazy-import wrapper, catastrophic-500 normalization, and branded fallback.
    server: { entry: "server" },
  },
  vite: {
    // h3-v2 (alias of h3@2) is imported by @tanstack/start-server-core but is not
    // detected as a "framework package" by crawlFrameworkPkgs (it doesn't list
    // @tanstack/react-start as a peer dep), so it is left external in the SSR
    // bundle. Cloudflare Workers cannot resolve bare module specifiers at runtime,
    // which produces `No such module "assets/h3-v2"` 500s on every request.
    // Force-bundling it into the SSR output fixes that.
    ssr: {
      noExternal: ["h3-v2", "rou3"],
    },
  },
});
