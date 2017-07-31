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
    if(params.section === 'CIR'){
      return Ember.RSVP.hash({
        holding_item: this.store.findRecord('circulation', params.id),
        authors: this.store.query('author', {
          include_all: true,
        }),
        publishers: this.store.query('publisher', {
          include_all: true
        }),
        section: params.section
      });
    } else if(params.section === 'PER'){
      return Ember.RSVP.hash({
        holding_item: this.store.findRecord('periodical', params.id),
        authors: this.store.query('author', {
          include_all: true,
        }),
        publishers: this.store.query('publisher', {
          include_all: true
        }),
        section: params.section
      });
    } else if(params.section === 'REF'){
      return Ember.RSVP.hash({
        holding_item: this.store.findRecord('reference', params.id),
        authors: this.store.query('author', {
          include_all: true,
        }),
        publishers: this.store.query('publisher', {
          include_all: true
        }),
        section: params.section
      });
    } else {
      alert('Invalid Parameters');
      this.transitionTo('index');
    }
  },
  setupController(controller, {holding_item, authors, publishers, section}){
    this._super(...arguments);
    controller.set('section', section);
    controller.set('authors', authors.toArray());
    controller.set('publishers', publishers.toArray());
    controller.set('holding_item', holding_item);
    controller.send('addPublisher', holding_item.get('publisher'))
  },
  actions: {
    willTransition(){
      let item = this.controller.get('holding_item');
      this.controller.set('section', null);
      if(item.get('hasDirtyAttributes')){
        item.rollbackAttributes();
      }
      return true;
    }
  }
});
