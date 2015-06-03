import Router from '../common/router';
import Radio from 'backbone.radio';

import IndexRoute from './index/route';

export default Router.extend({
  initialize(options) {

    this.container = options.container;

    Radio.command('header', 'add', {
      name: 'Stats',
      path: 'stats',
      icon: 'stat',
      type: 'primary'
    });
  },

  onBeforeEnter() {
    Radio.command('header', 'activate', { path: 'stats' });
  },

  routes: {
    'stats' : 'index'
  },

  index() {
    return new IndexRoute({
      container: this.container
    });
  }

});
