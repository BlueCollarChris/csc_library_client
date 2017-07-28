import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    signIn(){
      const session = this.get('session');
      let credentials = this.getProperties('email', 'password');
      if(credentials.password.length > 0){
        if(credentials.password.indexOf(' ') > -1){
          credentials.password = credentials.password.replace(/\s/g, '');
        }
      }
      if(credentials.email.length > 0){
        if(credentials.email.indexOf(' ') > -1){
          credentials.email = credentials.email.replace(/\s/g, '');
        }
      }
      session.authenticate('authenticator:application', credentials).then(() => {
        return this.send('userAuthenitcated');
      }, (err)=>{
        console.log(err)
        if(err){
          let response = JSON.parse(err);
          alert(response.error.message);
        }
      });
    }
  }
});
