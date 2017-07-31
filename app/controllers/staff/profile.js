import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    edit(){
      this.get('user').toggleProperty('isEditing');
    },
    save(){
      this.get('user').save().then(()=>{
        this.get('user').set('isEditing', false);
      }, (err)=>{
        alert('Error Saving User');
      });
    },
    requestPassword(){
      const session = this.get('session');
      Ember.$.ajax({
        method: 'POST',
        url: `${ENV.HOST}/send_password`,
        headers: {
          'Authorization': session.get('data.authenticated.token')
        }
      })
    },
  }

});
