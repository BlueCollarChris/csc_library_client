import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  expiration_dt: DS.attr('date'),
  user_id: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
});
