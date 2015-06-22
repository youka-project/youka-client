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

  templateHelpers() {
    return {
      isMet() {
        return !(this.name === 'Valentin' || this.name === 'Julia' || this.name === 'Hugo' || this.name === 'Victor' || this.name === 'Aurélie');
      }
    }
  },

  modelEvents: {
    'all': 'render'
  }
});
