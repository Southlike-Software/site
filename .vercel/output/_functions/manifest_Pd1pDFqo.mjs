import 'piccolore';
import { k as decodeKey } from './chunks/astro/server_DJpOThGX.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_WQT8SMym.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/marcusfilipus/Sync/southlike-software/repos/site/","cacheDir":"file:///Users/marcusfilipus/Sync/southlike-software/repos/site/node_modules/.astro/","outDir":"file:///Users/marcusfilipus/Sync/southlike-software/repos/site/dist/","srcDir":"file:///Users/marcusfilipus/Sync/southlike-software/repos/site/src/","publicDir":"file:///Users/marcusfilipus/Sync/southlike-software/repos/site/public/","buildClientDir":"file:///Users/marcusfilipus/Sync/southlike-software/repos/site/dist/client/","buildServerDir":"file:///Users/marcusfilipus/Sync/southlike-software/repos/site/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"automacao-para-imobiliarias/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/automacao-para-imobiliarias","isIndex":false,"type":"page","pattern":"^\\/automacao-para-imobiliarias\\/?$","segments":[[{"content":"automacao-para-imobiliarias","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/automacao-para-imobiliarias.astro","pathname":"/automacao-para-imobiliarias","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"automation/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/automation","isIndex":false,"type":"page","pattern":"^\\/automation\\/?$","segments":[[{"content":"automation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/automation.astro","pathname":"/automation","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"obrigado/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/obrigado","isIndex":false,"type":"page","pattern":"^\\/obrigado\\/?$","segments":[[{"content":"obrigado","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/obrigado.astro","pathname":"/obrigado","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"servicos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/servicos","isIndex":false,"type":"page","pattern":"^\\/servicos\\/?$","segments":[[{"content":"servicos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/servicos.astro","pathname":"/servicos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"sobre/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/sobre","isIndex":false,"type":"page","pattern":"^\\/sobre\\/?$","segments":[[{"content":"sobre","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sobre.astro","pathname":"/sobre","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.17.1_@types+node@24.3.1_@vercel+functions@2.2.13_jiti@2.5.1_lightningcss@1.30.1_rollup@4.50.1_typescript@5.9.2/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/api/lead","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/lead\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"lead","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/lead.ts","pathname":"/api/lead","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://southlikesoftware.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/marcusfilipus/Sync/southlike-software/repos/site/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/marcusfilipus/Sync/southlike-software/repos/site/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/marcusfilipus/Sync/southlike-software/repos/site/src/pages/automacao-para-imobiliarias.astro",{"propagation":"none","containsHead":true}],["/Users/marcusfilipus/Sync/southlike-software/repos/site/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/marcusfilipus/Sync/southlike-software/repos/site/src/pages/obrigado.astro",{"propagation":"none","containsHead":true}],["/Users/marcusfilipus/Sync/southlike-software/repos/site/src/pages/servicos.astro",{"propagation":"none","containsHead":true}],["/Users/marcusfilipus/Sync/southlike-software/repos/site/src/pages/sobre.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.17.1_@types+node@24.3.1_@vercel+functions@2.2.13_jiti@2.5.1_lightningcss@1.30.1_rollup@4.50.1_typescript@5.9.2/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/lead@_@ts":"pages/api/lead.astro.mjs","\u0000@astro-page:src/pages/automacao-para-imobiliarias@_@astro":"pages/automacao-para-imobiliarias.astro.mjs","\u0000@astro-page:src/pages/automation@_@astro":"pages/automation.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/obrigado@_@astro":"pages/obrigado.astro.mjs","\u0000@astro-page:src/pages/servicos@_@astro":"pages/servicos.astro.mjs","\u0000@astro-page:src/pages/sobre@_@astro":"pages/sobre.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Pd1pDFqo.mjs","/Users/marcusfilipus/Sync/southlike-software/repos/site/node_modules/.pnpm/astro@5.17.1_@types+node@24.3.1_@vercel+functions@2.2.13_jiti@2.5.1_lightningcss@1.30.1_rollup@4.50.1_typescript@5.9.2/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BSq74w6t.mjs","/Users/marcusfilipus/Sync/southlike-software/repos/site/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/marcusfilipus/Sync/southlike-software/repos/site/.astro/content-modules.mjs":"chunks/content-modules_Cb3m8gZA.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_C6xOizMI.mjs","/Users/marcusfilipus/Sync/southlike-software/repos/site/src/data/blog/como-funciona-qualificacao-automatica-de-leads.mdx?astroPropagatedAssets":"chunks/como-funciona-qualificacao-automatica-de-leads_86jAM1vm.mjs","/Users/marcusfilipus/Sync/southlike-software/repos/site/src/data/blog/por-que-sua-imobiliaria-precisa-de-ia.mdx?astroPropagatedAssets":"chunks/por-que-sua-imobiliaria-precisa-de-ia_Cny9KpTg.mjs","/Users/marcusfilipus/Sync/southlike-software/repos/site/src/data/blog/como-funciona-qualificacao-automatica-de-leads.mdx":"chunks/como-funciona-qualificacao-automatica-de-leads_CSo8pBU9.mjs","/Users/marcusfilipus/Sync/southlike-software/repos/site/src/data/blog/por-que-sua-imobiliaria-precisa-de-ia.mdx":"chunks/por-que-sua-imobiliaria-precisa-de-ia_Cdea_kWY.mjs","/Users/marcusfilipus/Sync/southlike-software/repos/site/src/components/layout/Navbar.astro?astro&type=script&index=0&lang.ts":"_astro/Navbar.astro_astro_type_script_index_0_lang.CNuzuv3M.js","/Users/marcusfilipus/Sync/southlike-software/repos/site/src/components/layout/MobileCTA.astro?astro&type=script&index=0&lang.ts":"_astro/MobileCTA.astro_astro_type_script_index_0_lang.DcnRQBjH.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/marcusfilipus/Sync/southlike-software/repos/site/src/components/layout/Navbar.astro?astro&type=script&index=0&lang.ts","const e=document.querySelector(\"[data-mobile-menu-toggle]\"),t=document.querySelector(\"[data-mobile-menu]\");e&&t&&e.addEventListener(\"click\",()=>t.classList.toggle(\"hidden\"));"],["/Users/marcusfilipus/Sync/southlike-software/repos/site/src/components/layout/MobileCTA.astro?astro&type=script&index=0&lang.ts","try{const e=document.getElementById(\"mobile-cta\");if(e&&window.innerWidth<640){const o=\"mobile_cta:dismissed_at\",i=()=>{const t=sessionStorage.getItem(o),s=t?parseInt(t,10):NaN;return Number.isFinite(s)&&Date.now()-s<216e5},c=()=>{e.isConnected&&(sessionStorage.setItem(o,String(Date.now())),e.classList.add(\"hidden\"),posthog?.capture?.(\"mobile_cta_dismiss\"))};if(i())e.remove();else{const t=new IntersectionObserver(r=>{for(const d of r)d.isIntersecting||(e.classList.remove(\"hidden\"),t.disconnect())},{threshold:0}),s=document.querySelector(\"[data-hero]\");s?t.observe(s):e.classList.remove(\"hidden\");const n=e.querySelector(\"[data-close-mobile-cta]\");n&&n.addEventListener(\"click\",c,{once:!0})}}}catch{}"]],"assets":["/_astro/inter-vietnamese-wght-normal.CBcvBZtf.woff2","/_astro/inter-latin-ext-wght-normal.DO1Apj_S.woff2","/_astro/inter-cyrillic-ext-wght-normal.BOeWTOD4.woff2","/_astro/inter-latin-wght-normal.Dx4kXJAl.woff2","/_astro/space-grotesk-vietnamese-wght-normal.D0rl6rjA.woff2","/_astro/inter-cyrillic-wght-normal.DqGufNeO.woff2","/_astro/inter-greek-ext-wght-normal.DlzME5K_.woff2","/_astro/inter-greek-wght-normal.CkhJZR-_.woff2","/_astro/space-grotesk-latin-ext-wght-normal.D9tNdqV9.woff2","/_astro/space-grotesk-latin-wght-normal.BhU9QXUp.woff2","/_astro/_slug_.BV2vf5Zx.css","/favicon.svg","/robots.txt","/southlike-logo.png","/southlike-logo.svg","/about/index.html","/automacao-para-imobiliarias/index.html","/automation/index.html","/blog/index.html","/obrigado/index.html","/servicos/index.html","/sobre/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"rDVH+eJpT7MbHyKdZvBqNRlaap0QbO12zNySJSPkmhM="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
