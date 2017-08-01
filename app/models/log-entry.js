import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  holding: DS.belongsTo('holding'),

  holding_item: DS.attr(),
  user_id: DS.attr('number'),
  holding_id: DS.attr('number'),
  item_id: DS.attr('number'),
  section: DS.attr('string'),
  checkout_dt: DS.attr('date'),
  checkin_dt: DS.attr('date'),
  due_dt: DS.attr('date'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
});
