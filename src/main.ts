import Application from './Application.vue';

import BaseVueInstance from './BaseVueInstance';

// eslint-disable-next-line no-new
new (BaseVueInstance.extend({
  render: (h) => h(Application),
  el: '#application',
}))();
