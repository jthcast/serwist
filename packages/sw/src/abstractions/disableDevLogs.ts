declare const self: ServiceWorkerGlobalScope;

/**
 * Disables Serwist's logging in development mode.
 *
 * @see https://serwist.pages.dev/docs/sw/abstractions/disable-dev-logs
 */
export const disableDevLogs = (): void => {
  self.__WB_DISABLE_DEV_LOGS = true;
};
