import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  didInsertElement(){
    this._super(...arguments);
    Ember.$('#menuToggle').click(function() {

    let collapsedMargin = Ember.$('.mainpanel').css('margin-left');
    let collapsedLeft = Ember.$('.mainpanel').css('left');

    if(collapsedMargin === '220px' || collapsedLeft === '220px') {
      toggleMenu(-220,0);
    } else {
      toggleMenu(0,220);
    }

    });

    function toggleMenu(marginLeft, marginMain) {

      var emailList = (Ember.$(window).width() <= 768 && Ember.$(window).width() > 640)? 320 : 360;

      if(Ember.$('.mainpanel').css('position') === 'relative') {

        Ember.$('.logopanel, .leftpanel').animate({left: marginLeft}, 'fast');
        Ember.$('.headerbar, .mainpanel').animate({left: marginMain}, 'fast');

        Ember.$('.emailcontent, .email-options').animate({left: marginMain}, 'fast');
        Ember.$('.emailpanel').animate({left: marginMain + emailList}, 'fast');

        if(Ember.$('body').css('overflow') === 'hidden') {
          Ember.$('body').css({overflow: ''});
        } else {
          Ember.$('body').css({overflow: 'hidden'});
        }

      } else {

        Ember.$('.logopanel, .leftpanel').animate({marginLeft: marginLeft}, 'fast');
        Ember.$('.headerbar, .mainpanel').animate({marginLeft: marginMain}, 'fast');

        Ember.$('.emailcontent, .email-options').animate({left: marginMain}, 'fast');
        Ember.$('.emailpanel').animate({left: marginMain + emailList}, 'fast');

      }

    }
  },

  actions: {
    logout(){
      this.sendAction('action')
    }
  }
});
