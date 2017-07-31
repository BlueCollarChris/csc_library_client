import DS from 'ember-data';

export default DS.Model.extend({
  circulations: DS.hasMany('circulation'),
  references: DS.hasMany('reference'),
  periodicals: DS.hasMany('periodical'),

  name: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
});
