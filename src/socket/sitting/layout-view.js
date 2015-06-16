import _ from 'lodash';
import Backbone from 'backbone';
import LayoutView from '../../common/layout-view';
import template from './template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'socket-connect hidden-t',

  triggers: {
    'click .confirm-true': 'confirmSit',
    'click .confirm-false': 'discardSit'
  },

  show() {
    this.$el.removeClass('hidden-t');
  },

  hide() {
    this.$el.addClass('hidden-t');
  }

});
