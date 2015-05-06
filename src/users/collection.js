import Collection from '../common/collection';
import Model from './model';

export default Collection.extend({
  url: '/api/users',
  model: Model
});
