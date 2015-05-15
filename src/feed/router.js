import Router from '../common/router';
import Radio from 'backbone.radio';

import IndexRoute from './index/route';

export default Router.extend({
  initialize(options) {

    this.container = options.container;

    Radio.command('header', 'add', {
      name: 'Feed',
      path: 'feed',
      type: 'primary'
    });
  },

  onBeforeEnter() {
    Radio.command('header', 'activate', { path: 'feed' });
  },

  routes: {
    'feed' : 'index'
  },

  index() {
    return new IndexRoute({
      container: this.container
    });
  }

});
