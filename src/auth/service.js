import Service from '../common/service';
import $ from 'jquery';
import nprogress from 'nprogress';


export default Service.extend({
  channelName: 'auth',
  token: null,

  initialize() {
    this.start();
  },

  onStart() {

    this.channel.comply({
      login    : this.onLogin
    }, this);
  },

  onLogin(credentials, done) {

    if (credentials && credentials.email && credentials.password) {
      console.log('onLogin, credentials :', credentials);
      nprogress.start();
      this.requestLogin(credentials, done);
    } else {
      done('Tous les champs doivent être renseignés.');
    }
  },

  requestLogin(credentials, done) {

    $.post('/auth/local', credentials)
      .done(function(data) {
        if (data.token && data.token !== '') {
          this.onLoginSuccess(data.token);
          done(null);
        }
        else {
          done('Token error.');
        }
      }.bind(this))
      .fail(function(data) {
        done(data.responseJSON.message);
      })
      .always(function() {
        nprogress.done();
      });
  },

  onLoginSuccess(token) {
    this.token = token;

    $.ajaxPrefilter(function(options) {
  
      if (!options.data || options.data === '') {
        options.data = 'access_token=' + token;
      } else {
        options.data = options.data + '&access_token=' + token;
      }

      // if (originalOptions.type !== 'post' || options.type !== 'post') {
     //   options.data = 'access_token=';
     //  } else { //todo ; to test
     //   //options.data = $.extend(originalOptions.data, { access_token : '' });
     //  }
    });
  }

});
