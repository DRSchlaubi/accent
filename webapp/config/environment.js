/* eslint-env node */

'use strict';

// eslint-disable-next-line complexity
module.exports = function(environment) {
  const wsHost = process.env.API_WS_HOST || 'ws://localhost:4000';
  const host = process.env.API_HOST || 'http://localhost:4000';
  const providers = (process.env.WEBAPP_AUTH_PROVIDERS || 'dummy').split(',');

  const ENV = {
    modulePrefix: 'accent-webapp',
    podModulePrefix: 'accent-webapp/pods',
    environment,
    rootURL: '/',
    locationType: 'auto'
  };

  ENV.EmberENV = {
    EXTEND_PROTOTYPES: false,
    LOG_VERSION: false
  };

  ENV.APP = {
    LOCAL_STORAGE: {
      SESSION_NAMESPACE: 'accent-session'
    }
  };

  ENV.API = {
    WS_HOST: wsHost,
    HOST: host,
    AUTHENTICATION_PATH: `${host}/auth`,
    HOOKS_PATH: `${host}/hooks/{0}?project_id={1}&authorization={2}`,
    PROJECT_PATH: `${host}/projects/{0}`,
    SYNC_PEEK_PROJECT_PATH: `${host}/sync/peek?project_id={0}&language={1}&sync_type={2}`,
    SYNC_PROJECT_PATH: `${host}/sync?project_id={0}&language={1}&sync_type={2}`,
    MERGE_PEEK_PROJECT_PATH: `${host}/merge/peek?project_id={0}&language={1}&merge_type={2}`,
    MERGE_REVISION_PATH: `${host}/merge?project_id={0}&language={1}&merge_type={2}`,
    EXPORT_DOCUMENT: `${host}/export`,
    JIPT_EXPORT_DOCUMENT: `${host}/jipt-export`,
    PERCENTAGE_REVIEWED_BADGE_SVG_PROJECT_PATH: `${host}/{0}/percentage_reviewed_badge.svg`,
    JIPT_SCRIPT_PATH: `${host}/static/jipt/index.js`
  };

  ENV.AUTH_PROVIDERS = providers;

  ENV.SENTRY = {
    DSN: process.env.WEBAPP_SENTRY_DSN
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src':
      "'self' 'unsafe-inline' 'unsafe-eval' apis.google.com cdn.ravenjs.com",
    'font-src': "'self'",
    'connect-src': `'self' ${wsHost} ${host} https://www.googleapis.com https://sentry.io`,
    'img-src': '*',
    'style-src': "'self' 'unsafe-inline'",
    'media-src': "'self'",
    'frame-src': 'accounts.google.com'
  };

  ENV.i18n = {
    defaultLocale: 'en'
  };

  ENV.flashMessageDefaults = {
    timeout: 5000,
    destroyOnClick: false,
    extendedTimeout: 300,
    priority: 200,
    sticky: false,
    showProgress: false,

    // service defaults
    type: 'info',
    types: ['info', 'success', 'error', 'socket'],
    injectionFactories: []
  };

  if (environment === 'test') {
    ENV.locationType = 'none';

    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;

    ENV.APP.LOCAL_STORAGE.SESSION_NAMESPACE = 'accent-session-test';
  }

  return ENV;
};
