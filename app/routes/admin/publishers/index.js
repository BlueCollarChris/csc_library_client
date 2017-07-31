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
    name: {
      refreshModel: true,
      replace: true,
    }
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
      publishers: this.store.query('publisher', {
        page: params.page,
        limit: params.limit,
        name: params.name,
      })
    });
  },
  setupController(controller, { publishers }){
    this._super(...arguments);
    controller.set('publishers', publishers.toArray());
    controller.set('pagination', publishers.links);
  }
});
