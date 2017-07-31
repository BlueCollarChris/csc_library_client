import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  beforeModel(){
    if(this.get('session').get('isAuthenticated')){
      if(!this.get('session').get('data.authenticated.isCommunityUser') && !this.get('session').get('data.authenticated.isStudent')){
        this.transitionTo('index');
      }
    }
  },
  model(){
    const session = this.get('session');
    return Ember.RSVP.hash({
      user: this.store.findRecord('user', session.get('data.authenticated.id'))
    });
  },
  setupController(controller, {user}){
    this._super(...arguments);
    controller.set('user', user);
  }
});
