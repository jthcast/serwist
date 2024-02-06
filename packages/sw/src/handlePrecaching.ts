import type { PrecacheEntry, PrecacheRouteOptions } from "@serwist/precaching";
import { cleanupOutdatedCaches as cleanupOutdatedCachesImpl, createHandlerBoundToURL, precacheAndRoute } from "@serwist/precaching";
import { NavigationRoute, registerRoute } from "@serwist/routing";

export type HandlePrecachingOptions = {
  /**
   * A list of fallback entries.
   */
  precacheEntries?: (PrecacheEntry | string)[];
  /**
   * Precache options for the provided entries.
   */
  precacheOptions?: PrecacheRouteOptions;
  /**
   * Whether outdated caches should be removed.
   * 
   * @default false
   */
  cleanupOutdatedCaches?: boolean;
} & (
  | {
      /**
       * An URL that should point to a HTML
       * file with which navigation requests for URLs that aren't precached will be fulfilled.
       * For more complex cases, consider `@serwist/sw.fallbacks`instead.
       */
      navigateFallback: string;
      /**
       * URLs that should be allowed to use the `navigateFallback` handler.
       */
      navigateFallbackAllowlist?: RegExp[];
      /**
       * URLs that should not be allowed to use the `navigateFallback` handler. This takes precedence
       * over `navigateFallbackAllowlist`.
       */
      navigateFallbackDenylist?: RegExp[];
    }
  | { navigateFallback?: never }
);

/**
 * Handles a list of precache entries and cleans up outdated caches.
 * @param options
 */
export const handlePrecaching = ({ precacheEntries, precacheOptions, cleanupOutdatedCaches = false, ...options }: HandlePrecachingOptions) => {
  if (!!precacheEntries && precacheEntries.length > 0) {
    /**
     * The precacheAndRoute() method efficiently caches and responds to
     * requests for URLs in the manifest.
     * See https://goo.gl/S9QRab
     */
    precacheAndRoute(precacheEntries, precacheOptions);
  }

  if (cleanupOutdatedCaches) cleanupOutdatedCachesImpl();

  if (options.navigateFallback) {
    registerRoute(
      new NavigationRoute(createHandlerBoundToURL(options.navigateFallback), {
        allowlist: options.navigateFallbackAllowlist,
        denylist: options.navigateFallbackDenylist,
      }),
    );
  }
};
