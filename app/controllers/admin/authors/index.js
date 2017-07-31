import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    addAuthor(){
      let author = this.store.createRecord('author');
      this.get('authors').pushObject(author);
      author.set('isEditing', true);
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
        first_name: '',
        last_name: '',
      });
      Ember.$('input').val('');
    },
    save(author){
      author.save().then(()=>{
        author.set('isEditing', false);
      });
    },
    edit(author){
      author.toggleProperty('isEditing');
    },
    delete(author){
      author.destroyRecord().then(()=>{
        this.get('authors').removeObject(author);
      });
    },
  }
});
