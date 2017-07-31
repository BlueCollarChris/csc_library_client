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
    baseUrl: 'sign-in',
    authenticationRoute: 'sign-in',
    routeIfAlreadyAuthenticated: 'index',
    routeIfAfterAuthentication: 'index'
  };

  if (environment === 'development') {
    ENV.HOST = 'http://localhost:3000'
  }

  if (environment === 'production') {
    ENV.HOST = 'https://csc-library-app.herokuapp.com/'
  }
  

  return ENV;
};
