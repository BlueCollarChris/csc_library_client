import DS from 'ember-data';

export default DS.Model.extend({
  address: DS.belongsTo('address'),
  staff: DS.belongsTo('staff'),
  student: DS.belongsTo('student'),
  community_user: DS.belongsTo('community-user'),
  log_entries: DS.hasMany('log-entry'),

  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  email: DS.attr('string'),
  phone: DS.attr('string'),
  active: DS.attr('boolean'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  user_type: DS.attr('string'),

  fullName: Ember.computed('first_name', 'last_name', function(){
    return `${this.get('first_name')} ${this.get('last_name')}`;
  }),

  isStaff: Ember.computed('user_type', function(){
    return this.get('user_type') === 'STA';
  }),

  isStudent: Ember.computed('user_type', function(){
    return this.get('user_type') === 'STU';
  }),

  isCom: Ember.computed('user_type', function(){
    return this.get('user_type') === 'COM';
  }),

});
