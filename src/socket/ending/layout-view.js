import _ from 'lodash';
import Backbone from 'backbone';
import LayoutView from '../../common/layout-view';
import template from './template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'socket-connect socket-connect-bg-white hidden-t',

  ui: {
    user: '.users__item',
    footer: '.socket-connect--footer'
  },

  triggers: {
    'click .socket-connect--footer': 'closeModal',
    'click .big-green-button': 'closeModal',
  },

  show() {
    this.$el.removeClass('hidden-t');
    setTimeout(() => {
      this.ui.user.removeClass('hide-met');
    }, 1500);
    setTimeout(() => {
      this.ui.footer.removeClass('hidden-anim');
    }, 500);
  },

  hide() {
    this.$el.addClass('hidden-t');
  }

});
