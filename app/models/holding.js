import DS from 'ember-data';

export default DS.Model.extend({
  log_entries: DS.hasMany('log-entry'),
  circulations: DS.hasMany('circulation'),
  periodicals: DS.hasMany('periodical'),
  references: DS.hasMany('reference'),
  title: DS.attr('string'),
  section: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  isCirculation: Ember.computed('section', function(){
    return this.get('section') === 'CIR';
  }),

  isPeriodical: Ember.computed('section', function(){
    return this.get('section') === 'PER';
  }),

  isReference: Ember.computed('section', function(){
    return this.get('section') === 'REF';
  }),
});
