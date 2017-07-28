import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    Ember.$('body').addClass('signwrapper');
  },
  deactivate: function() {
    Ember.$('body').removeClass('signwrapper');
  },
  actions: {
    userAuthenitcated(){
      return true;
    }
  }
});
