import Route from '../../common/route';
import LayoutView from './layout-view';

export default Route.extend({
  initialize(options) {
    this.container = options.container;
    this.render();
  },

  render(params) {
    this.view = new LayoutView();

    this.container.show(this.view);
  }
});
