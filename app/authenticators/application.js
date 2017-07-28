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
        Ember.run(function() {
          resolve({
            id: response.user.id,
            email: response.user.email,
            phone: response.user.phone,
            token: response.user.token,
            first_name: response.user.first_name,
            last_name: response.user.last_name,
            user_type: response.user.last_name,
            address: response.address,
            isStudent: response.isStudent,
            isStaff: response.isStaff,
            isCommunityUser: response.isCommunityUser
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
