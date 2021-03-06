import _ from 'lodash';
import LayoutView from '../../common/layout-view';
import CollectionView from './collection-view';
import Collection from '../../common/collection';
import template from './layout-template.hbs';
import Radio from 'backbone.radio';

export default LayoutView.extend({
  template: template,
  className: 'users users--index fullpage',

  regions: {
    list: '.users__list'
  },

  initialize(options) {
    this.state = { start: 0, limit: 100 };
    this.state.start = (options.page - 1) * this.state.limit;
  },

  onBeforeRender() {
    const userId = Radio.request('auth', 'getUserId');
    var filtered = _.chain(this.collection.models)
      .filter((model) => {
        return (model.id !== userId);
      })
      .value();

    this.filteredCollection = new Collection(filtered);
  },

  onAttach() {
    this.collectionView = new CollectionView({
      collection: this.filteredCollection
    });

    this.list.show(this.collectionView);
  },

  templateHelpers() {
    var total   = Math.floor(this.collection.length / this.state.limit) + 1;
    var current = Math.floor(this.state.start / this.state.limit) + 1;

    var pages = _.times(total, function(index) {
      return {
        current : index + 1 === current,
        page    : index + 1
      };
    });

    var prev = current - 1 > 0     ? current - 1 : false;
    var next = current + 1 < total ? current + 1 : false;

    return {
      total   : total,
      current : current,
      pages   : pages,
      prev    : prev,
      next    : next
    };
  }
});
