import _ from 'lodash';
import Backbone from 'backbone';
import LayoutView from '../../common/layout-view';
import template from './template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'socket-connect hidden-t',

  ui: {
    circlesContainer: '.circles-container'
  },

  triggers: {
    'click .confirm-true': 'confirmSit',
    'click .confirm-false': 'discardSit'
  },

  show(userId) {
    console.log('model', this.model);
    this.$el.removeClass('hidden-t');
    setTimeout(() => {
      this.ui.circlesContainer.removeClass('hidden-anim');
    }, 500);
  },

  hide() {
    this.$el.addClass('hidden-t');
  }

});
