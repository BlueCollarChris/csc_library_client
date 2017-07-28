import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from '../config/environment';
import Ember from 'ember';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.HOST,
  authorizer: 'authorizer:application',
  pathForType(type) {
    return Ember.String.pluralize(Ember.String.underscore(type));
  }
});
