import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  beforeModel(){
    if(this.get('session').get('isAuthenticated')){
      if(!this.get('session').get('data.authenticated.isStaff')){
        this.transitionTo('index');
      }
    }
  },
  model(params){
    return Ember.RSVP.hash({
      holdings: this.store.findAll('holding')
    });
  },
  setupController(controller, {holdings}){
    this._super(...arguments);
    controller.set('holdings', holdings);
  }
});
