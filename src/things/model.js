import Model from '../common/model';

export default Model.extend({
  urlRoot: '/api/things',

  defaults: {
    active: false
  },

  validate(attrs) {
    var errors = [];

    if (attrs.name === '') {
      errors.push('Missing "name" field');
    }

    if (attrs.info === '') {
      errors.push('Missing "info" field');
    }

    return errors.length > 0 ? errors : undefined;
  }
});
