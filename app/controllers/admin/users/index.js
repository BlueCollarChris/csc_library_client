import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  page: 1,
  limit: 20,
  user_types: ['STA', 'STU', 'COM'],
  actions: {
    updateParam(param, e){
      if(e.target.value.length > 3){
        this.set(param, e.target.value)
      } else if(e.target.value.length < 3){
        this.set(param, '');
      } else {
        return;
      }
    },
    clearFilters(){
      this.setProperties({
        page: 1,
        limit: 20,
        email: '',
        phone: '',
        first_name: '',
        last_name: '',
        user_type: ''
      });
      Ember.$('input').val('');
    }
  },
});
