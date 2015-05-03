import ItemView from '../../common/item-view';
import template from './item-template.hbs';

export default ItemView.extend({
  tagName: 'a',
  template: template,
  className: 'things__item list-group-item',

  attributes() {
    return {
      href: '#things/' + this.model.get('_id')
    };
  },

  modelEvents: {
    'all': 'render'
  }
});
