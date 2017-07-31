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
      authors: this.store.query('author', {
        page: params.page,
        limit: params.limit,
        first_name: params.first_name,
        last_name: params.last_name,
      })
    });
  },
  setupController(controller, {authors}){
    this._super(...arguments);
    controller.set('authors', authors.toArray());
    controller.set('pagination', authors.links);
  },
  actions: {
    refresh(){
      this.refresh();
    }
  }
});
