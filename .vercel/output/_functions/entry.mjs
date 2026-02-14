import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_D3QcBkEG.mjs';
import { manifest } from './manifest_BmCp3FRV.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/lead.astro.mjs');
const _page3 = () => import('./pages/automacao-para-imobiliarias.astro.mjs');
const _page4 = () => import('./pages/automation.astro.mjs');
const _page5 = () => import('./pages/blog.astro.mjs');
const _page6 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page7 = () => import('./pages/obrigado.astro.mjs');
const _page8 = () => import('./pages/servicos.astro.mjs');
const _page9 = () => import('./pages/sobre.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.17.1_@types+node@24.3.1_@vercel+functions@2.2.13_jiti@2.5.1_lightningcss@1.30.1_rollup@4.50.1_typescript@5.9.2/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/lead.ts", _page2],
    ["src/pages/automacao-para-imobiliarias.astro", _page3],
    ["src/pages/automation.astro", _page4],
    ["src/pages/blog/index.astro", _page5],
    ["src/pages/blog/[...slug].astro", _page6],
    ["src/pages/obrigado.astro", _page7],
    ["src/pages/servicos.astro", _page8],
    ["src/pages/sobre.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "37777d31-7014-4dae-806e-7305f799df0a",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
