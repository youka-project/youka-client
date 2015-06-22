import Router from '../common/router';
import Radio from 'backbone.radio';

import IndexRoute from './index/route';
import CreateRoute from './create/route';
import ShowRoute from './show/route';
import EditRoute from './edit/route';
import MeRoute from './me/route';

export default Router.extend({
  initialize(options) {
    this.container = options.container;

    Radio.command('header', 'add', {
      name: 'Team',
      path: 'users',
      icon: 'team',
      type: 'primary'
    });

    Radio.command('header', 'add', {
      name: 'Profil',
      path: 'users/me',
      icon: 'profil',
      type: 'primary'
    });
  },

  onBeforeEnter() {
    
  },

  routes: {
    'users'          : 'index',
    'users/me'       : 'me',
    'users/new'      : 'create',
    'users/:id'      : 'show',
    'users/:id/edit' : 'edit',
  },

  index() {
    return new IndexRoute({
      container: this.container
    });
  },

  create() {
    return new CreateRoute({
      container: this.container
    });
  },

  show() {
    return new ShowRoute({
      container: this.container
    });
  },

  edit() {
    return new EditRoute({
      container: this.container
    });
  },

  me() {
    return new MeRoute({
      container: this.container
    });
  }
});
