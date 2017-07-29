import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service(),
  setupController(){
    this._super(...arguments);
    if(this.get('session').get('isAuthenticated')){
      if(this.get('session').get('data.authenticated.isStaff')){
        this.transitionTo('staff.dashboard');
      } else {
        this.transitionTo('customer.dashboard');
      }
    } else {
      this.transitionTo('sign-in');
    }
  },
  actions: {
    userAuthenitcated(){
      if(this.get('session').get('data.authenticated.isStaff')){
        this.transitionTo('staff.dashboard');
      } else {
        this.transitionTo('customer.dashboard');
      }
    },
    invalidateUser(){
      this.get('session').invalidate();      
    }
  }
});
