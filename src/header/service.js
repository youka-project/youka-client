import Service from '../common/service';
import Collection from '../common/collection';
import View from './view';

export default Service.extend({
  channelName: 'header',

  initialize(options) {
    this.container = options.container;
    this.collection = new Collection();
    this.start();
  },

  onStart() {
    this.view = new View({ collection: this.collection });
    this.container.show(this.view);

    this.channel.comply({
      add      : this.onAdd,
      activate : this.onActivate,
      remove   : this.onRemove,
      show     : this.onShow,
      hide     : this.onHide,
    }, this);
  },

  onStop() {
    this.channel.reset();
  },

  onAdd(model) {
    this.collection.add(model);
  },

  onRemove(model) {
    model = this.collection.findWhere(model);
    this.collection.remove(model);
  },

  onShow() {
    this.view.$el.removeClass('hidden');
  },

  onHide() {
    this.view.$el.addClass('hidden');
  },

  onActivate(model) {
    this.collection.invoke('set', 'active', false);
    model = this.collection.findWhere(model);
    if (model) {
      this.onShow();
      model.set('active', true);
    } else {
      this.onHide();
    }
  }
});
