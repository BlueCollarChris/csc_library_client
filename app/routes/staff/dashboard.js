import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from '../../config/environment';

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
    const session = this.get('session');
    return Ember.RSVP.hash({
      records: Ember.$.ajax({
        method: 'GET',
        url: `${ENV.HOST}/inventory`,
        headers: {
          'Authorization': session.get('data.authenticated.token')
        }
      })
    });
  },
  setupController(controller, {records}){
    controller.set('records', records);
  }
});
