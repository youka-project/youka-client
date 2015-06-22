import Route from '../../common/route';
import View from './view';
import storage from '../storage';
import Radio from 'backbone.radio';

export default Route.extend({
  initialize(options) {
    this.container = options.container;
  },

  fetch() {
    const id = Radio.request('auth', 'getUserId');
    return storage.find(id).then(model => {
      this.model = model;
    });
  },

  render() {
    this.view = new View({
      model: this.model
    });
    this.container.show(this.view);
    Radio.command('header', 'activate', { path: 'users/me' });
  }
});
