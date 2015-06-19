import _ from 'lodash';
import Backbone from 'backbone';
import LayoutView from '../../common/layout-view';
import template from './template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'socket-connect hidden-t',

  ui: {
    circlesContainer: '.circles-container',
    footer: '.socket-connect--footer'
  },

  show() {
    this.$el.removeClass('hidden-t');
    setTimeout(() => {
      this.ui.circlesContainer.removeClass('hidden-anim');
    }, 500);
    setTimeout(() => {
      this.ui.footer.removeClass('hidden-anim');
    }, 1500);
  },

  hide() {
    this.$el.addClass('hidden-t');
  }

});
