import ItemView from '../../common/item-view';
import template from './item-template.hbs';

export default ItemView.extend({
  tagName: 'a',
  template: template,
  className: 'users__item',

  attributes() {
    return {
      href: '#users/' + this.model.get('_id')
    };
  },

  initialize() {
    console.log(this.model);
  },

  modelEvents: {
    'all': 'render'
  }
});
