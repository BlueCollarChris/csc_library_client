import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  session: Ember.inject.service(),
  authorize(sessionData, block) {
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(sessionData.token)) {
        block('Authorization', sessionData.token);
    }
  }
});
