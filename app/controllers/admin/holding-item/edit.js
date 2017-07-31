import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  authorsChecked: Ember.observer('holding_item.authors.length', function(){
    let holding_authors = this.get('holding_item').get('authors');
    let authors = this.get('authors');
    authors.forEach((author)=>{
      let match = holding_authors.find((element)=>{
        return element.get('id') === author.get('id');
      });
      if(match){
        author.set('isChecked', true);
      } else {
        author.set('isChecked', false);
      }
    });
  }),
  actions: {
    delete(){
      this.get('holding_item').destroyRecord.then(()=>{
        this.transitionToRoute('admin.holdings.view', response.get('holding_id'));
      });
    },
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
      if(publisher.get('isChecked')){
        this.get('holding_item').set('publisher_id', '');
        publisher.set('isChecked', false);
        return;
      }      
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
