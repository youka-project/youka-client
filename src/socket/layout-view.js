import _ from 'lodash';
import Backbone from 'backbone';
import LayoutView from '../common/layout-view';
import template from './template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'socket-connect hidden-t',

  events: {
    'show.bs.collapse #navbar-collapse' : 'onCollapseShow'
  },

  show() {
    this.$el.removeClass('hidden-t');
  }

});
