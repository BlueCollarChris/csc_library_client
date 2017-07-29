import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  beforeModel(){
    if(this.get('session').get('isAuthenticated')){
      if(this.get('session').get('data.authenticated.isStaff')){
        this.transitionTo('staff.dashboard');
      } else if (this.get('session').get('isAuthenticated')) {
        this.transitionTo('customer.dashboard');
      } else {
        this.transitionTo('sign-in');
      }
    }
  }
});
