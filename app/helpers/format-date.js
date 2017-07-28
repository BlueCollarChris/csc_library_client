import Ember from 'ember';

export function formatDate(params, options) {
  if(params[0] !== null && params[0] !== undefined){
    let format = options.format !== undefined ? options.format : 'LLL'
    return moment(params[0]).format(format)
  }
  return params;
}

export default Ember.Helper.helper(formatDate);
