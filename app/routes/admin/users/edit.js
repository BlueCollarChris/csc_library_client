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
      user: this.store.findRecord('user', params.id)
    });
  },
  setupController(controller, {user}){
    this._super(...arguments);
    controller.set('user', user);
  },
  actions: {
    willTransition(){
      let user = this.controller.get('user');
      let address = user.get('address');
      if(user.get('hasDirtyAttributes')){
        user.rollbackAttributes();
      }
      if(address.get('hasDirtyAttributes')){
        address.rollbackAttributes();
      }
      return true;
    }
  }
});
