/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'library-client',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'sign-in',
    routeIfAlreadyAuthenticated: 'index'
  };

  if (environment === 'development') {
    ENV.host = 'http://localhost:3000'
  }

  if (environment === 'production') {
    ENV.host = 'http://localhost:3000'
  }

  return ENV;
};
