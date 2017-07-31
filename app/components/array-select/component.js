import Ember from 'ember';

export default Ember.Component.extend({
  items: Ember.computed("content", function(){
    let content = this.get('content');
    if(content){
      if(this.get('value')){
        for(let i = 0; i < length; i++){
          if(parseInt(content[i].id) === parseInt(this.get('value'))){
            this.set('placeholder', false);
            let tmp = content[0];
            content[0] = content[i];
            content[i] = tmp;
          }
        }
      }
      return content;
    }
  }),
  change(e){
    let value = e.target.value
    if(this.get('boolnum')){
      if(parseInt(value) === 0){
        value = false;
      } else {
        value = true;
      }
    }
    this.set('value', value);
    this.sendAction('action', value);
  }
});
