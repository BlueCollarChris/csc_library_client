import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    updateUserRole(role){
      this.get('user').get('staff').set('role', role);
    },
    delete(){
      let user = this.get('user');
      let c = confirm(`Delete ${user.get('fullName')}?`);
      if(c){
        user.destroyRecord().then(()=>{
          this.transitionToRoute('admin.users');
        });
      }
    },
    save(){
      let user = this.get('user');
      user.save().then((response)=>{
        let stack = [];
        stack.push(user.get('address').get('content').save())
        if(user.get('isStaff')){
          stack.push(user.get('staff').get('content').save())
        }
        if(user.get('isStudent')){
          stack.push(user.get('student').get('content').save())
        }
        if(user.get('isCom')){
          stack.push(user.get('community_user').get('content').save())
        }
        Ember.RSVP.all(stack).then((array)=>{
          this.transitionToRoute('admin.users.view', user.get('id'));
        })
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
