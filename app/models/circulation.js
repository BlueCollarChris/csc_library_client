import DS from 'ember-data';

export default DS.Model.extend({
  authors: DS.hasMany('author'),
  publisher: DS.belongsTo('publisher'),
  holding: DS.belongsTo('holding'),

  title: DS.attr('string'),
  subtitle: DS.attr('string'),
  cost: DS.attr('string'),
  holding_id: DS.attr('number'),
  publisher_id: DS.attr('number'),  
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

});
