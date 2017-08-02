import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  name: '',
  email: '',
  phone: '',
  title: '',
  user: null,
  section: null,
  noResults: false,
  book: '',
  due_dt: null,
  currentItems: '',

  noUser: Ember.computed('user', function(){
    return !this.get('user');
  }),

  noBook: Ember.computed('book', function(){
    return !this.get('book');
  }),

  init(){
    this._super(...arguments);
    this.set('section', 'CIR')
  },

  actions: {
    search(){
      const session = this.get('session');
      if(this.get('name').length >= 3 || this.get('email').length >= 3 || this.get('phone').length >= 3){
        Ember.$.ajax({
          method: "GET",
          url: `${ENV.HOST}/search_user`,
          headers: {
            'Authorization': session.get('data.authenticated.token')
          },
          data: {
            name: this.get('name'),
            email: this.get('email'),
            phone: this.get('phone')
          }
        }).then((response)=>{
          this.set('results', response.data);
        }, ()=>{
          alert('Error Searching For User');
        });
      } else {
        alert('At Least Three Characters Needed For One Search Box To Submit');
      }
    },
    selectUser(user){
      const session = this.get('session');
      this.set('user', user);
      Ember.$.ajax({
        method: "GET",
        url: `${ENV.HOST}/search_inventory`,
        headers: {
          'Authorization': session.get('data.authenticated.token')
        },
        data: {
          user_id: user
        }
      }).then((response)=>{
        this.set('currentItems', response);
      }, ()=>{
        alert('Error Searching For User');
      });
    },
    updateSection(element){
      this.set('section', element.target.value);
    },
    searchBook(){
      this.set('noResults', false);
      const session = this.get('session');
      const section = this.get('section');
      const title = this.get('title')
      if(title.length >= 3){
        Ember.$.ajax({
          method: "GET",
          url: `${ENV.HOST}/search_book`,
          headers: {
            'Authorization': session.get('data.authenticated.token')
          },
          data: {
            section: section,
            title: title
          }
        }).then((response)=>{
          if(!response.data){
            this.set('noResults', true);
          } else if(response.data.length < 1){
            this.set('noResults', true);
          } else {
            this.set('books', response.data);
          }
        }, ()=>{
          alert('Error Searching For Books');
        });
      }
    },
    selectBook(book){
      this.set('book', book);
    },
    submit(){
      const session = this.get('session');
      Ember.$.ajax({
        method: "POST",
        url: `${ENV.HOST}/checkout`,
        headers: {
          'Authorization': session.get('data.authenticated.token')
        },
        data: {
          user_id: this.get('user'),
          item_id: this.get('book'),
          section: this.get('section'),
          due_dt: this.get('due_dt')
        }
      }).then((response)=>{
        this.set('success', true);
        this.send('clearSearch');
      }, (err)=>{
        let text = ''
        err.errors.forEach((obj)=>{
          Object.keys(obj).forEach((key)=>{
            text = text + ' ' + key + ': ' + obj[key];
          });
        });
        alert(text);
      });
    },
    clearSearch(){
      this.setProperties({
        name: '',
        email: '',
        phone: '',
        title: '',
        noResults: false,
        user: null,
        section: "CIR",
        book: null,
        results: null,
        books: null,
        currentItems: null,
        due_dt: null
      });
      Ember.$('input').val('');
    },
    closeAlert(){
      this.set('success', false);
    },
    returnItem(log){
      const session = this.get('session');
      Ember.$.ajax({
        method: "POST",
        url: `${ENV.HOST}/checkin`,
        headers: {
          'Authorization': session.get('data.authenticated.token')
        },
        data: {
          item_id: log.item_id,
          holding_id: log.holding_id,
          user_id: log.user_id
        }
      }).then(()=>{
        this.get('currentItems').removeObject(log);
      }, ()=>{
        alert('Error Returning Item');
      });
    }
  }
});
