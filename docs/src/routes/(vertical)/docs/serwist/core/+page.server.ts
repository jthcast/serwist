import { highlightCode } from "$lib/highlightCode";
import { encodeOpenGraphImage } from "$lib/og";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ locals }) => ({
  title: "Using the Serwist API - serwist",
  ogImage: encodeOpenGraphImage({
    title: "Using the Serwist API",
    desc: "serwist",
  }),
  toc: [
    {
      title: "Using the Serwist API",
      id: "api",
      children: [
        {
          title: "Introduction",
          id: "introduction",
        },
        {
          title: "Basic usage",
          id: "basic-usage",
          children: [
            {
              title: "Customizing the behaviour",
              id: "customizing-the-behaviour",
            },
          ],
        },
        {
          title: "Advanced usage",
          id: "advanced-usage",
          children: [
            {
              title: "Interoperating with the Service Worker API",
              id: "interoperability",
            },
            {
              title: "Dynamically registering a Route",
              id: "dynamic-register",
            },
          ],
        },
        {
          title: "More resources",
          id: "more-resources",
        },
      ],
    },
  ],
  code: {
    basicUsage: {
      setup: highlightCode(
        locals.highlighter,
        {
          "sw.ts": {
            code: `// Where you import this depends on your stack.
import { defaultCache } from "@serwist/vite/worker";
import { type PrecacheEntry, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();`,
            lang: "typescript",
          },
        },
        { idPrefix: "basic-usage" },
      ),
      customizing: highlightCode(
        locals.highlighter,
        {
          "sw.ts": {
            code: `import { defaultCache } from "@serwist/vite/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    // Change this attribute's name to your \`injectionPoint\`.
    // \`injectionPoint\` is an InjectManifest option.
    // See https://serwist.pages.dev/docs/build/inject-manifest/configuring
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

// ---cut-before---
const serwist = new Serwist({
  // A list of URLs that should be cached. Usually, you don't generate
  // this list yourself; rather, you'd rely on a Serwist build tool/your framework
  // to do it for you. In this example, it is generated by \`@serwist/vite\`.
  precacheEntries: self.__SW_MANIFEST,
  // Options to customize how Serwist precaches the URLs.
  precacheOptions: {
    // Whether outdated caches should be removed.
    cleanupOutdatedCaches: true,
    concurrency: 10,
    ignoreURLParametersMatching: [],
  },
  // Whether the service worker should skip waiting and become the active one.
  skipWaiting: true,
  // Whether the service worker should claim any currently available clients.
  clientsClaim: true,
  // Whether navigation preloading should be used.
  navigationPreload: false,
  // Whether Serwist should log in development mode.
  disableDevLogs: true,
  // A list of runtime caching entries. When a request is made and its URL match
  // any of the entries, the response to it will be cached according to the matching
  // entry's \`handler\`. This does not apply to precached URLs.
  runtimeCaching: defaultCache,
  // Other options...
  // See https://serwist.pages.dev/docs/serwist/core/serwist
});

serwist.addEventListeners();`,
            lang: "typescript",
          },
        },
        { idPrefix: "customizing-the-behaviour" },
      ),
    },
    advancedUsage: {
      listeners: highlightCode(
        locals.highlighter,
        {
          "sw.ts": {
            code: `import { type PrecacheEntry, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

// ---cut-before---

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: false,
  clientsClaim: false,
});

self.skipWaiting();

self.addEventListener("install", serwist.handleInstall);

self.addEventListener("activate", (event) => {
  self.clients.claim();
  serwist.handleActivate(event);
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin === location.origin && url.pathname === "/") {
    const cacheKey = serwist.getPrecacheKeyForUrl("/legacy/index.html");
    if (cacheKey !== undefined) {
      event.respondWith(
        (async () => {
          const cachedResponse = await caches.match(cacheKey);
          if (cachedResponse !== undefined) {
            return cachedResponse;
          }
          return Response.error();
        })(),
      );
    }
  }
  serwist.handleFetch(event);
});

self.addEventListener("message", serwist.handleCache);`,
            lang: "typescript",
          },
        },
        { idPrefix: "advanced-usage-listeners" },
      ),
      dynamicRegisterRoute: highlightCode(
        locals.highlighter,
        {
          "sw.ts": {
            code: `import { type PrecacheEntry, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

// ---cut-before---
// Again, where you import this depends on your stack.
import { defaultCache } from "@serwist/vite/worker";
import { NetworkOnly, RegExpRoute } from "serwist";

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  // Side note: \`runtimeCaching\` is just a syntactic sugar
  // for \`registerRoute\`.
  runtimeCaching: defaultCache,
});

const routes = {
  alwaysOnline: new RegExpRoute(/\\/always-online\\/.*/, new NetworkOnly()),
};

type RouteKey = keyof typeof routes;

// Note: this is type faith. Please check if \`routeKey\` is
// actually of type \`RouteKey\`.
type MyCustomMessage =
  | {
      message: "UNREGISTER_ROUTE";
      routeKey: RouteKey;
    }
  | {
      message: "REGISTER_ROUTE";
      routeKey: RouteKey;
    };

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "MY_CUSTOM_EVENT") {
    const data: MyCustomMessage = event.data.myCustomMessage;
    switch (data.message) {
      case "UNREGISTER_ROUTE":
        serwist.unregisterRoute(routes[data.routeKey]);
        break;
      case "REGISTER_ROUTE":
        serwist.registerRoute(routes[data.routeKey]);
        break;
      default:
        throw new Error("Message not valid.");
    }
  }
});

serwist.addEventListeners();`,
            lang: "typescript",
          },
        },
        { idPrefix: "dynamic-register" },
      ),
    },
  },
});
