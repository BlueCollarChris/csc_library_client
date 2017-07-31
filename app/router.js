import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('staff', function() {
    this.route('terminal');
    this.route('dashboard');
    this.route('profile');
  });
  this.route('customer', function() {
    this.route('dashboard');
    this.route('profile');
  });
  this.route('admin', function() {
    this.route('authors', function(){

    });
    this.route('publishers', function(){

    });
    this.route('users', function() {
      this.route('view', {
        path: '/view/:id'
      });
      this.route('create', {
        path: '/create'
      });
      this.route('edit', {
        path: '/edit/:id'
      });
    });
    this.route('holdings', function() {
      this.route('view', {
        path: '/view/:id'
      });
      this.route('create');
      this.route('edit', {
        path: '/edit/:id'
      });
    });
    this.route('holding-item', function() {
      this.route('edit', {
        path: '/edit/:section/:id'
      });
      this.route('create', {
        path: '/create/:holding_id/:section'
      });
    });
  });

  this.route('sign-up');
  this.route('sign-in');
});

export default Router;
