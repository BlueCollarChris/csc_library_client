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
    this.route('periodicals');
    this.route('references');
    this.route('circulations');
  });
  this.route('customer', function() {
    this.route('dashboard');
    this.route('profile');
  });
  this.route('admin', function() {
    this.route('users', function() {
      this.route('view');
      this.route('create');
      this.route('edit');
    });
    this.route('authors', function() {
      this.route('create');
      this.route('view');
      this.route('edit');
    });
    this.route('publishers', function() {
      this.route('edit');
      this.route('view');
      this.route('create');
    });
    this.route('holdings', function() {
      this.route('view');
      this.route('create');
      this.route('edit');
    });

    this.route('holding-item', function() {
      this.route('edit');
      this.route('create');
      this.route('update');
      this.route('view');
    });
  });
  this.route('sign-in');
  this.route('sign-up');
});

export default Router;
