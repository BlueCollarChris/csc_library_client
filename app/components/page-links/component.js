import Ember from 'ember';

export default Ember.Component.extend({

  parseQueryString(url) {
    let params = {}
    let raw = JSON.parse('{"' + decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    Object.keys(raw).forEach((key)=>{
      if(key.indexOf('page[number]') > -1){
        params.pageNumber = raw[key];
      }
      if(key.indexOf('page[size]') > -1){
        params.pageSize = raw[key];
      }
    });
    return params;
  },

  current: Ember.computed('pagination.self', function(){
    return this.get('pagination').self !== undefined ? this.parseQueryString(this.get('pagination').self) : null
  }),

  previous: Ember.computed('pagination.previous', function(){
    return this.get('pagination').previous !== undefined ? this.parseQueryString(this.get('pagination').previous) : null
  }),

  next: Ember.computed('pagination.next', function(){
    return this.get('pagination').next !== undefined ? this.parseQueryString(this.get('pagination').next) : null
  }),

});
