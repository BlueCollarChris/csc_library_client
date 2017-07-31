import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  student_class: DS.attr('number'),
  major: DS.attr('string'),
  minor: DS.attr('string'),
  user_id: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
});
