import Storage from 'backbone.storage';
import Model from './model';
import Collection from './collection';

var UsersStorage = Storage.extend({
  model: Model,
  collection: Collection,
  _ensureModel(model) {
    if (model instanceof this.model) {
      return model;
    } else if (typeof model === 'object') {
      return new this.model(model);
    } else {
      return new this.model({ _id: model });
    }
  }
});

export default new UsersStorage();
