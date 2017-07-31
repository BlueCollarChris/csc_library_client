import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {    
    delete(){
      let user = this.get('user');
      let c = confirm(`Delete ${user.get('fullName')}?`);
      if(c){
        user.destroyRecord().then(()=>{
          this.transitionToRoute('admin.users');
        });
      }
    }
  }
});
