import { highlightCode } from "$lib/highlightCode";
import type { TableOfContents } from "$lib/types";
import { getHighlighter } from "shiki";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const highlighter = await getHighlighter({
    langs: ["typescript", "javascript"],
    themes: ["github-dark", "github-light"],
  });
  return {
    title: "@serwist/cacheable-response",
    toc: [
      {
        title: "@serwist/cacheable-response",
        id: "serwist-cacheable-response",
        children: [
          {
            title: "Introduction",
            id: "introduction",
          },
          {
            title: "The defaults",
            id: "the-defaults",
            children: [
              {
                title: "Why are there different defaults?",
                id: "why-are-there-different-defaults",
              },
            ],
          },
          {
            title: "Basic usage",
            id: "basic-usage",
          },
          {
            title: "Advanced usage",
            id: "advanced-usage",
          },
        ],
      },
    ] satisfies TableOfContents[],
    code: {
      basicUsage: highlightCode(
        highlighter,
        {
          "sw.ts": {
            code: `import { registerRoute } from "@serwist/routing";
import { StaleWhileRevalidate } from "@serwist/strategies";
import { CacheableResponsePlugin } from "@serwist/cacheable-response";

registerRoute(
  ({ url }) => url.pathname.startsWith("/api/"),
  new StaleWhileRevalidate({
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
        headers: {
          "X-Is-Cacheable": "true",
        },
      }),
    ],
  }),
);`,
            lang: "typescript",
          },
        },
        { idPrefix: "basic-usage" },
      ),
      advancedUsage: highlightCode(
        highlighter,
        {
          "sw.ts": {
            code: `import { CacheableResponse } from "@serwist/cacheable-response";

const cacheable = new CacheableResponse({
  statuses: [0, 200],
  headers: {
    "X-Is-Cacheable": "true",
  },
});

const response = await fetch("/path/to/api");

if (cacheable.isResponseCacheable(response)) {
  const cache = await caches.open("api-cache");
  cache.put(response.url, response);
} else {
  // Do something when the response can't be cached.
}`,
            lang: "typescript",
          },
        },
        {
          idPrefix: "advanced-usage",
        },
      ),
    },
  };
};
