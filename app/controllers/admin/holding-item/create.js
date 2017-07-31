import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    save(){
      this.get('holding_item').save().then((response)=>{
        this.transitionToRoute('admin.holdings.view', response.get('holding_id'));
      });
    },
    addAuthor(author){
      let selectedAuthors = this.get('holding_item').get('authors');
      if(selectedAuthors.get('length') >= 3){
        alert('Only Three Authors Allowed');
        return author.set('isChecked', false);
      }
      if(author.get('isChecked')){
        author.set('isChecked', false);
        selectedAuthors.removeObject(author);
      } else {
        author.set('isChecked', true);
        selectedAuthors.pushObject(author);
      }
    },
    addPublisher(publisher){
      this.get('holding_item').set('publisher_id', publisher.get('id'));
      this.get('publishers').forEach((pub)=>{
        if(publisher.get('id') === pub.get('id')){
          pub.set('isChecked', true);
        } else {
          pub.set('isChecked', false);
        }
      })
    },
  }
});
