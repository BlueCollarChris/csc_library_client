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
        holding_item: this.store.createRecord('circulation', {
          holding_id: params.holding_id,
        }),
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
        holding_item: this.store.createRecord('periodical', {
          holding_id: params.holding_id,
        }),authors: this.store.query('author', {
          include_all: true,
        }),
        publishers: this.store.query('publisher', {
          include_all: true
        }),
        section: params.section
      });
    } else if(params.section === 'REF'){
      return Ember.RSVP.hash({
        holding_item: this.store.createRecord('reference', {
          holding_id: params.holding_id,
        }),
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
  },
  actions: {
    willTransition(){
      let item = this.controller.get('holding_item');
      let pubs = this.controller.get('publishers');
      let authors = this.controller.get('authors');
      pubs.forEach((pub)=>{
        pub.set('isChecked', false);
      });
      authors.forEach((auth)=>{
        auth.set('isChecked', false);
      });
      this.controller.set('section', null);
      if(item.get('hasDirtyAttributes')){
        item.rollbackAttributes();
      }
      return true;
    }
  }
});
