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
  actions: {
    willTransition(){
      this.controller.set('name', '');
      this.controller.set('email', '');
      this.controller.set('phone', '');
      this.controller.set('title', '');
      this.controller.set('section', 'CIR');
      this.controller.set('book', null);
      this.controller.set('user', null);
      this.controller.set('currentItems', null);
      this.controller.set('books', null);
      this.controller.set('results', null);
      this.controller.set('due_dt', null);
      this.controller.set('success', false);
      Ember.$('input').val('');
      return true;
    }
  }
});
