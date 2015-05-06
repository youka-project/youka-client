import Model from '../common/model';

export default Model.extend({
  urlRoot: '/api/users',

  defaults: {
    active: false
  },

  validate(attrs) {
    var errors = [];

    if (attrs.name === '') {
      errors.push('Missing "name" field');
    }

    if (attrs.email === '') {
      errors.push('Missing "email" field');
    }

    return errors.length > 0 ? errors : undefined;
  }
});
