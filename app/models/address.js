import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  street: DS.attr('string'),
  apt: DS.attr('string'),
  city: DS.attr('string'),
  state: DS.attr('string'),
  country: DS.attr('string'),
  zip: DS.attr('string'),
  user_id: DS.attr('number'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
});
