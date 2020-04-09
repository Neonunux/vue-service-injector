import PortalVue from 'portal-vue';
import Vue from 'vue';

import router from './router';
import store from './store';

Vue.use(PortalVue);

Vue.config.productionTip = false;

export default Vue.extend({
  router,
  store,
});
