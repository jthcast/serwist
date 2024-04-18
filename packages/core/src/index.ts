import type { NavigationRouteMatchOptions } from "./NavigationRoute.js";
import { NavigationRoute } from "./NavigationRoute.js";
import { PrecacheRoute } from "./PrecacheRoute.js";
import { RegExpRoute } from "./RegExpRoute.js";
import { Route } from "./Route.js";
import { Serwist, type SerwistOptions } from "./Serwist.js";
import { cacheNames } from "./cacheNames.js";
import { cleanupOutdatedCaches } from "./cleanupOutdatedCaches.js";
import { clientsClaim } from "./clientsClaim.js";
import type { HTTPMethod } from "./constants.js";
import { copyResponse } from "./copyResponse.js";
import { disableDevLogs } from "./disableDevLogs.js";
import { BackgroundSyncPlugin } from "./lib/backgroundSync/BackgroundSyncPlugin.js";
import type { BackgroundSyncQueueEntry, BackgroundSyncQueueOptions } from "./lib/backgroundSync/BackgroundSyncQueue.js";
import { BackgroundSyncQueue } from "./lib/backgroundSync/BackgroundSyncQueue.js";
import { BackgroundSyncQueueStore } from "./lib/backgroundSync/BackgroundSyncQueueStore.js";
import { StorableRequest } from "./lib/backgroundSync/StorableRequest.js";
import { BroadcastCacheUpdate } from "./lib/broadcastUpdate/BroadcastCacheUpdate.js";
import { BroadcastUpdatePlugin } from "./lib/broadcastUpdate/BroadcastUpdatePlugin.js";
import { BROADCAST_UPDATE_DEFAULT_HEADERS, BROADCAST_UPDATE_MESSAGE_META, BROADCAST_UPDATE_MESSAGE_TYPE } from "./lib/broadcastUpdate/constants.js";
import { responsesAreSame } from "./lib/broadcastUpdate/responsesAreSame.js";
import type { BroadcastCacheUpdateOptions, BroadcastMessage, BroadcastPayload, BroadcastPayloadGenerator } from "./lib/broadcastUpdate/types.js";
import { CacheableResponse } from "./lib/cacheableResponse/CacheableResponse.js";
import type { CacheableResponseOptions } from "./lib/cacheableResponse/CacheableResponse.js";
import { CacheableResponsePlugin } from "./lib/cacheableResponse/CacheableResponsePlugin.js";
import { CacheExpiration } from "./lib/expiration/CacheExpiration.js";
import type { ExpirationPluginOptions } from "./lib/expiration/ExpirationPlugin.js";
import { ExpirationPlugin } from "./lib/expiration/ExpirationPlugin.js";
import { initializeGoogleAnalytics } from "./lib/googleAnalytics/initializeGoogleAnalytics.js";
import type { GoogleAnalyticsInitializeOptions } from "./lib/googleAnalytics/initializeGoogleAnalytics.js";
import type { PrecacheFallbackEntry, PrecacheFallbackPluginOptions } from "./lib/precaching/PrecacheFallbackPlugin.js";
import { PrecacheFallbackPlugin } from "./lib/precaching/PrecacheFallbackPlugin.js";
import { RangeRequestsPlugin } from "./lib/rangeRequests/RangeRequestsPlugin.js";
import { createPartialResponse } from "./lib/rangeRequests/createPartialResponse.js";
import { CacheFirst } from "./lib/strategies/CacheFirst.js";
import { CacheOnly } from "./lib/strategies/CacheOnly.js";
import type { NetworkFirstOptions } from "./lib/strategies/NetworkFirst.js";
import { NetworkFirst } from "./lib/strategies/NetworkFirst.js";
import type { NetworkOnlyOptions } from "./lib/strategies/NetworkOnly.js";
import { NetworkOnly } from "./lib/strategies/NetworkOnly.js";
import { PrecacheOnly } from "./lib/strategies/PrecacheOnly.js";
import { StaleWhileRevalidate } from "./lib/strategies/StaleWhileRevalidate.js";
import type { StrategyOptions } from "./lib/strategies/Strategy.js";
import { Strategy } from "./lib/strategies/Strategy.js";
import { StrategyHandler } from "./lib/strategies/StrategyHandler.js";
import { disableNavigationPreload, enableNavigationPreload, isNavigationPreloadSupported } from "./navigationPreload.js";
import { parseRoute } from "./parseRoute.js";
import { registerQuotaErrorCallback } from "./registerQuotaErrorCallback.js";
import { setCacheNameDetails } from "./setCacheNameDetails.js";

export {
  // Core
  Serwist,
  cacheNames,
  cleanupOutdatedCaches,
  clientsClaim,
  copyResponse,
  disableDevLogs,
  disableNavigationPreload,
  enableNavigationPreload,
  isNavigationPreloadSupported,
  // Caching strategies
  CacheFirst,
  CacheOnly,
  NetworkFirst,
  NetworkOnly,
  PrecacheOnly,
  StaleWhileRevalidate,
  Strategy,
  StrategyHandler,
  // Routing
  NavigationRoute,
  PrecacheRoute,
  RegExpRoute,
  Route,
  parseRoute,
  // Background synchronizing
  BackgroundSyncPlugin,
  BackgroundSyncQueue,
  BackgroundSyncQueueStore,
  StorableRequest,
  // Broadcasting updates
  BroadcastCacheUpdate,
  BroadcastUpdatePlugin,
  BROADCAST_UPDATE_MESSAGE_META,
  BROADCAST_UPDATE_MESSAGE_TYPE,
  BROADCAST_UPDATE_DEFAULT_HEADERS,
  responsesAreSame,
  // Setting cacheability criteria
  CacheableResponse,
  CacheableResponsePlugin,
  // Expiring outdated responses
  CacheExpiration,
  ExpirationPlugin,
  // Precaching
  PrecacheFallbackPlugin,
  // Google Analytics
  initializeGoogleAnalytics,
  // Handling range requests
  createPartialResponse,
  RangeRequestsPlugin,
  // Misc
  registerQuotaErrorCallback,
  setCacheNameDetails,
};
export type {
  // Core
  HTTPMethod,
  SerwistOptions,
  // Caching strategies
  NetworkFirstOptions,
  NetworkOnlyOptions,
  StrategyOptions,
  // Routing
  NavigationRouteMatchOptions,
  // Background synchronizing
  BackgroundSyncQueueOptions,
  BackgroundSyncQueueEntry,
  // Broadcasting updates
  BroadcastCacheUpdateOptions,
  BroadcastPayload,
  BroadcastPayloadGenerator,
  BroadcastMessage,
  // Setting cacheability criteria
  CacheableResponseOptions,
  // Expiring outdated responses
  ExpirationPluginOptions,
  // Precaching
  PrecacheFallbackEntry,
  PrecacheFallbackPluginOptions,
  // Google Analytics
  GoogleAnalyticsInitializeOptions,
};
export type * from "./types.js";
