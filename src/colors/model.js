import Model from '../common/model';

export default Model.extend({
  urlRoot: '/api/colors',

  defaults: {
    active: false
  },

  validate(attrs) {
    var errors = [];

    if (attrs.name === '') {
      errors.push('Missing "name" field');
    }

    if (attrs.hex === '') {
      errors.push('Missing "hex" field');
    }

    return errors.length > 0 ? errors : undefined;
  }
});
