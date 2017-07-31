import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  user_type: Ember.computed('user.user_type', function(){
    if(this.get('user').get('user_type') === 'COM'){
      return this.store.createRecord('community-user');
    } else if(this.get('user').get('user_type') === 'STA'){
      return this.store.createRecord('staff');
    } else {
      return this.store.createRecord('student');
    }
  }),
  actions: {
    updateUserRole(role){
      this.get('user_type').set('role', role);
    },
    updateUserType(type){
      this.get('user').set('user_type', type);
    },
    save(){
      let user = this.get('user');
      let address = this.get('address');
      let user_type = this.get('user_type');
      user.save().then((response)=>{
        let stack = [];
        address.set('user_id', response.get('id'));
        user_type.set('user_id', response.get('id'));
        stack.push(address.save());
        stack.push(user_type.save());
        Ember.RSVP.all(stack).then((array)=>{
          this.transitionToRoute('admin.users');
        });
      }, (err)=> {
        let text = ''
        err.errors.forEach((obj)=>{
          Object.keys(obj).forEach((key)=>{
            text = text + ' ' + key + ': ' + obj[key];
          });
        });
        alert(text);
      });
    }
  }
});
