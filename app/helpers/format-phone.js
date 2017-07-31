import Ember from 'ember';

export function formatPhone(params) {
  let phone = params[0].match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!phone) ? null : "(" + phone[1] + ") " + phone[2] + "-" + phone[3];
}

export default Ember.Helper.helper(formatPhone);
