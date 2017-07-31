import DS from 'ember-data';

export default DS.Model.extend({
  circulations: DS.hasMany('circulation'),
  references: DS.hasMany('reference'),
  periodicals: DS.hasMany('periodical'),

  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  selected_authors: DS.attr(),

  fullName: Ember.computed('first_name', 'last_name', function(){
    return `${this.get('first_name')} ${this.get('last_name')}`;
  }),
});
