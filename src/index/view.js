import Backbone from 'backbone';
import View from '../common/view';
import template from './template.hbs';
import Syphon from 'backbone.syphon';
import Radio from 'backbone.radio';

export default View.extend({
  template: template,
  className: 'index',
  errors: [],

  templateHelpers() {
    return {
      errors: this.errors,
      isLoggedIn: () => {
      	return Radio.request('auth', 'isLoggedIn');
      }
    };
  },

  events: {
    'submit form': 'handleLoginSubmit'
  },

  handleLoginSubmit(e) {
  	e.preventDefault();

    var credentials = Syphon.serialize(this);

    Radio.command('auth', 'login', credentials, this.onLoginResult.bind(this));

    return false;
  },

  onLoginResult(err) {
  	if (err) {
  		this.errors.push(err);
		this.render();
  	} else {
  		Backbone.history.navigate('users', { trigger: true });
  	}
  }

});
