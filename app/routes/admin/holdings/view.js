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
      holding: this.store.findRecord('holding', params.id)
    });
  },
  setupController(controller, {holding}){
    this._super(...arguments);
    controller.set('holding', holding);
  }
});
