import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from '../config/environment';

export default Base.extend({
  restore(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate({email, password}) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        url: ENV.HOST + '/token',
        type: 'POST',
        data: {email: email, password: password}
      }).then((response) => {
        console.log(response)
        let data = response.data;
        Ember.run(function() {
          resolve({
            id: data.user.id,
            email: data.user.email,
            phone: data.user.phone,
            token: data.user.token,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            user_type: data.user.last_name,
            address: data.address,
            isStudent: data.isStudent,
            isStaff: data.isStaff,
            isCommunityUser: data.isCommunityUser
          });
        });
      }, (xhr, status, error) => {
        var response = xhr.responseText;
        Ember.run(function(){
          reject(response);
        });
      });
    });
  }

});
