import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  queryParams: {
    limit: {
      refreshModel: true,
      replace: true,
    },
    page: {
      refreshModel: true,
      replace: true,
    },
    user_type: {
      refreshModel: true,
      replace: true,
    },
    email: {
      refreshModel: true,
      replace: true,
    },
    phone: {
      refreshModel: true,
      replace: true,
    },
    first_name: {
      refreshModel: true,
      replace: true,
    },
    last_name: {
      refreshModel: true,
      replace: true,
    },
  },
  beforeModel(){
    if(this.get('session').get('isAuthenticated')){
      if(!this.get('session').get('data.authenticated.isStaff')){
        this.transitionTo('index');
      }
    }
  },
  model(params){
    return Ember.RSVP.hash({
      users: this.store.query('user', {
        page: params.page,
        limit: params.limit,
        email: params.email,
        phone: params.phone,
        first_name: params.first_name,
        last_name: params.last_name,
        user_type: params.user_type
      })
    });
  },
  setupController(controller, {users}){
    this._super(...arguments);
    controller.set('users', users);
    controller.set('pagination', users.links);
  }
});
