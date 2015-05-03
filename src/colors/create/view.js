import nprogress from 'nprogress';
import View from '../../common/view';
import FormBehavior from '../../forms/behavior';
import Backbone from 'backbone';
import template from './template.hbs';
import storage from '../storage';

export default View.extend({
  template: template,
  className: 'colors colors--create container',

  behaviors: {
    form: { behaviorClass: FormBehavior }
  },

  templateHelpers() {
    return {
      errors: this.errors
    };
  },

  events: {
    'submit form': 'handleSubmit'
  },

  handleSubmit() {
    var errors = this.model.validate(this.form);

    if (errors) {
      this.errors = errors;
      this.render();
    } else {
      nprogress.start();
      this.model.set(this.form);
      storage.save(this.model).then(() => {
        Backbone.history.navigate('colors', { trigger: true });
      });
    }
  }
});
