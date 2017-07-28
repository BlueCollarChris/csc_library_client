import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  didInsertElement(){
    this._super(...arguments);
    $('.nav-parent > a').on('click', function() {
    console.log('clicked')
     var gran = $(this).closest('.nav');
     var parent = $(this).parent();
     var sub = parent.find('> ul');

     if(sub.is(':visible')) {
       sub.slideUp(200);
       if(parent.hasClass('nav-active')) { parent.removeClass('nav-active'); }
     } else {

       $(gran).find('.children').each(function() {
         $(this).slideUp();
       });

       sub.slideDown(200);
       if(!parent.hasClass('active')) { parent.addClass('nav-active'); }
     }
    return false;

   });
  },
  actions: {
    logout(){
      this.sendAction('action')
    }
  }
});
