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
  model(){
    return Ember.RSVP.hash({
      user: this.store.createRecord('user', {
        user_type: 'STU'
      }),
      address: this.store.createRecord('address')
    });
  },
  setupController(controller, {user, address}){
    this._super(...arguments);
    controller.set('user', user);
    controller.set('address', address);
  },
  actions: {
    willTransition(){
      let user = this.controller.get('user');
      let user_type = this.controller.get('user_type');
      let address = this.controller.get('address');
      if(user.get('hasDirtyAttributes')){
        user.rollbackAttributes();
      }
      if(user_type.get('hasDirtyAttributes')){
        user_type.rollbackAttributes();
      }
      if(address.get('hasDirtyAttributes')){
        address.rollbackAttributes();
      }
      return true;
    }
  }
});
