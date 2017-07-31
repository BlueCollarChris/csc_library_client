import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  rank: DS.attr('string'),
  role: DS.attr('string'),
  user_id: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  isWorker: Ember.computed('role', function(){
    return this.get('role') === 'worker';
  }),

  isAdmin: Ember.computed('role', function(){
    return this.get('role') === 'admin';
  }),

  isSuper: Ember.computed('role', function(){
    return this.get('role') === 'super_user';
  }),

});
