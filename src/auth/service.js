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
      login        : this.onLogin
    }, this);

    this.channel.reply({
      isLoggedIn   : this.isLoggedIn
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
      .done( data => {
        if (data.token && data.token !== '') {
          this.onLoginSuccess(data.token);
          done(null);
        }
        else {
          done('Token error.');
        }
      }.bind(this))
      .fail( data => {
        done(data.responseJSON.message);
      })
      .always( () => { 
        nprogress.done();
      });
  },

  onLoginSuccess(token) {
    this.token = token;

    $.ajaxPrefilter( (options, originalOptions) => {

      if (originalOptions.type === 'GET' || options.type === 'GET') {
        if (!options.data || options.data === '') {
          options.data = 'access_token=' + token;
        } else {
          options.data = options.data + '&access_token=' + token;
        }
      } else {
        options.data = JSON.stringify($.extend(JSON.parse(originalOptions.data), { access_token : token }));
      }
    });
  },

  isLoggedIn() {
    return (this.token !== null && this.token !== '');
  }

});