import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  circulations: Ember.computed('holding.circulations', function(){
    return this.get('holding').get('circulations');
  }),
  references: Ember.computed('holding.references', function(){
    return this.get('holding').get('references');
  }),
  periodicals: Ember.computed('holding.periodicals', function(){
    return this.get('holding').get('periodicals');
  }),
});
