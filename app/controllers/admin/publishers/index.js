import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    addPublisher(){
      let pub = this.store.createRecord('publisher');
      this.get('publishers').pushObject(pub);
      pub.set('isEditing', true);
    },
    updateParam(param, e){
      if(e.target.value.length > 3){
        this.set(param, e.target.value)
      } else if(e.target.value.length < 3){
        this.set(param, '');
      } else {
        return;
      }
    },
    clearFilters(){
      this.setProperties({
        page: 1,
        limit: 20,
        name: '',
      });
      Ember.$('input').val('');
    },
    save(pub){
      pub.save().then(()=>{
        pub.set('isEditing', false);
      });
    },
    edit(pub){
      pub.toggleProperty('isEditing');
    },
    delete(pub){
      pub.destroyRecord().then(()=>{
        this.get('publishers').removeObject(pub);
      });
    },
  }
});
